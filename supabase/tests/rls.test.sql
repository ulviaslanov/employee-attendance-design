-- pgTAP RLS + auto-provision smoke tests.
-- Run: supabase test db
--
-- Coverage:
--  Auto-provision (migration 0003):
--   - @code.az auth user gets linked to existing employees row
--   - non-@code.az auth user is rejected
--   - @code.az auth user without employee row is rejected
--  RLS (migration 0002):
--   - employee can write own check_in
--   - employee cannot write another employee's check_in
--   - employee cannot read another employee's check_ins
--   - manager can read direct report check_ins
--   - manager CANNOT read direct report mood_logs (privacy)
--   - hr can read all check_ins
--   - audit_events not insertable from client
--  Realtime status sync (migration 0004):
--   - employees.current_status updates after check_in INSERT

begin;
select plan(11);

----------------------------------------------------------------------
-- Setup: create auth.users for our seeded employees so that the
-- 0003 trigger links employees.user_id automatically.
-- Done as table owner so we bypass RLS and can write to auth.users.
----------------------------------------------------------------------
set local role postgres;

-- Helper: insert an auth.users row with a deterministic uuid.
-- Minimal columns; rest get defaults from auth schema.
insert into auth.users (id, email, instance_id, aud, role)
values
  ('aaaa1111-0000-0000-0000-00000000aaaa', 'aysel.quliyeva@code.az',
   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('bbbb2222-0000-0000-0000-00000000bbbb', 'cavid.hüseynov@code.az',
   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('cccc3333-0000-0000-0000-00000000cccc', 'lale@code.az',
   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('dddd4444-0000-0000-0000-00000000dddd', 'sabina@code.az',
   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

-- The trigger should have linked employees.user_id. Verify.
select is(
  (select user_id from public.employees where email = 'aysel.quliyeva@code.az'),
  'aaaa1111-0000-0000-0000-00000000aaaa'::uuid,
  'auto-provision linked aysel'
);

-- Reject foreign domain.
prepare ins_foreign as insert into auth.users (id, email, instance_id, aud, role)
  values ('ffff0000-0000-0000-0000-00000000ffff', 'someone@gmail.com',
          '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');
select throws_ok(
  'ins_foreign',
  '%not allowed%',
  'foreign-domain auth user is rejected'
);

-- Reject @code.az with no matching employee row.
prepare ins_unknown as insert into auth.users (id, email, instance_id, aud, role)
  values ('eeee0000-0000-0000-0000-00000000eeee', 'ghost@code.az',
          '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');
select throws_ok(
  'ins_unknown',
  '%no employee record%',
  'unknown @code.az user without employee row is rejected'
);

----------------------------------------------------------------------
-- Switch to authenticated role and impersonate Aysel.
----------------------------------------------------------------------
set local role authenticated;
set local "request.jwt.claims" to
  '{"sub":"aaaa1111-0000-0000-0000-00000000aaaa","role":"authenticated"}';

-- 1. employee can insert own check_in
prepare ins_self as
  insert into check_ins(company_id, employee_id, type, detection_method)
  values ('11111111-1111-1111-1111-111111111111',
          (select id from employees where email = 'aysel.quliyeva@code.az'),
          'office', 'manual');
select lives_ok('ins_self', 'employee can insert own check_in');

-- 2. employee cannot insert someone else's check_in
prepare ins_other as
  insert into check_ins(company_id, employee_id, type, detection_method)
  values ('11111111-1111-1111-1111-111111111111',
          (select id from employees where email = 'cavid.hüseynov@code.az'),
          'office', 'manual');
select throws_ok('ins_other', '%row-level security%',
  'cannot insert for another employee');

-- 3. employee cannot read another employee's check_ins
-- First, as postgres, seed a check_in for Cavid so there is something to hide.
set local role postgres;
insert into check_ins(company_id, employee_id, type, detection_method)
  values ('11111111-1111-1111-1111-111111111111',
          (select id from employees where email = 'cavid.hüseynov@code.az'),
          'remote', 'manual');
set local role authenticated;
set local "request.jwt.claims" to
  '{"sub":"aaaa1111-0000-0000-0000-00000000aaaa","role":"authenticated"}';

select is(
  (select count(*) from check_ins
    where employee_id = (select id from employees where email = 'cavid.hüseynov@code.az')),
  0::bigint,
  'employee cannot select other employee check_ins');

----------------------------------------------------------------------
-- Switch to manager Lale (Engineering team)
----------------------------------------------------------------------
set local "request.jwt.claims" to
  '{"sub":"cccc3333-0000-0000-0000-00000000cccc","role":"authenticated"}';

select isnt(
  (select count(*) from check_ins
    where employee_id = (select id from employees where email = 'aysel.quliyeva@code.az')),
  0::bigint,
  'manager can read direct report check_ins');

-- mood_logs: seed one for Aysel as postgres, then verify Lale can't see it.
set local role postgres;
insert into mood_logs(company_id, employee_id, score)
  values ('11111111-1111-1111-1111-111111111111',
          (select id from employees where email = 'aysel.quliyeva@code.az'),
          4);
set local role authenticated;
set local "request.jwt.claims" to
  '{"sub":"cccc3333-0000-0000-0000-00000000cccc","role":"authenticated"}';

select is(
  (select count(*) from mood_logs
    where employee_id = (select id from employees where email = 'aysel.quliyeva@code.az')),
  0::bigint,
  'manager cannot read direct report mood_logs');

----------------------------------------------------------------------
-- Switch to HR Sabina
----------------------------------------------------------------------
set local "request.jwt.claims" to
  '{"sub":"dddd4444-0000-0000-0000-00000000dddd","role":"authenticated"}';

select isnt(
  (select count(*) from check_ins),
  0::bigint,
  'hr can read all check_ins');

-- audit_events: not directly insertable from client
prepare ins_audit as
  insert into audit_events(company_id, action, target_type)
  values ('11111111-1111-1111-1111-111111111111', 'manual.tamper', 'request');
select throws_ok('ins_audit', '%row-level security%',
  'audit_events not writable from client');

----------------------------------------------------------------------
-- Realtime status sync (migration 0004)
----------------------------------------------------------------------
set local role postgres;

select is(
  (select current_status::text from public.employees
    where email = 'aysel.quliyeva@code.az'),
  'office',
  'employees.current_status synced from latest check_in'
);

select isnt(
  (select current_check_in_id from public.employees
    where email = 'aysel.quliyeva@code.az'),
  null,
  'employees.current_check_in_id populated by trigger'
);

select * from finish();
rollback;
