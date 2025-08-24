import React, { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowBanner(false)
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('installBannerDismissed', 'true')
  }

  if (!showBanner || !deferredPrompt || localStorage.getItem('installBannerDismissed')) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary-500 text-white p-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        <Download size={20} />
        <span className="text-sm font-medium">Install Islamic Habits for quick access</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="bg-white text-primary-500 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-primary-600 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default InstallBanner