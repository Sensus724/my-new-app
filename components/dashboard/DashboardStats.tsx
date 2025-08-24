'use client'

import { useState, useEffect } from 'react'

interface Stats {
  totalTests: number
  averageScore: number
  daysActive: number
  currentStreak: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalTests: 0,
    averageScore: 0,
    daysActive: 0,
    currentStreak: 0
  })

  useEffect(() => {
    // Simular carga de datos
    setStats({
      totalTests: 12,
      averageScore: 18,
      daysActive: 45,
      currentStreak: 7
    })
  }, [])

  const statCards = [
    {
      title: 'Tests Completados',
      value: stats.totalTests,
      icon: 'fas fa-clipboard-check',
      color: 'bg-blue-500',
      description: 'Evaluaciones realizadas'
    },
    {
      title: 'Puntuación Promedio',
      value: stats.averageScore,
      icon: 'fas fa-chart-line',
      color: 'bg-green-500',
      description: 'Nivel de ansiedad promedio'
    },
    {
      title: 'Días Activo',
      value: stats.daysActive,
      icon: 'fas fa-calendar-check',
      color: 'bg-purple-500',
      description: 'Días usando la app'
    },
    {
      title: 'Racha Actual',
      value: stats.currentStreak,
      icon: 'fas fa-fire',
      color: 'bg-orange-500',
      description: 'Días consecutivos'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Tu Progreso
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">
                  {stat.description}
                </p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
