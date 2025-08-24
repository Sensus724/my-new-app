'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface User {
  name?: string | null
  email?: string | null
}

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sensus
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link 
                href="/profile"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-user-circle text-xl"></i>
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Cerrar sesión"
              >
                <i className="fas fa-sign-out-alt text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
