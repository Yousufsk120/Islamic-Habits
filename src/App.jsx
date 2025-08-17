import { useState } from 'react'

function App() {
  const [tasbihCount, setTasbihCount] = useState(0)

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Islamic Habits</h1>
          <p className="text-slate-600">Dhikr • Salah • Sadaqah</p>
        </header>
        
        <main className="max-w-2xl mx-auto">
          {/* Tasbih Counter */}
          <div className="bg-primary-50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Tasbih Counter</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-4">{tasbihCount}</div>
              <button
                onClick={() => setTasbihCount(prev => prev + 1)}
                className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Count
              </button>
              <button
                onClick={() => setTasbihCount(0)}
                className="ml-4 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Daily Salah Tracker */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Daily Salah Tracker</h2>
            <p className="text-slate-600">Track your five daily prayers</p>
          </div>

          {/* Sadaqah Log */}
          <div className="bg-green-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Sadaqah Log</h2>
            <p className="text-slate-600">Keep track of your charitable deeds</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App