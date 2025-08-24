import React, { useState, useEffect } from 'react'
import { Trophy, Star, Award, RotateCcw, Sunrise, Heart } from 'lucide-react'
import { storage } from '../utils/storage'
import { calculateLevel, getXpForNextLevel, LEVELS, BADGES } from '../utils/rewards'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [habits, setHabits] = useState(null)

  useEffect(() => {
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

  const xpToNext = getXpForNextLevel(profile.xp)
  const currentLevelXp = profile.level > 1 ? LEVELS[profile.level - 1] : 0
  const nextLevelXp = profile.level < LEVELS.length ? LEVELS[profile.level] : profile.xp
  const progressPercentage = ((profile.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Your Islamic habits journey</p>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">Level {profile.level}</div>
          <div className="text-lg opacity-90">{profile.xp} XP</div>
          
          {xpToNext > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm opacity-75 mb-1">
                <span>Progress to next level</span>
                <span>{xpToNext} XP remaining</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(0, progressPercentage)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Award className="text-yellow-500" size={20} />
          Badges ({profile.badges.length})
        </h3>
        
        {profile.badges.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="mx-auto mb-3 text-gray-300" size={48} />
            <p>No badges earned yet</p>
            <p className="text-sm">Complete habits to earn badges</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {profile.badges.map((badgeKey) => {
              const badge = BADGES[badgeKey]
              return (
                <div key={badgeKey} className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="font-medium text-sm text-gray-800">{badge.name}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Statistics</h3>
        
        <div className="space-y-4">
          {/* Tasbih Stats */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-3">
              <RotateCcw className="text-blue-600" size={20} />
              <div>
                <div className="font-medium text-gray-800">Tasbih</div>
                <div className="text-sm text-gray-600">Total count</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{habits.tasbih.totalCount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Today: {habits.tasbih.todayCount}</div>
            </div>
          </div>

          {/* Salah Stats */}
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Sunrise className="text-orange-600" size={20} />
              <div>
                <div className="font-medium text-gray-800">Salah</div>
                <div className="text-sm text-gray-600">Today's prayers</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                {Object.values(habits.salah.prayers).filter(Boolean).length}/5
              </div>
              <div className="text-sm text-gray-600">
                {Math.round((Object.values(habits.salah.prayers).filter(Boolean).length / 5) * 100)}%
              </div>
            </div>
          </div>

          {/* Sadaqah Stats */}
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Heart className="text-red-600" size={20} />
              <div>
                <div className="font-medium text-gray-800">Sadaqah</div>
                <div className="text-sm text-gray-600">Total given</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">${habits.sadaqah.totalAmount?.toFixed(2) || '0.00'}</div>
              <div className="text-sm text-gray-600">{habits.sadaqah.entries.length} entries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Badges */}
      <div className="bg-white rounded-2xl p-6 mt-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Available Badges</h3>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(BADGES).map(([badgeKey, badge]) => {
            const earned = profile.badges.includes(badgeKey)
            return (
              <div 
                key={badgeKey} 
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  earned 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`text-2xl ${earned ? '' : 'grayscale opacity-50'}`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${earned ? 'text-gray-800' : 'text-gray-500'}`}>
                    {badge.name}
                  </div>
                  <div className={`text-sm ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </div>
                </div>
                {earned && (
                  <Star className="text-yellow-500" size={16} fill="currentColor" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile