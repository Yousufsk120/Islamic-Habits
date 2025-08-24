import React from 'react'

function Rewards({ user }) {
  const xpToNextLevel = (user.level * 100) - user.xp
  const progressToNextLevel = (user.xp % 100)
  
  const badges = [
    { id: 'tasbih_100', name: 'Dhikr Devotee', description: '100 tasbih counts', icon: '📿', earned: user.xp >= 100 },
    { id: 'salah_week', name: 'Prayer Warrior', description: '7 days of complete salah', icon: '🕌', earned: user.level >= 3 },
    { id: 'sadaqah_10', name: 'Generous Heart', description: '10 sadaqah entries', icon: '💝', earned: user.level >= 5 },
    { id: 'level_5', name: 'Habit Builder', description: 'Reach level 5', icon: '🏆', earned: user.level >= 5 },
    { id: 'level_10', name: 'Islamic Scholar', description: 'Reach level 10', icon: '📚', earned: user.level >= 10 },
    { id: 'consistent', name: 'Consistency King', description: 'Use app 30 days', icon: '👑', earned: user.level >= 15 }
  ]

  const levels = [
    { level: 1, title: 'Beginner', color: 'text-slate-600' },
    { level: 5, title: 'Devoted', color: 'text-blue-600' },
    { level: 10, title: 'Committed', color: 'text-green-600' },
    { level: 15, title: 'Exemplary', color: 'text-purple-600' },
    { level: 20, title: 'Master', color: 'text-gold-600' }
  ]

  const currentLevelInfo = levels.reverse().find(l => user.level >= l.level) || levels[0]

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Rewards</h2>
      
      <div className="mb-8 p-6 bg-primary-50 rounded-2xl text-center">
        <div className="text-4xl mb-2">🏆</div>
        <div className="text-2xl font-bold text-primary mb-1">Level {user.level}</div>
        <div className={`text-sm mb-4 ${currentLevelInfo.color}`}>{currentLevelInfo.title}</div>
        <div className="text-lg font-semibold mb-2">{user.xp.toLocaleString()} XP</div>
        
        <div className="w-full bg-white rounded-full h-3 mb-2">
          <div 
            className="bg-primary-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressToNextLevel}%` }}
          ></div>
        </div>
        <div className="text-sm text-slate-600">
          {xpToNextLevel} XP to level {user.level + 1}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.map(badge => (
            <div 
              key={badge.id}
              className={`p-4 rounded-lg border-2 text-center ${
                badge.earned 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className={`font-medium text-sm mb-1 ${badge.earned ? 'text-green-800' : 'text-slate-600'}`}>
                {badge.name}
              </div>
              <div className={`text-xs ${badge.earned ? 'text-green-600' : 'text-slate-500'}`}>
                {badge.description}
              </div>
              {badge.earned && (
                <div className="text-xs text-green-600 font-medium mt-1">✓ Earned</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">How to Earn XP</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📿</span>
              <span className="font-medium">Tasbih (33 counts)</span>
            </div>
            <span className="text-blue-600 font-bold">+10 XP</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🕌</span>
              <span className="font-medium">Complete Prayer</span>
            </div>
            <span className="text-green-600 font-bold">+20 XP</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xl">💝</span>
              <span className="font-medium">Sadaqah Entry</span>
            </div>
            <span className="text-purple-600 font-bold">+15 XP</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🎉</span>
              <span className="font-medium">All Prayers (Bonus)</span>
            </div>
            <span className="text-yellow-600 font-bold">+100 XP</span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500">
        <p>Keep building your Islamic habits to unlock more rewards!</p>
      </div>
    </div>
  )
}

export default Rewards