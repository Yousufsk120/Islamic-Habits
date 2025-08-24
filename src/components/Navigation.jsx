import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, RotateCcw, Sunrise, Heart, User } from 'lucide-react'

const Navigation = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/tasbih', icon: RotateCcw, label: 'Tasbih' },
    { to: '/salah', icon: Sunrise, label: 'Salah' },
    { to: '/sadaqah', icon: Heart, label: 'Sadaqah' },
    { to: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-primary-500'
                  : 'text-gray-600 hover:text-primary-400'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation