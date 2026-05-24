import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const StartPage = lazy(() => import('@/pages/StartPage'))

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Suspense fallback={null}><HomePage /></Suspense> },
      { path: '/services', element: <Suspense fallback={null}><ServicesPage /></Suspense> },
      { path: '/about', element: <Suspense fallback={null}><AboutPage /></Suspense> },
      { path: '/start', element: <Suspense fallback={null}><StartPage /></Suspense> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
