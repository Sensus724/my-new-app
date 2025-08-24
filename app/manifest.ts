import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sensus - Encuentra tu Calma',
    short_name: 'Sensus',
    description: 'Tu espacio seguro para el manejo de la ansiedad',
    start_url: '/',
    scope: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}


