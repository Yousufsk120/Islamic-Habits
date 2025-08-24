import React, { useState, useEffect } from 'react'
import { Heart, Plus, DollarSign, Trophy, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { storage } from '../utils/storage'
import { awardXp, checkAndAwardBadges, XP_REWARDS } from '../utils/rewards'

const Sadaqah = () => {
  const [entries, setEntries] = useState([])
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showReward, setShowReward] = useState(null)

  useEffect(() => {
    const habits = storage.get('habits')
    setEntries(habits.sadaqah.entries || [])
  }, [])

  const addEntry = () => {
    if (!amount || parseFloat(amount) <= 0) return

    const newEntry = {
      id: Date.now(),
      amount: parseFloat(amount),
      description: description.trim() || 'Sadaqah',
      date: new Date().toDateString(),
      timestamp: new Date().toISOString()
    }

    const newEntries = [newEntry, ...entries]
    setEntries(newEntries)

    // Update storage
    const habits = storage.get('habits')
    habits.sadaqah.entries = newEntries
    habits.sadaqah.totalAmount = newEntries.reduce((sum, entry) => sum + entry.amount, 0)
    storage.set('habits', habits)

    // Award XP
    const reward = awardXp(XP_REWARDS.sadaqah.perEntry, 'sadaqah')
    
    // Check for badges
    const newBadges = checkAndAwardBadges('sadaqah')
    
    if (reward.levelUp || newBadges.length > 0) {
      setShowReward({ ...reward, newBadges })
      setTimeout(() => setShowReward(null), 3000)
    }

    // Reset form
    setAmount('')
    setDescription('')
    setShowForm(false)
  }

  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0)
  const todaysEntries = entries.filter(entry => entry.date === new Date().toDateString())
  const todaysAmount = todaysEntries.reduce((sum, entry) => sum + entry.amount, 0)

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sadaqah Tracker</h1>
        <p className="text-gray-600">Record your charitable giving</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-green-500">${todaysAmount.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Today</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-primary-500">${totalAmount.toFixed(2)}</div>
          <div className="text-sm text-gray-600">All Time</div>
        </div>
      </div>

      {/* Add Entry Button */}
      {!showForm && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-2xl mb-6 flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <Plus size={20} />
          Add Sadaqah Entry
        </motion.button>
      )}

      {/* Add Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">New Sadaqah Entry</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Food for the needy, mosque donation, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                onClick={addEntry}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Add Entry
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setAmount('')
                  setDescription('')
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Entries List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Heart className="text-red-500" size={20} />
          Recent Entries
        </h3>
        
        {entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Heart className="mx-auto mb-3 text-gray-300" size={48} />
            <p>No sadaqah entries yet</p>
            <p className="text-sm">Start your journey of giving</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {entries.map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-green-600 text-lg">
                    ${entry.amount.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700">{entry.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {entries.length > 0 && (
        <div className="bg-white rounded-2xl p-6 mt-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Entries</span>
              <span className="font-bold">{entries.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Amount</span>
              <span className="font-bold">${(totalAmount / entries.length).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

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

export default Sadaqah