import { storage } from './storage'

// XP rewards for different actions
export const XP_REWARDS = {
  tasbih: {
    perCount: 1,
    milestone: 100 // bonus XP at milestones
  },
  salah: {
    perPrayer: 20,
    allFive: 50 // bonus for completing all 5 prayers
  },
  sadaqah: {
    perEntry: 30
  }
}

// Level progression (XP required for each level)
export const LEVELS = [
  0, 100, 250, 450, 700, 1000, 1400, 1850, 2350, 2900, 3500,
  4150, 4850, 5600, 6400, 7250, 8150, 9100, 10100, 11150, 12250
]

// Badge definitions
export const BADGES = {
  tasbih_100: { name: 'First Century', description: 'Complete 100 tasbih', icon: '📿' },
  tasbih_1000: { name: 'Devoted', description: 'Complete 1000 tasbih', icon: '🌟' },
  tasbih_streak_7: { name: 'Weekly Warrior', description: '7-day tasbih streak', icon: '🔥' },
  salah_perfect_day: { name: 'Perfect Prayer', description: 'Complete all 5 prayers in a day', icon: '🕌' },
  salah_streak_7: { name: 'Steadfast', description: '7-day prayer streak', icon: '⭐' },
  sadaqah_first: { name: 'Generous Heart', description: 'First sadaqah entry', icon: '💝' },
  sadaqah_consistent: { name: 'Consistent Giver', description: '7 sadaqah entries', icon: '🤲' }
}

export const calculateLevel = (xp) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i]) {
      return i + 1
    }
  }
  return 1
}

export const getXpForNextLevel = (currentXp) => {
  const currentLevel = calculateLevel(currentXp)
  if (currentLevel >= LEVELS.length) return 0
  return LEVELS[currentLevel] - currentXp
}

export const awardXp = (amount, reason) => {
  const profile = storage.get('userProfile')
  const oldLevel = profile.level
  
  profile.xp += amount
  profile.level = calculateLevel(profile.xp)
  
  storage.set('userProfile', profile)

  // Check for level up
  if (profile.level > oldLevel) {
    return { levelUp: true, newLevel: profile.level, xpAwarded: amount }
  }
  
  return { levelUp: false, xpAwarded: amount }
}

export const checkAndAwardBadges = (type, data) => {
  const profile = storage.get('userProfile')
  const habits = storage.get('habits')
  
  let newBadges = []

  switch (type) {
    case 'tasbih':
      if (habits.tasbih.totalCount >= 100 && !profile.badges.includes('tasbih_100')) {
        profile.badges.push('tasbih_100')
        newBadges.push('tasbih_100')
      }
      if (habits.tasbih.totalCount >= 1000 && !profile.badges.includes('tasbih_1000')) {
        profile.badges.push('tasbih_1000')
        newBadges.push('tasbih_1000')
      }
      break
    
    case 'salah':
      if (data.allPrayersComplete && !profile.badges.includes('salah_perfect_day')) {
        profile.badges.push('salah_perfect_day')
        newBadges.push('salah_perfect_day')
      }
      break
    
    case 'sadaqah':
      if (habits.sadaqah.entries.length === 1 && !profile.badges.includes('sadaqah_first')) {
        profile.badges.push('sadaqah_first')
        newBadges.push('sadaqah_first')
      }
      if (habits.sadaqah.entries.length >= 7 && !profile.badges.includes('sadaqah_consistent')) {
        profile.badges.push('sadaqah_consistent')
        newBadges.push('sadaqah_consistent')
      }
      break
  }

  storage.set('userProfile', profile)
  return newBadges
}