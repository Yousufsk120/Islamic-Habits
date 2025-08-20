import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Islamic Habits</h1>
          <p className="text-gray-600">Dhikr • Salah • Sadaqah</p>
        </header>
        
        <main className="max-w-md mx-auto space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Welcome</h2>
            <p className="text-gray-600 mb-4">
              Build daily Islamic habits with a playful reward system.
            </p>
            <p className="text-sm text-gray-500">
              App is now building successfully! 🎉
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App