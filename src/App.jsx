import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load pages
const Tasbih = lazy(() => import('./pages/Tasbih'))
const Salah = lazy(() => import('./pages/Salah'))  
const Sadaqah = lazy(() => import('./pages/Sadaqah'))
const Rewards = lazy(() => import('./pages/Rewards'))

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('islamicHabitsUser')
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      badges: [],
      streaks: {
        tasbih: 0,
        salah: 0,
        sadaqah: 0
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('islamicHabitsUser', JSON.stringify(user))
  }, [user])

  const addXP = (points) => {
    setUser(prev => {
      const newXP = prev.xp + points
      const newLevel = Math.floor(newXP / 100) + 1
      return { ...prev, xp: newXP, level: newLevel }
    })
  }

  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-900 antialiased">
        <header className="bg-primary-50 border-b border-primary-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-primary">Islamic Habits</h1>
              </Link>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-primary-600">Level {user.level}</span>
                <span className="text-primary-600">{user.xp} XP</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasbih" element={<Tasbih addXP={addXP} />} />
              <Route path="/salah" element={<Salah addXP={addXP} />} />
              <Route path="/sadaqah" element={<Sadaqah addXP={addXP} />} />
              <Route path="/rewards" element={<Rewards user={user} />} />
            </Routes>
          </Suspense>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-around py-2">
              <NavLink to="/tasbih" title="Tasbih">📿</NavLink>
              <NavLink to="/salah" title="Salah">🕌</NavLink>
              <NavLink to="/sadaqah" title="Sadaqah">💝</NavLink>
              <NavLink to="/rewards" title="Rewards">🏆</NavLink>
            </div>
          </div>
        </nav>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Dhikr • Salah • Sadaqah
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Gamified Islamic habits tracker. Earn rewards while building consistency.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <FeatureCard 
          to="/tasbih"
          icon="📿"
          title="Tasbih Counter"
          description="Count your dhikr and earn XP"
        />
        <FeatureCard 
          to="/salah"
          icon="🕌"
          title="Salah Tracker"
          description="Track your daily prayers"
        />
        <FeatureCard 
          to="/sadaqah"
          icon="💝"
          title="Sadaqah Log"
          description="Record your charitable acts"
        />
      </div>
    </div>
  )
}

function FeatureCard({ to, icon, title, description }) {
  return (
    <Link 
      to={to}
      className="block p-6 bg-primary-50 rounded-2xl hover:bg-primary-100 transition-colors"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-primary-700">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </Link>
  )
}

function NavLink({ to, title, children }) {
  return (
    <Link 
      to={to}
      className="flex flex-col items-center py-2 px-3 text-2xl hover:bg-primary-50 rounded-lg transition-colors"
      title={title}
    >
      {children}
      <span className="text-xs mt-1 text-slate-600">{title}</span>
    </Link>
  )
}

export default App