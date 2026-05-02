-- Row Level Security policies.
--
-- Helper: auth.uid() returns the supabase auth user uuid.
-- We resolve it to employees.id via employees.user_id.
--
-- Roles model: each employee has a role enum: 'employee' | 'manager' | 'hr'.
-- Multi-tenant: every policy filters by company_id from the caller's employee row.

-- helper functions ------------------------------------------------

create or replace function current_employee()
returns table(id uuid, company_id uuid, role employee_role, manager_id uuid)
language sql stable security definer set search_path = public as $$
  select id, company_id, role, manager_id
  from employees
  where user_id = auth.uid() and is_active
  limit 1;
$$;

create or replace function current_company_id() returns uuid
language sql stable security definer set search_path = public as $$
  select company_id from current_employee();
$$;

create or replace function current_role() returns employee_role
language sql stable security definer set search_path = public as $$
  select role from current_employee();
$$;

-- enable RLS everywhere -------------------------------------------

alter table companies         enable row level security;
alter table teams             enable row level security;
alter table locations         enable row level security;
alter table policies          enable row level security;
alter table employees         enable row level security;
alter table check_ins         enable row level security;
alter table requests          enable row level security;
alter table audit_events      enable row level security;
alter table kudos             enable row level security;
alter table badges_earned     enable row level security;
alter table spotlights        enable row level security;
alter table mood_logs         enable row level security;
alter table rewards_catalog   enable row level security;
alter table reward_claims     enable row level security;
alter table weekly_wraps      enable row level security;

-- companies: read-only by everyone in tenant ----------------------

create policy companies_read on companies
  for select using (id = current_company_id());

-- teams, locations, rewards_catalog: tenant read ------------------

create policy teams_read on teams
  for select using (company_id = current_company_id());

create policy teams_hr_write on teams
  for all using (company_id = current_company_id() and current_role() = 'hr')
  with check (company_id = current_company_id());

create policy locations_read on locations
  for select using (company_id = current_company_id());

create policy locations_hr_write on locations
  for all using (company_id = current_company_id() and current_role() = 'hr')
  with check (company_id = current_company_id());

create policy rewards_catalog_read on rewards_catalog
  for select using (company_id = current_company_id());

create policy rewards_catalog_hr_write on rewards_catalog
  for all using (company_id = current_company_id() and current_role() = 'hr')
  with check (company_id = current_company_id());

-- policies: HR write, others read ---------------------------------

create policy policies_read on policies
  for select using (company_id = current_company_id());

create policy policies_hr_write on policies
  for all using (company_id = current_company_id() and current_role() = 'hr')
  with check (company_id = current_company_id());

-- employees ---------------------------------------------------------
-- self: read+update self profile fields
-- manager: read team
-- hr: read+update all in tenant

create policy employees_self_read on employees
  for select using (id = (select id from current_employee()));

create policy employees_team_read on employees
  for select using (
    company_id = current_company_id()
    and (
      manager_id = (select id from current_employee())
      or current_role() in ('manager', 'hr')
    )
  );

create policy employees_hr_write on employees
  for all using (company_id = current_company_id() and current_role() = 'hr')
  with check (company_id = current_company_id());

-- check_ins ---------------------------------------------------------

create policy check_ins_self_rw on check_ins
  for all using (
    employee_id = (select id from current_employee())
  ) with check (
    employee_id = (select id from current_employee())
    and company_id = current_company_id()
  );

create policy check_ins_manager_read on check_ins
  for select using (
    company_id = current_company_id()
    and exists (
      select 1 from employees e
      where e.id = check_ins.employee_id
        and e.manager_id = (select id from current_employee())
    )
  );

create policy check_ins_hr_read on check_ins
  for select using (
    company_id = current_company_id() and current_role() = 'hr'
  );

-- requests ----------------------------------------------------------

create policy requests_self_rw on requests
  for all using (from_employee = (select id from current_employee()))
  with check (
    from_employee = (select id from current_employee())
    and company_id = current_company_id()
  );

create policy requests_approver_rw on requests
  for all using (
    company_id = current_company_id()
    and approver_id = (select id from current_employee())
  ) with check (
    company_id = current_company_id()
  );

create policy requests_hr_read on requests
  for select using (
    company_id = current_company_id() and current_role() = 'hr'
  );

-- audit_events: HR read, append-only via trigger only --------------

create policy audit_hr_read on audit_events
  for select using (
    company_id = current_company_id() and current_role() = 'hr'
  );

-- (no insert/update/delete policy = denied for client; trigger uses
--  table owner privileges so it bypasses RLS)

-- kudos: tenant read, sender write --------------------------------

create policy kudos_tenant_read on kudos
  for select using (company_id = current_company_id());

create policy kudos_sender_write on kudos
  for insert with check (
    company_id = current_company_id()
    and from_employee = (select id from current_employee())
  );

-- badges_earned: self+team read, system inserts only --------------

create policy badges_self_read on badges_earned
  for select using (employee_id = (select id from current_employee()));

create policy badges_team_read on badges_earned
  for select using (
    company_id = current_company_id()
    and exists (
      select 1 from employees e
      where e.id = badges_earned.employee_id
        and (e.manager_id = (select id from current_employee())
             or current_role() in ('manager','hr'))
    )
  );

-- spotlights: tenant read, manager+hr write ------------------------

create policy spotlights_read on spotlights
  for select using (company_id = current_company_id());

create policy spotlights_manager_write on spotlights
  for insert with check (
    company_id = current_company_id()
    and selected_by = (select id from current_employee())
    and current_role() in ('manager', 'hr')
  );

-- mood_logs: OWNER ONLY -------------------------------------------
-- explicit deny for everyone except self insert+select.
-- update/delete denied entirely.

create policy mood_self_read on mood_logs
  for select using (employee_id = (select id from current_employee()));

create policy mood_self_insert on mood_logs
  for insert with check (
    employee_id = (select id from current_employee())
    and company_id = current_company_id()
  );

-- (no update/delete policy = denied)

-- reward_claims: self read+claim ----------------------------------

create policy reward_claims_self on reward_claims
  for all using (employee_id = (select id from current_employee()))
  with check (
    employee_id = (select id from current_employee())
    and company_id = current_company_id()
  );

create policy reward_claims_hr_read on reward_claims
  for select using (
    company_id = current_company_id() and current_role() = 'hr'
  );

-- weekly_wraps: self read only ------------------------------------

create policy weekly_wraps_self_read on weekly_wraps
  for select using (employee_id = (select id from current_employee()));
