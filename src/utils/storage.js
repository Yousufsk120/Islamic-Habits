// Local storage utilities for persisting app data
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error)
      return defaultValue
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error)
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }
}

// Initialize default data if not exists
export const initializeStorage = () => {
  if (!storage.get('userProfile')) {
    storage.set('userProfile', {
      xp: 0,
      level: 1,
      badges: [],
      streaks: {
        tasbih: 0,
        salah: 0,
        sadaqah: 0
      }
    })
  }

  if (!storage.get('habits')) {
    storage.set('habits', {
      tasbih: {
        todayCount: 0,
        totalCount: 0,
        lastUpdated: new Date().toDateString()
      },
      salah: {
        prayers: {
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false
        },
        lastUpdated: new Date().toDateString()
      },
      sadaqah: {
        entries: [],
        totalAmount: 0
      }
    })
  }
}