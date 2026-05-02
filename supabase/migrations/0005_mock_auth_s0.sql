-- Mock auth helper for S0 vertical slice development.
--
-- TEMPORARY: this will be REMOVED after real Google OAuth is wired.
-- Do NOT use in production.
--
-- Purpose: allow frontend mobile/web agents to test the full flow
-- without waiting for Google Cloud Console OAuth setup.
--
-- Usage (local dev only):
--   SELECT auth.mock_sign_in('aysel.quliyeva@code.az');
--   -- returns: { user_id: uuid, session_token: text }
--
-- Security: this function is ONLY callable by postgres role (not
-- authenticated users). It bypasses all auth checks. The frontend
-- uses the returned JWT directly in Authorization headers.

create schema if not exists auth;

create or replace function auth.mock_sign_in(p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid;
  v_employee_id uuid;
  v_jwt text;
  v_exp bigint;
begin
  -- Only allow @code.az for consistency with real OAuth.
  if split_part(lower(p_email), '@', 2) <> 'code.az' then
    raise exception 'mock_sign_in: only @code.az emails allowed'
      using errcode = '42501';
  end if;

  -- Check if auth.users row exists; if not, create it.
  select id into v_user_id
    from auth.users
   where lower(email) = lower(p_email);

  if v_user_id is null then
    v_user_id := gen_random_uuid();
    insert into auth.users (id, instance_id, email, aud, role,
                            email_confirmed_at, created_at, updated_at)
    values (v_user_id,
            '00000000-0000-0000-0000-000000000000',
            lower(p_email),
            'authenticated',
            'authenticated',
            now(),
            now(),
            now());
    -- The 0003 trigger will auto-link employees.user_id now.
  end if;

  -- Verify the employee link succeeded.
  select id into v_employee_id
    from public.employees
   where user_id = v_user_id;

  if v_employee_id is null then
    raise exception 'mock_sign_in: no employee row for % (HR must seed it first)', p_email
      using errcode = '42501';
  end if;

  -- Generate a minimal JWT payload (no signature; local dev only).
  -- Real Supabase JWT is signed with project secret; this is a placeholder.
  v_exp := extract(epoch from now() + interval '1 hour')::bigint;

  v_jwt := jsonb_build_object(
    'aud', 'authenticated',
    'exp', v_exp,
    'sub', v_user_id::text,
    'email', lower(p_email),
    'role', 'authenticated',
    'iss', 'mock-auth-s0'
  )::text;

  return jsonb_build_object(
    'user_id', v_user_id,
    'employee_id', v_employee_id,
    'email', lower(p_email),
    'access_token', v_jwt,
    'expires_at', v_exp,
    'note', 'MOCK AUTH — replace with real Google OAuth before production'
  );
end;
$$;

comment on function auth.mock_sign_in is
  'S0 mock auth: creates auth.users + links employees.user_id. REMOVE after OAuth wired.';
