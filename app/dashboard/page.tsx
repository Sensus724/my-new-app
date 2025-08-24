'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardStats from '@/components/dashboard/DashboardStats'
import RecentActivities from '@/components/dashboard/RecentActivities'
import AnxietyChart from '@/components/dashboard/AnxietyChart'
import QuickActions from '@/components/dashboard/QuickActions'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [session, status, router])

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={session.user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats />
            <AnxietyChart />
            <RecentActivities />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
