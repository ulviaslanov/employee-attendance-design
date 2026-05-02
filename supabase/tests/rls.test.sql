-- pgTAP RLS smoke tests.
-- Run: supabase test db
--
-- Coverage:
--  - employee can write own check_in
--  - employee cannot read another employee's check_in
--  - manager can read team check_ins
--  - hr can read all check_ins
--  - mood_logs unreachable by manager
--  - audit_events not writable from client

begin;
select plan(7);

-- pretend we're employee Aysel (Engineering)
set local role authenticated;
set local "request.jwt.claims" to '{"sub":"eeeeeeee-2001-0001-0001-eeeeeeeeeeee"}';

-- (mapped via employees.user_id; assume seed wired Aysel.user_id = the sub above)

-- 1. employee can insert own check_in (uses RLS check)
prepare ins_self as insert into check_ins(company_id, employee_id, type, detection_method)
  values ('11111111-1111-1111-1111-111111111111',
          (select id from employees where email = 'aysel.quliyeva@code.az'),
          'office', 'manual');
select lives_ok('ins_self', 'employee can insert own check_in');

-- 2. employee cannot insert someone else's check_in
prepare ins_other as insert into check_ins(company_id, employee_id, type, detection_method)
  values ('11111111-1111-1111-1111-111111111111',
          (select id from employees where email = 'cavid.huseynov@code.az'),
          'office', 'manual');
select throws_ok('ins_other', '%row-level security%', 'cannot insert for another employee');

-- 3. employee cannot read another employee's check_ins
select is(
  (select count(*) from check_ins
    where employee_id = (select id from employees where email = 'cavid.huseynov@code.az')),
  0::bigint,
  'cannot select other employee check_ins');

-- 4. switch to manager Lale
set local "request.jwt.claims" to '{"sub":"eeeeeeee-1001-0001-0001-eeeeeeeeeeee"}';

select isnt(
  (select count(*) from check_ins
    where employee_id = (select id from employees where email = 'aysel.quliyeva@code.az')),
  0::bigint,
  'manager can read team member check_ins');

-- 5. mood_logs unreachable by manager
select is(
  (select count(*) from mood_logs
    where employee_id = (select id from employees where email = 'aysel.quliyeva@code.az')),
  0::bigint,
  'manager cannot read direct report mood_logs');

-- 6. switch to HR Sabina
set local "request.jwt.claims" to '{"sub":"eeeeeeee-0001-0001-0001-eeeeeeeeeeee"}';

select isnt(
  (select count(*) from check_ins),
  0::bigint,
  'hr can read all check_ins');

-- 7. audit_events not directly insertable from client
prepare ins_audit as insert into audit_events(company_id, action, target_type)
  values ('11111111-1111-1111-1111-111111111111', 'manual.tamper', 'request');
select throws_ok('ins_audit', '%row-level security%', 'audit_events not writable from client');

select * from finish();
rollback;
