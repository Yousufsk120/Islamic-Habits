import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, Sunrise, Heart, Trophy, Star } from 'lucide-react'
import { storage, initializeStorage } from '../utils/storage'
import { calculateLevel, getXpForNextLevel, LEVELS } from '../utils/rewards'

const Dashboard = () => {
  const [profile, setProfile] = useState(null)
  const [habits, setHabits] = useState(null)

  useEffect(() => {
    initializeStorage()
    setProfile(storage.get('userProfile'))
    setHabits(storage.get('habits'))
  }, [])

  if (!profile || !habits) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const today = new Date().toDateString()
  const completedPrayers = Object.values(habits.salah.prayers).filter(Boolean).length
  const xpToNext = getXpForNextLevel(profile.xp)

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          السلام عليكم
        </h1>
        <p className="text-gray-600">Track your Islamic habits with rewards</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Level {profile.level}</h2>
            <p className="text-gray-600">{profile.xp} XP</p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" size={24} />
            <span className="font-bold text-xl">{profile.badges.length}</span>
          </div>
        </div>
        
        {xpToNext > 0 && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress to next level</span>
              <span>{xpToNext} XP remaining</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.max(0, 100 - (xpToNext / (LEVELS[profile.level] - LEVELS[profile.level - 1]) * 100))}%` 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Today's Overview */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Today's Progress</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-xl mb-2">
              <RotateCcw className="text-blue-600 mx-auto" size={24} />
            </div>
            <p className="text-sm text-gray-600">Tasbih</p>
            <p className="font-bold text-lg">{habits.tasbih.todayCount}</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 p-3 rounded-xl mb-2">
              <Sunrise className="text-orange-600 mx-auto" size={24} />
            </div>
            <p className="text-sm text-gray-600">Salah</p>
            <p className="font-bold text-lg">{completedPrayers}/5</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-xl mb-2">
              <Heart className="text-red-600 mx-auto" size={24} />
            </div>
            <p className="text-sm text-gray-600">Sadaqah</p>
            <p className="font-bold text-lg">{habits.sadaqah.entries.filter(e => e.date === today).length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Link 
          to="/tasbih"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <RotateCcw className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Tasbih Counter</h4>
              <p className="text-sm text-gray-600">Count dhikr and earn XP</p>
            </div>
          </div>
          <Star className="text-gray-400" size={16} />
        </Link>

        <Link 
          to="/salah"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Sunrise className="text-orange-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Daily Prayers</h4>
              <p className="text-sm text-gray-600">Track your 5 daily prayers</p>
            </div>
          </div>
          <Star className="text-gray-400" size={16} />
        </Link>

        <Link 
          to="/sadaqah"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Heart className="text-red-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Sadaqah Log</h4>
              <p className="text-sm text-gray-600">Record your charitable giving</p>
            </div>
          </div>
          <Star className="text-gray-400" size={16} />
        </Link>
      </div>
    </div>
  )
}

export default Dashboard