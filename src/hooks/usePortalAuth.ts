import { useState, useEffect } from 'react'
import { subscribeToAuthState, type User } from '@/lib/firebase/auth'

interface AuthState {
  user: User | null
  loading: boolean
}

export function usePortalAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true })

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((firebaseUser) => {
      setState({ user: firebaseUser, loading: false })
    })
    return unsubscribe
  }, [])

  return state
}
