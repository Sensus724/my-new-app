'use client'

import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      title: 'Realizar Test Hamilton',
      description: 'Evalúa tu nivel de ansiedad actual',
      icon: 'fas fa-clipboard-list',
      href: '/hamilton-test',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Registrar Ansiedad',
      description: 'Documenta tu estado emocional',
      icon: 'fas fa-edit',
      href: '/anxiety-log',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Ejercicios de Respiración',
      description: 'Técnicas de relajación rápida',
      icon: 'fas fa-wind',
      href: '/breathing-exercises',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Meditación Guiada',
      description: 'Sesiones de mindfulness',
      icon: 'fas fa-om',
      href: '/meditation',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Diario de Actividades',
      description: 'Registra tus actividades diarias',
      icon: 'fas fa-book',
      href: '/activity-log',
      color: 'bg-red-500 hover:bg-red-600'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Acciones Rápidas
      </h2>
      
      <div className="space-y-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`block ${action.color} text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <i className={`${action.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link
          href="/emergency-contacts"
          className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-3 transition-colors"
        >
          <i className="fas fa-phone-alt mr-2"></i>
          Contactos de Emergencia
        </Link>
      </div>
    </div>
  )
}
