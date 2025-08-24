'use client'

import { useEffect } from 'react'

export default function PWARegistration() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('serviceWorker' in navigator) {
      const register = async () => {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js')
          // Update flow
          if (reg && reg.update) reg.update()
        } catch (err) {
          console.error('SW registration failed', err)
        }
      }
      // register after page load for reliability
      if (document.readyState === 'complete') register()
      else window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}


