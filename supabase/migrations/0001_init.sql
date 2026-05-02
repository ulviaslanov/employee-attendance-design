-- Initial schema: companies, teams, locations, policies, employees,
-- check_ins, requests, audit_events, kudos, badges, mood, rewards.
--
-- Multi-tenant ready: every table carries company_id.
-- Privacy-first: mood_logs is owner-only, audit_events is append-only.

create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

------------------------------------------------------------------
-- 1. Tenant
------------------------------------------------------------------

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table teams (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  accent text,
  lead_employee_id uuid,
  created_at timestamptz not null default now()
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  wifi_ssid text,
  geo_point point,
  radius_m int not null default 80,
  created_at timestamptz not null default now()
);

create table policies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique references companies(id) on delete cascade,
  work_start time not null default '09:00',
  late_grace_min int not null default 15,
  monthly_remote_limit int not null default 8,
  sla_minutes int not null default 30,
  streak_rules jsonb not null default '{"protectedTypes":["sick","off"],"weekendCounts":false}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

------------------------------------------------------------------
-- 2. Employees
------------------------------------------------------------------

create type employee_role as enum ('employee', 'manager', 'hr');

create table employees (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  user_id uuid unique,                      -- supabase auth.users.id, nullable until first login
  full_name text not null,
  email text not null,
  role employee_role not null default 'employee',
  team_id uuid references teams(id) on delete set null,
  manager_id uuid references employees(id) on delete set null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(company_id, email)
);

alter table teams
  add constraint teams_lead_fk
  foreign key (lead_employee_id) references employees(id) on delete set null;

------------------------------------------------------------------
-- 3. Check-ins
------------------------------------------------------------------

create type check_in_type as enum (
  'office', 'remote', 'meeting', 'field', 'sick', 'off', 'break'
);

create type detection_method as enum ('wifi', 'gps', 'manual', 'calendar');

create table check_ins (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  employee_id uuid not null references employees(id) on delete cascade,
  type check_in_type not null,
  checked_in_at timestamptz not null default now(),
  checked_out_at timestamptz,
  detection_method detection_method not null,
  location_id uuid references locations(id) on delete set null,
  location_evidence jsonb,                  -- { gps: {lat,lng,accuracy}, ssid?: text }
  note text,
  created_at timestamptz not null default now()
);

create index idx_check_ins_employee_day
  on check_ins(employee_id, (checked_in_at::date) desc);

------------------------------------------------------------------
-- 4. Requests
------------------------------------------------------------------

create type request_type as enum ('remote', 'leave', 'sick', 'field', 'short');
create type request_status as enum ('pending', 'approved', 'declined', 'escalated', 'cancelled');

create table requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  from_employee uuid not null references employees(id) on delete cascade,
  approver_id uuid references employees(id) on delete set null,
  type request_type not null,
  date_range daterange not null,
  reason text,
  status request_status not null default 'pending',
  pending_until timestamptz,                -- now + sla_minutes at insert
  decided_at timestamptz,
  decided_by uuid references employees(id) on delete set null,
  decision_note text,
  created_at timestamptz not null default now(),
  exclude using gist (
    from_employee with =,
    date_range with &&
  ) where (status in ('pending', 'approved'))
);

create index idx_requests_pending_sla
  on requests(pending_until)
  where status = 'pending';

------------------------------------------------------------------
-- 5. Audit log (immutable, HR-readable)
------------------------------------------------------------------

create table audit_events (
  id bigserial primary key,
  company_id uuid not null references companies(id) on delete cascade,
  at timestamptz not null default now(),
  actor_id uuid references employees(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  diff jsonb
);

create index idx_audit_company_at on audit_events(company_id, at desc);

------------------------------------------------------------------
-- 6. Kudos, badges, spotlight
------------------------------------------------------------------

create table kudos (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  from_employee uuid not null references employees(id) on delete cascade,
  to_employee uuid not null references employees(id) on delete cascade,
  value_tag text not null,                  -- 'sahiblik', 'yaradicilik', etc.
  message text not null,
  created_at timestamptz not null default now(),
  check (from_employee <> to_employee)
);

create table badges_earned (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  employee_id uuid not null references employees(id) on delete cascade,
  badge_key text not null,                  -- 'streak_7', 'early_bird', etc.
  earned_at timestamptz not null default now(),
  unique(employee_id, badge_key)
);

create table spotlights (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  winner_id uuid not null references employees(id) on delete cascade,
  selected_by uuid not null references employees(id) on delete restrict,
  month date not null,                      -- first day of month
  reward_label text not null,
  note text,
  created_at timestamptz not null default now(),
  unique(team_id, month)
);

------------------------------------------------------------------
-- 7. Mood logs (private, owner-only)
------------------------------------------------------------------

create table mood_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  employee_id uuid not null references employees(id) on delete cascade,
  score smallint not null check (score between 1 and 5),
  logged_at timestamptz not null default now()
);

create index idx_mood_owner on mood_logs(employee_id, logged_at desc);

------------------------------------------------------------------
-- 8. Rewards
------------------------------------------------------------------

create table rewards_catalog (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  key text not null,                        -- 'coffee_voucher_15'
  label text not null,
  value_azn int not null,
  is_active boolean not null default true,
  unique(company_id, key)
);

create type claim_status as enum ('unlocked', 'claimed', 'used', 'expired');

create table reward_claims (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  employee_id uuid not null references employees(id) on delete cascade,
  reward_id uuid not null references rewards_catalog(id) on delete restrict,
  status claim_status not null default 'unlocked',
  trigger_reason text,                      -- 'streak_7', 'kudos_20'
  unlocked_at timestamptz not null default now(),
  claimed_at timestamptz,
  used_at timestamptz
);

------------------------------------------------------------------
-- 9. Weekly wraps (computed Friday EOD)
------------------------------------------------------------------

create table weekly_wraps (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  employee_id uuid not null references employees(id) on delete cascade,
  week_start date not null,
  payload jsonb not null,                   -- denormalized stats blob
  created_at timestamptz not null default now(),
  unique(employee_id, week_start)
);

------------------------------------------------------------------
-- 10. Triggers
------------------------------------------------------------------

-- audit log writer for check_ins
create or replace function audit_check_in() returns trigger
  language plpgsql as $$
begin
  insert into audit_events (company_id, actor_id, action, target_type, target_id, diff)
  values (
    new.company_id,
    new.employee_id,
    case when tg_op = 'INSERT' then 'check_in.created' else 'check_in.updated' end,
    'check_in',
    new.id,
    to_jsonb(new)
  );
  return new;
end;
$$;

create trigger trg_check_ins_audit
  after insert or update on check_ins
  for each row execute function audit_check_in();

-- audit log writer for requests
create or replace function audit_request() returns trigger
  language plpgsql as $$
begin
  insert into audit_events (company_id, actor_id, action, target_type, target_id, diff)
  values (
    new.company_id,
    coalesce(new.decided_by, new.from_employee),
    case
      when tg_op = 'INSERT' then 'request.created'
      when new.status <> old.status then 'request.' || new.status::text
      else 'request.updated'
    end,
    'request',
    new.id,
    to_jsonb(new)
  );
  return new;
end;
$$;

create trigger trg_requests_audit
  after insert or update on requests
  for each row execute function audit_request();

-- set pending_until from policies on insert
create or replace function set_request_pending_until() returns trigger
  language plpgsql as $$
declare
  sla int;
begin
  select sla_minutes into sla from policies where company_id = new.company_id;
  if new.pending_until is null then
    new.pending_until := now() + (coalesce(sla, 30) || ' minutes')::interval;
  end if;
  return new;
end;
$$;

create trigger trg_requests_set_sla
  before insert on requests
  for each row execute function set_request_pending_until();

------------------------------------------------------------------
-- 11. Materialized view: mood aggregate (anonymized)
------------------------------------------------------------------

create materialized view mood_aggregates_weekly as
select
  company_id,
  date_trunc('week', logged_at)::date as week_start,
  round(avg(score)::numeric, 2) as avg_score,
  count(*) as sample_size
from mood_logs
group by company_id, date_trunc('week', logged_at);

create unique index idx_mood_agg_unique on mood_aggregates_weekly(company_id, week_start);
