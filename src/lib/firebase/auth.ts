import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged,
  type User,
  type ActionCodeSettings,
  type Unsubscribe,
} from 'firebase/auth'
import { auth } from './config'

const SIGN_IN_EMAIL_KEY = 'lilypad_portal_signin_email'

function buildActionCodeSettings(): ActionCodeSettings {
  return {
    url: `${window.location.origin}/portal/auth`,
    handleCodeInApp: true,
  }
}

export async function sendMagicLink(email: string): Promise<void> {
  await sendSignInLinkToEmail(auth, email, buildActionCodeSettings())
  window.localStorage.setItem(SIGN_IN_EMAIL_KEY, email)
}

export function isMagicLinkUrl(url: string): boolean {
  return isSignInWithEmailLink(auth, url)
}

export async function confirmMagicLink(url: string, email: string): Promise<User> {
  const result = await signInWithEmailLink(auth, email, url)
  window.localStorage.removeItem(SIGN_IN_EMAIL_KEY)
  return result.user
}

export function getStoredSignInEmail(): string | null {
  return window.localStorage.getItem(SIGN_IN_EMAIL_KEY)
}

export async function signOutPortal(): Promise<void> {
  await signOut(auth)
}

export function subscribeToAuthState(
  callback: (user: User | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, callback)
}

export type { User }
