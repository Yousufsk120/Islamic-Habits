import React, { useState, useEffect } from 'react'
import { Sunrise, Sun, Sunset, Moon, Star, Check, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { storage } from '../utils/storage'
import { awardXp, checkAndAwardBadges, XP_REWARDS } from '../utils/rewards'

const Salah = () => {
  const [prayers, setPrayers] = useState({})
  const [showReward, setShowReward] = useState(null)

  const prayerTimes = [
    { 
      key: 'fajr', 
      name: 'Fajr', 
      arabic: 'الفجر',
      icon: Star, 
      time: '5:30 AM',
      color: 'purple'
    },
    { 
      key: 'dhuhr', 
      name: 'Dhuhr', 
      arabic: 'الظهر',
      icon: Sun, 
      time: '12:30 PM',
      color: 'yellow'
    },
    { 
      key: 'asr', 
      name: 'Asr', 
      arabic: 'العصر',
      icon: Sunset, 
      time: '4:00 PM',
      color: 'orange'
    },
    { 
      key: 'maghrib', 
      name: 'Maghrib', 
      arabic: 'المغرب',
      icon: Sunset, 
      time: '6:45 PM',
      color: 'red'
    },
    { 
      key: 'isha', 
      name: 'Isha', 
      arabic: 'العشاء',
      icon: Moon, 
      time: '8:00 PM',
      color: 'indigo'
    }
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const habits = storage.get('habits')
    
    if (habits.salah.lastUpdated !== today) {
      // Reset prayers for new day
      habits.salah.prayers = {
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false
      }
      habits.salah.lastUpdated = today
      storage.set('habits', habits)
    }
    
    setPrayers(habits.salah.prayers)
  }, [])

  const togglePrayer = (prayerKey) => {
    const newPrayers = { ...prayers, [prayerKey]: !prayers[prayerKey] }
    setPrayers(newPrayers)
    
    // Update storage
    const habits = storage.get('habits')
    habits.salah.prayers = newPrayers
    storage.set('habits', habits)
    
    // Award XP if prayer was completed (not unchecked)
    if (newPrayers[prayerKey]) {
      let xpToAward = XP_REWARDS.salah.perPrayer
      
      // Check if all prayers are complete
      const allComplete = Object.values(newPrayers).every(Boolean)
      if (allComplete) {
        xpToAward += XP_REWARDS.salah.allFive
      }
      
      const reward = awardXp(xpToAward, 'salah')
      
      // Check for badges
      const newBadges = checkAndAwardBadges('salah', { allPrayersComplete: allComplete })
      
      if (reward.levelUp || newBadges.length > 0) {
        setShowReward({ ...reward, newBadges })
        setTimeout(() => setShowReward(null), 3000)
      }
    }
  }

  const completedCount = Object.values(prayers).filter(Boolean).length
  const progressPercentage = (completedCount / 5) * 100

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Prayers</h1>
        <p className="text-gray-600">Track your 5 daily prayers</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Today's Progress</h3>
          <span className="text-2xl font-bold text-primary-500">{completedCount}/5</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <motion.div 
            className="bg-primary-500 h-3 rounded-full transition-all duration-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
          ></motion.div>
        </div>
        
        <div className="text-center">
          {completedCount === 5 ? (
            <span className="text-green-600 font-medium">🎉 All prayers completed!</span>
          ) : (
            <span className="text-gray-600">{5 - completedCount} prayer(s) remaining</span>
          )}
        </div>
      </div>

      {/* Prayer List */}
      <div className="space-y-4 mb-6">
        {prayerTimes.map((prayer) => {
          const isCompleted = prayers[prayer.key]
          const Icon = prayer.icon
          
          return (
            <motion.div
              key={prayer.key}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-2xl p-4 shadow-lg border-2 transition-all cursor-pointer ${
                isCompleted 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => togglePrayer(prayer.key)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    isCompleted 
                      ? 'bg-green-100' 
                      : `bg-${prayer.color}-100`
                  }`}>
                    {isCompleted ? (
                      <Check className="text-green-600" size={24} />
                    ) : (
                      <Icon className={`text-${prayer.color}-600`} size={24} />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-800">{prayer.name}</h4>
                      <span className="text-lg">{prayer.arabic}</span>
                    </div>
                    <p className="text-sm text-gray-600">{prayer.time}</p>
                  </div>
                </div>
                
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-600"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Prayer Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500">{completedCount}</div>
            <div className="text-sm text-gray-600">Completed Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-600">Daily Progress</div>
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

export default Salah