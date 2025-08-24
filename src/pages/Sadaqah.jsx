import React, { useState, useEffect } from 'react'

function Sadaqah({ addXP }) {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('sadaqahEntries')
    return saved ? JSON.parse(saved) : []
  })

  const [newEntry, setNewEntry] = useState({
    type: '',
    description: '',
    amount: ''
  })

  const sadaqahTypes = [
    'Money donation',
    'Food donation',
    'Clothing donation',
    'Blood donation',
    'Volunteering',
    'Helping someone',
    'Teaching/Sharing knowledge',
    'Environmental (tree planting, etc.)',
    'Other good deed'
  ]

  useEffect(() => {
    localStorage.setItem('sadaqahEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = () => {
    if (!newEntry.type || !newEntry.description) return

    const entry = {
      ...newEntry,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    }

    setEntries(prev => [entry, ...prev])
    setNewEntry({ type: '', description: '', amount: '' })
    addXP(15) // 15 XP per sadaqah entry
  }

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const totalEntries = entries.length
  const thisWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.timestamp)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate >= weekAgo
  }).length

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Sadaqah Log</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{totalEntries}</div>
          <div className="text-sm text-slate-600">Total Acts</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{thisWeekEntries}</div>
          <div className="text-sm text-slate-600">This Week</div>
        </div>
      </div>

      <div className="mb-8 p-4 border border-primary-200 rounded-lg">
        <h3 className="font-semibold mb-4">Add New Entry</h3>
        
        <div className="space-y-4">
          <select
            value={newEntry.type}
            onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select type of sadaqah...</option>
            {sadaqahTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Description (what did you do?)"
            value={newEntry.description}
            onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Amount (optional)"
            value={newEntry.amount}
            onChange={(e) => setNewEntry(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          <button
            onClick={addEntry}
            disabled={!newEntry.type || !newEntry.description}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors"
          >
            Add Entry (+15 XP)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Recent Entries</h3>
        {entries.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No sadaqah entries yet. Start by adding one above!</p>
        ) : (
          entries.slice(0, 10).map(entry => (
            <div key={entry.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-green-800">{entry.type}</div>
                <button 
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ×
                </button>
              </div>
              <div className="text-sm text-slate-700 mb-1">{entry.description}</div>
              {entry.amount && (
                <div className="text-sm text-slate-600 mb-1">Amount: {entry.amount}</div>
              )}
              <div className="text-xs text-slate-500">{entry.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Sadaqah