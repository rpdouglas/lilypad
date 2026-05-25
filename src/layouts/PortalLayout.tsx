// Persona: Dana (primary — active client, desktop + mobile, clarity-focused)
// Persona: Robert (secondary — legacy business owner, expects professional review environment)
// Route: /portal/* (all auth-gated portal routes)

import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { usePortalAuth } from '@/hooks/usePortalAuth'
import { signOutPortal } from '@/lib/firebase/auth'
import { getClientByEmail, type PortalClient } from '@/lib/firebase/portal'
import type { User } from '@/lib/firebase/auth'

export interface PortalContext {
  user: User
  client: PortalClient
}

export default function PortalLayout() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = usePortalAuth()
  const [client, setClient] = useState<PortalClient | null>(null)
  const [clientFetched, setClientFetched] = useState(false)

  // Derived: show loading while auth resolves or while client is being fetched
  const loading = authLoading || (!authLoading && !!user?.email && !clientFetched)

  useEffect(() => {
    if (authLoading) return

    if (!user?.email) {
      navigate('/portal/auth', { replace: true })
      return
    }

    let cancelled = false

    getClientByEmail(user.email).then((data) => {
      if (cancelled) return
      if (!data) {
        signOutPortal().then(() => navigate('/portal/auth', { replace: true }))
        return
      }
      setClient(data)
      setClientFetched(true)
    })

    return () => { cancelled = true }
  }, [user, authLoading, navigate])

  async function handleSignOut() {
    await signOutPortal()
    navigate('/portal/auth', { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone">
          Loading…
        </span>
      </div>
    )
  }

  if (!user || !client) return null

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-cream flex flex-col font-sans text-dark">
        <header className="bg-forest">
          <div className="max-w-content mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-cream text-xl font-light leading-none">
                Lily Pad
              </span>
              <span className="text-stone text-[11px] font-mono tracking-[0.15em] uppercase hidden sm:inline">
                / {client.displayName}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-cream transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral rounded-sm px-2 py-1"
            >
              Sign out
            </button>
          </div>
        </header>
        <main className="flex-1">
          <Outlet context={{ user, client } satisfies PortalContext} />
        </main>
      </div>
    </MotionConfig>
  )
}
