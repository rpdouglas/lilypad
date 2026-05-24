import '@testing-library/jest-dom'
import { afterAll, beforeAll, vi } from 'vitest'

// Mock Firebase to prevent real network calls during tests
vi.mock('./lib/firebase/config', () => ({
  auth: {},
  db: {},
  storage: {},
}))

// eslint-disable-next-line no-console
const originalError = console.error
beforeAll(() => {
  // eslint-disable-next-line no-console
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return
    originalError(...args)
  }
})

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = originalError
})
