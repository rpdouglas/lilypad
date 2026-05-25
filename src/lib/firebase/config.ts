import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC0vpYDeCNk0wYddQadw3kkzCfiVQQv8Bk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'freshnest-aa51e.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'freshnest-aa51e',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'freshnest-aa51e.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '521227407391',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:521227407391:web:c7d1886cf87a74434e452a',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
