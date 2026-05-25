// Persona: Dana (primary — needs frictionless mobile sign-in, no password)
// Persona: Robert (secondary — may arrive on different device than link request)
// Route: /portal/auth

import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  sendMagicLink,
  isMagicLinkUrl,
  confirmMagicLink,
  getStoredSignInEmail,
  subscribeToAuthState,
} from '@/lib/firebase/auth'
import { getClientByEmail } from '@/lib/firebase/portal'

type Phase = 'request' | 'sent' | 'confirm-email' | 'confirming' | 'error'

function detectInitialPhase(): { phase: Phase; storedEmail: string | null } {
  if (!isMagicLinkUrl(window.location.href)) {
    return { phase: 'request', storedEmail: null }
  }
  const stored = getStoredSignInEmail()
  return stored
    ? { phase: 'confirming', storedEmail: stored }
    : { phase: 'confirm-email', storedEmail: null }
}

export default function PortalAuthPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>(() => detectInitialPhase().phase)
  const [autoConfirmEmail] = useState<string | null>(() => detectInitialPhase().storedEmail)
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const hasAutoConfirmed = useRef(false)

  const runConfirm = useCallback(async (emailToUse: string) => {
    try {
      const user = await confirmMagicLink(window.location.href, emailToUse)
      if (!user.email) throw new Error('No email on account')
      const client = await getClientByEmail(user.email)
      if (!client) {
        setErrorMessage("This email isn't registered as a portal client. Contact your Lily Pad team.")
        setPhase('error')
        return
      }
      navigate(`/portal/${client.slug}`, { replace: true })
    } catch {
      setErrorMessage("The sign-in link is invalid or has expired. Request a new one.")
      setPhase('error')
    }
  }, [navigate])

  // Redirect already-authenticated users to their dashboard
  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (firebaseUser) => {
      if (!firebaseUser?.email) return
      const client = await getClientByEmail(firebaseUser.email)
      if (client) navigate(`/portal/${client.slug}`, { replace: true })
    })
    return unsubscribe
  }, [navigate])

  useEffect(() => {
    if (phase !== 'confirming' || hasAutoConfirmed.current || !autoConfirmEmail) return
    hasAutoConfirmed.current = true
    runConfirm(autoConfirmEmail)
  }, [phase, autoConfirmEmail, runConfirm])

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email || submitting) return
    setSubmitting(true)
    try {
      await sendMagicLink(email)
      setPhase('sent')
    } catch {
      setErrorMessage("Couldn't send the link. Check your email address and try again.")
      setPhase('error')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleConfirmEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!confirmEmail || submitting) return
    setSubmitting(true)
    setPhase('confirming')
    await runConfirm(confirmEmail)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <span className="font-display text-3xl font-light text-forest block leading-tight">
            Lily Pad
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mt-1 block">
            Client Portal
          </span>
        </div>

        {phase === 'request' && (
          <form onSubmit={handleSendLink} noValidate>
            <p className="font-sans text-sm text-stone leading-relaxed mb-6">
              Enter your email to receive a secure sign-in link.
            </p>
            <label htmlFor="email" className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
              className="w-full border border-stone/40 rounded-md px-4 py-3 font-sans text-sm text-dark bg-white placeholder:text-stone/60 focus-visible:outline-none focus-visible:shadow-coral transition-shadow duration-150"
            />
            <button
              type="submit"
              disabled={submitting || !email}
              className="mt-4 w-full bg-coral text-cream font-sans text-sm font-medium rounded-md px-4 py-3 hover:bg-coral-light transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-coral"
            >
              {submitting ? 'Sending…' : 'Send sign-in link'}
            </button>
          </form>
        )}

        {phase === 'sent' && (
          <div>
            <p className="font-sans text-sm text-dark leading-relaxed mb-4">
              We sent a sign-in link to <strong>{email}</strong>.
            </p>
            <p className="font-sans text-sm text-stone leading-relaxed mb-6">
              Click the link in your email to access your portal. You can close this tab.
            </p>
            <button
              onClick={() => { setPhase('request'); setEmail('') }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-forest transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral rounded-sm"
            >
              Use a different email
            </button>
          </div>
        )}

        {phase === 'confirm-email' && (
          <form onSubmit={handleConfirmEmailSubmit} noValidate>
            <p className="font-sans text-sm text-stone leading-relaxed mb-6">
              Please re-enter your email to confirm your identity.
            </p>
            <label htmlFor="confirm-email" className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone block mb-2">
              Email address
            </label>
            <input
              id="confirm-email"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
              className="w-full border border-stone/40 rounded-md px-4 py-3 font-sans text-sm text-dark bg-white placeholder:text-stone/60 focus-visible:outline-none focus-visible:shadow-coral transition-shadow duration-150"
            />
            <button
              type="submit"
              disabled={submitting || !confirmEmail}
              className="mt-4 w-full bg-coral text-cream font-sans text-sm font-medium rounded-md px-4 py-3 hover:bg-coral-light transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-coral"
            >
              {submitting ? 'Confirming…' : 'Confirm and sign in'}
            </button>
          </form>
        )}

        {phase === 'confirming' && (
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone">
            Signing you in…
          </p>
        )}

        {phase === 'error' && (
          <div>
            <p className="font-sans text-sm text-dark leading-relaxed mb-6">
              {errorMessage}
            </p>
            <button
              onClick={() => { setPhase('request'); setErrorMessage(''); hasAutoConfirmed.current = false }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral hover:text-dark transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral rounded-sm"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
