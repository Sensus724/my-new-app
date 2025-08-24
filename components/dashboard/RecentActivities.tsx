'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface TestResult {
  id: string
  type: 'stress' | 'depression' | 'hamilton'
  score: number
  level?: string
  result?: string
  createdAt: Date
}

export default function RecentActivities() {
  const { data: session } = useSession()
  const [activities, setActivities] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/user-tests')
        if (response.ok) {
          const data = await response.json()
          
          // Combinar todos los tests y ordenar por fecha
          const allTests: TestResult[] = [
            ...data.stressTests.map((test: any) => ({
              ...test,
              type: 'stress' as const
            })),
            ...data.depressionTests.map((test: any) => ({
              ...test,
              type: 'depression' as const
            })),
            ...data.hamiltonTests.map((test: any) => ({
              ...test,
              type: 'hamilton' as const
            }))
          ]

          // Ordenar por fecha más reciente y tomar los últimos 5
          const sortedTests = allTests
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)

          setActivities(sortedTests)
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [session?.user?.id])

  const getTestInfo = (test: TestResult) => {
    switch (test.type) {
      case 'stress':
        return {
          title: 'Test de Estrés Completado',
          description: `Puntuación: ${test.score} - Nivel: ${test.level}`,
          icon: 'fas fa-fire',
          color: 'bg-orange-500'
        }
      case 'depression':
        return {
          title: 'Test de Depresión Completado',
          description: `Puntuación: ${test.score} - Nivel: ${test.level}`,
          icon: 'fas fa-cloud-rain',
          color: 'bg-blue-500'
        }
      case 'hamilton':
        return {
          title: 'Test Hamilton Completado',
          description: `Puntuación: ${test.score} - ${test.result}`,
          icon: 'fas fa-clipboard-check',
          color: 'bg-purple-500'
        }
      default:
        return {
          title: 'Test Completado',
          description: `Puntuación: ${test.score}`,
          icon: 'fas fa-clipboard',
          color: 'bg-gray-500'
        }
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hoy'
    if (diffDays === 2) return 'Ayer'
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`
    return new Date(date).toLocaleDateString('es-ES')
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Actividades Recientes
          </h2>
        </div>
        <div className="text-center py-8">
          <i className="fas fa-spinner fa-spin text-2xl text-primary mb-4"></i>
          <p className="text-gray-500">Cargando actividades...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Actividades Recientes
        </h2>
        <Link
          href="/evaluation"
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          Ver todas
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const info = getTestInfo(activity)
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`${info.color} text-white p-3 rounded-lg flex-shrink-0`}>
                <i className={`${info.icon} text-lg`}></i>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">
                  {info.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {info.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(activity.createdAt)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <i className="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No hay actividades recientes</p>
          <Link
            href="/evaluation"
            className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
          >
            Comenzar tu primera actividad
          </Link>
        </div>
      )}
    </div>
  )
}
