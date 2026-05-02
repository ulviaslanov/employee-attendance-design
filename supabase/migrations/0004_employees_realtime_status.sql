-- Realtime: derived current_status on employees for Team Live view.
--
-- Goal: manager web view subscribes to employees table UPDATE events
-- (one row per teammate), instead of reasoning over check_ins stream.
-- This keeps the realtime payload small and stable.
--
-- Strategy:
--  - Add columns: current_status (check_in_type), current_status_at (timestamptz),
--    current_check_in_id (uuid).
--  - On every check_ins INSERT: update the matching employees row.
--  - On check_ins UPDATE that closes the day (checked_out_at set),
--    we keep current_status as-is until the next morning's check-in.
--    The web view can show "günü bitirib" by inspecting checked_out_at
--    via a join, but for the realtime stream we only flip on new INSERT.
--  - Add employees to supabase_realtime publication so postgres_changes
--    fires on UPDATE.

alter table public.employees
  add column if not exists current_status public.check_in_type,
  add column if not exists current_status_at timestamptz,
  add column if not exists current_check_in_id uuid
    references public.check_ins(id) on delete set null;

create index if not exists idx_employees_company_status
  on public.employees(company_id, current_status);

create or replace function public.sync_employee_current_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Only react to INSERTs of new check-ins. Updates (e.g. setting
  -- checked_out_at) do not change "today's status".
  if tg_op = 'INSERT' then
    update public.employees
       set current_status       = new.type,
           current_status_at    = new.checked_in_at,
           current_check_in_id  = new.id
     where id = new.employee_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_check_ins_sync_status on public.check_ins;

create trigger trg_check_ins_sync_status
  after insert on public.check_ins
  for each row execute function public.sync_employee_current_status();

-- Backfill from historical data (latest check-in per employee).
update public.employees e
   set current_status      = ci.type,
       current_status_at   = ci.checked_in_at,
       current_check_in_id = ci.id
  from (
    select distinct on (employee_id)
      employee_id, id, type, checked_in_at
    from public.check_ins
    order by employee_id, checked_in_at desc
  ) ci
 where ci.employee_id = e.id
   and e.current_status is null;

-- Realtime publication: ensure employees table is published.
-- supabase_realtime publication exists by default in Supabase projects.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    -- add only if not already a member; pg_publication_tables is the source of truth.
    if not exists (
      select 1 from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'employees'
    ) then
      execute 'alter publication supabase_realtime add table public.employees';
    end if;
  else
    -- Local/dev fallback: create the publication so triggers carry events.
    execute 'create publication supabase_realtime for table public.employees';
  end if;
end$$;

-- REPLICA IDENTITY FULL: include all columns in UPDATE payloads so the
-- web client can read current_status without a follow-up fetch.
alter table public.employees replica identity full;
