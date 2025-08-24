import React, { useState, useEffect } from 'react'

function Salah({ addXP }) {
  const [todayPrayers, setTodayPrayers] = useState(() => {
    const today = new Date().toDateString()
    const saved = localStorage.getItem(`salah-${today}`)
    return saved ? JSON.parse(saved) : {
      fajr: false,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false
    }
  })

  const prayers = [
    { key: 'fajr', name: 'Fajr', arabic: 'فَجْر', time: 'Dawn' },
    { key: 'dhuhr', name: 'Dhuhr', arabic: 'ظُهْر', time: 'Midday' },
    { key: 'asr', name: 'Asr', arabic: 'عَصْر', time: 'Afternoon' },
    { key: 'maghrib', name: 'Maghrib', arabic: 'مَغْرِب', time: 'Sunset' },
    { key: 'isha', name: 'Isha', arabic: 'عِشَاء', time: 'Night' }
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    localStorage.setItem(`salah-${today}`, JSON.stringify(todayPrayers))
  }, [todayPrayers])

  const togglePrayer = (prayerKey) => {
    setTodayPrayers(prev => {
      const newState = { ...prev, [prayerKey]: !prev[prayerKey] }
      
      // Give XP when marking prayer as completed
      if (!prev[prayerKey]) {
        addXP(20) // 20 XP per prayer
      }
      
      return newState
    })
  }

  const completedCount = Object.values(todayPrayers).filter(Boolean).length
  const completionPercentage = (completedCount / 5) * 100

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Daily Salah</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Today's Progress</span>
          <span className="text-sm text-slate-600">{completedCount}/5</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className="bg-primary-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {prayers.map(prayer => (
          <div 
            key={prayer.key}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              todayPrayers[prayer.key] 
                ? 'border-green-300 bg-green-50' 
                : 'border-slate-200 bg-white hover:border-primary-200'
            }`}
            onClick={() => togglePrayer(prayer.key)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{prayer.name}</div>
                <div className="text-primary-600">{prayer.arabic}</div>
                <div className="text-sm text-slate-500">{prayer.time}</div>
              </div>
              <div className="text-2xl">
                {todayPrayers[prayer.key] ? '✅' : '⏰'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {completedCount === 5 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <span className="text-green-700">🎉 All prayers completed today! +100 XP bonus!</span>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-slate-500">
        <p>Tap each prayer when completed to earn XP</p>
      </div>
    </div>
  )
}

export default Salah