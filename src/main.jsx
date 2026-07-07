/* eslint-disable react-refresh/only-export-components -- entry point, not a refreshable module */
import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.jsx'

const BookDemo = lazy(() => import('./pages/BookDemo.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))

/* Scroll to #hash targets on route change; otherwise reset to top. */
function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/book-demo"
          element={
            <Suspense fallback={null}>
              <BookDemo />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={null}>
              <Privacy />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
    <SpeedInsights />
  </StrictMode>,
)
