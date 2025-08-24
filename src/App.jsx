import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import InstallBanner from './components/InstallBanner'

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tasbih = lazy(() => import('./pages/Tasbih'))
const Salah = lazy(() => import('./pages/Salah'))
const Sadaqah = lazy(() => import('./pages/Sadaqah'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <InstallBanner />
        <Navigation />
        <main className="pb-20">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasbih" element={<Tasbih />} />
              <Route path="/salah" element={<Salah />} />
              <Route path="/sadaqah" element={<Sadaqah />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App