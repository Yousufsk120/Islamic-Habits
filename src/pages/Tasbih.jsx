import React, { useState } from 'react'

function Tasbih({ addXP }) {
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(() => {
    return parseInt(localStorage.getItem('tasbihTotal') || '0')
  })
  
  const [selectedDhikr, setSelectedDhikr] = useState('SubhanAllah')
  
  const dhikrOptions = {
    'SubhanAllah': 'سُبْحَانَ ٱللَّٰهِ',
    'Alhamdulillah': 'ٱلْحَمْدُ لِلَّٰهِ',
    'Allahu Akbar': 'ٱللَّٰهُ أَكْبَرُ',
    'La ilaha illa Allah': 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ'
  }

  const increment = () => {
    const newCount = count + 1
    const newTotal = totalCount + 1
    
    setCount(newCount)
    setTotalCount(newTotal)
    localStorage.setItem('tasbihTotal', newTotal.toString())
    
    // Give XP every 33 counts (traditional tasbih cycle)
    if (newCount % 33 === 0) {
      addXP(10)
    }
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Tasbih Counter</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Dhikr:</label>
        <select 
          value={selectedDhikr}
          onChange={(e) => setSelectedDhikr(e.target.value)}
          className="w-full p-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {Object.entries(dhikrOptions).map(([key, arabic]) => (
            <option key={key} value={key}>
              {key} - {arabic}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mb-8">
        <div className="text-2xl mb-2 text-primary-600">
          {dhikrOptions[selectedDhikr]}
        </div>
        <div className="text-lg text-slate-600">{selectedDhikr}</div>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-primary mb-4">
          {count}
        </div>
        <div className="text-sm text-slate-500">
          Total: {totalCount.toLocaleString()}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={increment}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white text-xl font-bold py-6 px-6 rounded-2xl transition-colors active:scale-95"
        >
          Tap to Count
        </button>
        
        <button
          onClick={reset}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-6 rounded-lg transition-colors"
        >
          Reset Current
        </button>
      </div>

      {count > 0 && count % 33 === 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <span className="text-green-700">🎉 +10 XP earned! Complete tasbih cycle!</span>
        </div>
      )}
    </div>
  )
}

export default Tasbih