/**
 * Supabase client boundary.
 *
 * If EXPO_PUBLIC_SUPABASE_URL + EXPO_PUBLIC_SUPABASE_ANON_KEY are present,
 * we instantiate the real client. Otherwise we return a stub that logs
 * and resolves successfully — lets us demo the morning check-in flow
 * end-to-end before backend goes live.
 *
 * Swap criteria (backend READY): both env vars set in EAS secrets.
 */

import Constants from 'expo-constants'

type StubInsertResult = { data: { id: string }; error: null }

type StubChannel = {
  on: (...args: unknown[]) => StubChannel
  subscribe: () => StubChannel
  unsubscribe: () => Promise<'ok'>
}

type StubClient = {
  from: (table: string) => {
    insert: (row: unknown) => Promise<StubInsertResult>
    select: () => Promise<{ data: unknown[]; error: null }>
  }
  channel: (name: string) => StubChannel
  __isStub: true
}

const url =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  (Constants.expoConfig?.extra as Record<string, string> | undefined)?.supabaseUrl
const anonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  (Constants.expoConfig?.extra as Record<string, string> | undefined)?.supabaseAnonKey

function makeStub(): StubClient {
  const channel: StubChannel = {
    on: () => channel,
    subscribe: () => channel,
    unsubscribe: async () => 'ok',
  }
  return {
    from: (table) => ({
      insert: async (row) => {
        // eslint-disable-next-line no-console
        console.log(`[supabase-stub] insert into ${table}`, row)
        return { data: { id: 'stub-' + Date.now() }, error: null }
      },
      select: async () => ({ data: [], error: null }),
    }),
    channel: () => channel,
    __isStub: true,
  }
}

// Lazy real-client load to avoid pulling supabase-js into the stub path
// during early development if the dep isn't installed yet.
function makeReal(): StubClient {
  // Defer require so missing dep doesn't break in stub mode.
  const { createClient } = require('@supabase/supabase-js') as {
    createClient: (u: string, k: string) => StubClient
  }
  return createClient(url as string, anonKey as string)
}

export const supabase: StubClient = url && anonKey ? makeReal() : makeStub()

export const isSupabaseStub = (supabase as { __isStub?: true }).__isStub === true
