-- Auth provisioning + domain whitelist.
--
-- Goals:
--  1. Restrict sign-up/sign-in to @code.az emails (pilot scope).
--  2. Auto-link auth.users.id -> employees.user_id by email match
--     when an employee row already exists (HR pre-provisions roster).
--  3. If a @code.az user signs in but has no employee row, we DO NOT
--     auto-create the employee row. HR must seed it explicitly.
--     The trigger raises so the user understands they need to be added.
--
-- Notes:
--  - Triggers run with table-owner privileges (postgres) so they bypass
--    RLS on the public schema.
--  - We attach to auth.users on INSERT (sign-up) and UPDATE of email
--    (rare, but covers email change).
--  - The Google OAuth provider itself is configured in Supabase Dashboard
--    (or supabase/config.toml for local dev). This migration enforces
--    the domain rule at the database layer as defense-in-depth in case
--    the dashboard provider config is wide open.

create or replace function public.handle_auth_user_provision()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_email text;
  v_domain text;
  v_employee_id uuid;
begin
  v_email := lower(coalesce(new.email, ''));

  if v_email = '' then
    raise exception 'auth user has no email; cannot provision'
      using errcode = '22023';
  end if;

  v_domain := split_part(v_email, '@', 2);

  if v_domain <> 'code.az' then
    raise exception 'email domain % is not allowed (only @code.az)', v_domain
      using errcode = '42501';
  end if;

  -- Link to existing employee row by email. Case-insensitive.
  update public.employees
     set user_id = new.id
   where lower(email) = v_email
     and (user_id is null or user_id = new.id)
   returning id into v_employee_id;

  if v_employee_id is null then
    raise exception 'no employee record for % — HR must add you first', v_email
      using errcode = '42501';
  end if;

  return new;
end;
$$;

-- Drop and recreate so re-runs are safe in dev.
drop trigger if exists trg_auth_users_provision on auth.users;

create trigger trg_auth_users_provision
  after insert on auth.users
  for each row execute function public.handle_auth_user_provision();

-- Email change: re-link to (possibly different) employee row.
drop trigger if exists trg_auth_users_provision_update on auth.users;

create trigger trg_auth_users_provision_update
  after update of email on auth.users
  for each row
  when (lower(old.email) is distinct from lower(new.email))
  execute function public.handle_auth_user_provision();
