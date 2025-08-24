import React, { useState, useEffect } from 'react'
import { RotateCcw, RefreshCw, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { storage } from '../utils/storage'
import { awardXp, checkAndAwardBadges, XP_REWARDS } from '../utils/rewards'

const Tasbih = () => {
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedDhikr, setSelectedDhikr] = useState('subhanallah')
  const [showReward, setShowReward] = useState(null)

  const dhikrOptions = [
    { key: 'subhanallah', text: 'سُبْحَانَ اللهِ', translation: 'SubhanAllah' },
    { key: 'alhamdulillah', text: 'الْحَمْدُ لِلهِ', translation: 'Alhamdulillah' },
    { key: 'la_hawla', text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ', translation: 'La hawla wa la quwwata illa billah' },
    { key: 'allahu_akbar', text: 'اللهُ أَكْبَرُ', translation: 'Allahu Akbar' },
    { key: 'istighfar', text: 'أَسْتَغْفِرُ اللهَ', translation: 'Astaghfirullah' }
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const habits = storage.get('habits')
    
    if (habits.tasbih.lastUpdated !== today) {
      // Reset daily count for new day
      habits.tasbih.todayCount = 0
      habits.tasbih.lastUpdated = today
      storage.set('habits', habits)
    }
    
    setCount(habits.tasbih.todayCount)
    setTotalCount(habits.tasbih.totalCount)
  }, [])

  const incrementCount = () => {
    const newCount = count + 1
    const newTotalCount = totalCount + 1
    
    setCount(newCount)
    setTotalCount(newTotalCount)
    
    // Update storage
    const habits = storage.get('habits')
    habits.tasbih.todayCount = newCount
    habits.tasbih.totalCount = newTotalCount
    storage.set('habits', habits)
    
    // Award XP
    let xpToAward = XP_REWARDS.tasbih.perCount
    if (newTotalCount % 100 === 0) {
      xpToAward += XP_REWARDS.tasbih.milestone
    }
    
    const reward = awardXp(xpToAward, 'tasbih')
    
    // Check for badges
    const newBadges = checkAndAwardBadges('tasbih')
    
    if (reward.levelUp || newBadges.length > 0) {
      setShowReward({ ...reward, newBadges })
      setTimeout(() => setShowReward(null), 3000)
    }
  }

  const resetCount = () => {
    setCount(0)
    const habits = storage.get('habits')
    habits.tasbih.todayCount = 0
    storage.set('habits', habits)
  }

  const selectedDhikrData = dhikrOptions.find(d => d.key === selectedDhikr)

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tasbih Counter</h1>
        <p className="text-gray-600">Dhikr and remembrance of Allah</p>
      </div>

      {/* Dhikr Selection */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Dhikr</h3>
        <div className="space-y-2">
          {dhikrOptions.map((dhikr) => (
            <button
              key={dhikr.key}
              onClick={() => setSelectedDhikr(dhikr.key)}
              className={`w-full p-3 rounded-xl border-2 transition-all ${
                selectedDhikr === dhikr.key
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-right mb-1">
                <span className="text-lg">{dhikr.text}</span>
              </div>
              <div className="text-left">
                <span className="text-sm text-gray-600">{dhikr.translation}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Dhikr Display */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg text-center">
        <div className="text-2xl mb-4 text-right leading-relaxed">
          {selectedDhikrData.text}
        </div>
        <div className="text-gray-600 mb-4">
          {selectedDhikrData.translation}
        </div>
      </div>

      {/* Counter */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg text-center">
        <div className="mb-4">
          <div className="text-6xl font-bold text-primary-500 mb-2">{count}</div>
          <div className="text-gray-600">Today's Count</div>
          <div className="text-sm text-gray-500">Total: {totalCount.toLocaleString()}</div>
        </div>
        
        {/* Counter Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={incrementCount}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-6 px-8 rounded-2xl text-xl mb-4 transition-colors shadow-lg"
        >
          Count
        </motion.button>
        
        {/* Reset Button */}
        <button
          onClick={resetCount}
          className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RefreshCw size={16} />
          Reset Today's Count
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Today</span>
            <span className="font-bold">{count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">All Time</span>
            <span className="font-bold">{totalCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Next Milestone</span>
            <span className="font-bold">{Math.ceil(totalCount / 100) * 100}</span>
          </div>
        </div>
      </div>

      {/* Reward Notification */}
      {showReward && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-4 right-4 bg-yellow-400 text-yellow-900 p-4 rounded-xl shadow-lg z-50"
        >
          <div className="flex items-center gap-2">
            <Trophy size={20} />
            <div>
              <div className="font-bold">+{showReward.xpAwarded} XP!</div>
              {showReward.levelUp && (
                <div className="text-sm">Level up! Now level {showReward.newLevel}</div>
              )}
              {showReward.newBadges?.length > 0 && (
                <div className="text-sm">New badge earned!</div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Tasbih