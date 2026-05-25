import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore'
import { db } from './config'

export interface PortalClient {
  id: string
  email: string
  displayName: string
  slug: string
  createdAt: Timestamp
}

export interface PortalProject {
  id: string
  title: string
  slug: string
  status: 'in-review' | 'approved' | 'archived'
  revisionRound: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface PortalDeliverable {
  id: string
  type: 'figma' | 'video' | 'pdf' | 'web-preview'
  embedUrl: string
  revisionRound: number
  label: string
  createdAt: Timestamp
}

export interface PortalFeedbackInput {
  section: string
  body: string
  revisionRound: number
  submittedBy: string
}

function toClient(snap: QueryDocumentSnapshot<DocumentData>): PortalClient {
  const d = snap.data()
  return {
    id: snap.id,
    email: d['email'] as string,
    displayName: d['displayName'] as string,
    slug: d['slug'] as string,
    createdAt: d['createdAt'] as Timestamp,
  }
}

function toProject(snap: QueryDocumentSnapshot<DocumentData>): PortalProject {
  const d = snap.data()
  return {
    id: snap.id,
    title: d['title'] as string,
    slug: d['slug'] as string,
    status: d['status'] as PortalProject['status'],
    revisionRound: d['revisionRound'] as number,
    createdAt: d['createdAt'] as Timestamp,
    updatedAt: d['updatedAt'] as Timestamp,
  }
}

function toDeliverable(snap: QueryDocumentSnapshot<DocumentData>): PortalDeliverable {
  const d = snap.data()
  return {
    id: snap.id,
    type: d['type'] as PortalDeliverable['type'],
    embedUrl: d['embedUrl'] as string,
    revisionRound: d['revisionRound'] as number,
    label: d['label'] as string,
    createdAt: d['createdAt'] as Timestamp,
  }
}

export async function getClientByEmail(email: string): Promise<PortalClient | null> {
  const snap = await getDocs(
    query(collection(db, 'clients'), where('email', '==', email))
  )
  if (snap.empty) return null
  return toClient(snap.docs[0])
}

export async function getClientBySlug(slug: string): Promise<PortalClient | null> {
  const snap = await getDocs(
    query(collection(db, 'clients'), where('slug', '==', slug))
  )
  if (snap.empty) return null
  return toClient(snap.docs[0])
}

export async function getProjects(clientId: string): Promise<PortalProject[]> {
  const snap = await getDocs(
    query(
      collection(db, 'clients', clientId, 'projects'),
      orderBy('createdAt', 'desc')
    )
  )
  return snap.docs.map(toProject)
}

export async function getProjectBySlug(
  clientId: string,
  slug: string
): Promise<PortalProject | null> {
  const snap = await getDocs(
    query(
      collection(db, 'clients', clientId, 'projects'),
      where('slug', '==', slug)
    )
  )
  if (snap.empty) return null
  return toProject(snap.docs[0])
}

export async function getDeliverables(
  clientId: string,
  projectId: string
): Promise<PortalDeliverable[]> {
  const snap = await getDocs(
    query(
      collection(db, 'clients', clientId, 'projects', projectId, 'deliverables'),
      orderBy('revisionRound', 'desc'),
      orderBy('createdAt', 'desc')
    )
  )
  return snap.docs.map(toDeliverable)
}

export async function writeFeedback(
  clientId: string,
  projectId: string,
  input: PortalFeedbackInput
): Promise<void> {
  await addDoc(
    collection(db, 'clients', clientId, 'projects', projectId, 'feedback'),
    { ...input, createdAt: Timestamp.now() }
  )
}
