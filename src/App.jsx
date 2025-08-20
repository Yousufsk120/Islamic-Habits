import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Placeholder components for testing
const Home = () => <div className="p-8"><h1 className="text-2xl font-bold text-primary">Islamic Habits - Home</h1></div>
const Tasbih = () => <div className="p-8"><h1 className="text-2xl font-bold text-primary">Tasbih Counter</h1></div>
const Salah = () => <div className="p-8"><h1 className="text-2xl font-bold text-primary">Daily Salah Tracker</h1></div>
const Sadaqah = () => <div className="p-8"><h1 className="text-2xl font-bold text-primary">Sadaqah Log</h1></div>

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <nav className="bg-primary text-white p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-bold">Islamic Habits</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasbih" element={<Tasbih />} />
          <Route path="/salah" element={<Salah />} />
          <Route path="/sadaqah" element={<Sadaqah />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App