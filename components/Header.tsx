'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  const linkBase = 'transition-colors duration-200'
  const getNavClass = (path: string) => {
    const isActive = pathname === path
    return `nav-link ${linkBase} ${isActive ? 'text-primary font-semibold border-b-2 border-primary' : 'text-gray-700 hover:text-primary/80'}`
  }
  const getMobileNavClass = (path: string) => {
    const isActive = pathname === path
    return `nav-link-mobile ${linkBase} ${isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary/80'}`
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-md'
    } border-b border-primary/10`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Sensus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={getNavClass('/')}> 
              <i className="fas fa-home mr-2"></i>Inicio
            </Link>
            <Link href="/anxiety-types" className={getNavClass('/anxiety-types')}>
              <i className="fas fa-brain mr-2"></i>Tipos de Ansiedad
            </Link>
            <Link href="/evaluation" className={getNavClass('/evaluation')}>
              <i className="fas fa-clipboard-check mr-2"></i>Evaluación
            </Link>
            <Link href="/therapeutic-help" className={getNavClass('/therapeutic-help')}>
              <i className="fas fa-hands-helping mr-2"></i>Ayuda Terapéutica
            </Link>
            <Link href="/blog" className={getNavClass('/blog')}>
              <i className="fas fa-blog mr-2"></i>Blog
            </Link>
            <Link href="/contact" className={getNavClass('/contact')}>
              <i className="fas fa-envelope mr-2"></i>Contacto
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="btn-secondary"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="btn-secondary">
                  Iniciar Sesión
                </Link>
                <Link href="/register" className="btn-primary">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link href="/" className={getMobileNavClass('/')}> 
                <i className="fas fa-home mr-2"></i>Inicio
              </Link>
              <Link href="/anxiety-types" className={getMobileNavClass('/anxiety-types')}>
                <i className="fas fa-brain mr-2"></i>Tipos de Ansiedad
              </Link>
              <Link href="/evaluation" className={getMobileNavClass('/evaluation')}>
                <i className="fas fa-clipboard-check mr-2"></i>Evaluación
              </Link>
              <Link href="/therapeutic-help" className={getMobileNavClass('/therapeutic-help')}>
                <i className="fas fa-hands-helping mr-2"></i>Ayuda Terapéutica
              </Link>
              <Link href="/blog" className={getMobileNavClass('/blog')}>
                <i className="fas fa-blog mr-2"></i>Blog
              </Link>
              <Link href="/contact" className={getMobileNavClass('/contact')}>
                <i className="fas fa-envelope mr-2"></i>Contacto
              </Link>
              
              {session ? (
                <>
                  <Link href="/dashboard" className="btn-primary-mobile">
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="btn-secondary-mobile"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary-mobile">
                    Iniciar Sesión
                  </Link>
                  <Link href="/register" className="btn-primary-mobile">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
