import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Islamic Habits</h1>
          <p className="text-lg text-slate-600 mt-2">
            Dhikr • Salah • Sadaqah
          </p>
        </header>
        
        <main className="text-center">
          <p className="text-slate-700">
            Gamified Islamic habits tracker: tasbih, salah, adhkar, fasting, sadaqah. 
            Earn rewards while building consistency.
          </p>
        </main>
      </div>
    </div>
  )
}

export default App