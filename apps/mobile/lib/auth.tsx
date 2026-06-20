/**
 * Auth boundary.
 *
 * Backend Google OAuth is not yet wired (see S0 spec). This module
 * exposes the contract every screen consumes. When backend signals
 * READY, swap the implementation to use `supabase.auth.signInWithOAuth`
 * — consumers don't change.
 */

import { createContext, useContext, useMemo, type ReactNode } from 'react'

export type Session = {
  user: {
    id: string
    name: string
    email: string
    employeeId: string
  }
}

const MOCK_SESSION: Session = {
  user: {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Mələk',
    email: 'melek@code.az',
    employeeId: '00000000-0000-0000-0000-0000000000a1',
  },
}

const SessionContext = createContext<Session | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO(backend-ready): replace with supabase.auth state listener.
  const value = useMemo(() => MOCK_SESSION, [])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession must be used within AuthProvider')
  return session
}
