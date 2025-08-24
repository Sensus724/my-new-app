import Header from '@/components/Header'
import Link from 'next/link'
// import { motion } from 'framer-motion'

export default function EvaluationPage() {
  const evaluations = [
    {
      title: 'Test de Hamilton',
      description: 'Evaluación profesional del nivel de ansiedad basada en criterios clínicos.',
      duration: '10-15 minutos',
      questions: '14 preguntas',
      icon: 'fas fa-clipboard-check',
      href: '/hamilton-test',
      color: 'bg-blue-500'
    },
    {
      title: 'Evaluación de Estrés',
      description: 'Medición del nivel de estrés y su impacto en la vida diaria.',
      duration: '5-10 minutos',
      questions: '10 preguntas',
      icon: 'fas fa-chart-line',
      href: '/stress-test',
      color: 'bg-green-500'
    },
    {
      title: 'Test de Depresión',
      description: 'Evaluación de síntomas depresivos y su severidad.',
      duration: '8-12 minutos',
      questions: '12 preguntas',
      icon: 'fas fa-heart',
      href: '/depression-test',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Evaluaciones Psicológicas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas profesionales para evaluar tu estado mental y emocional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {evaluations.map((evaluation, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className={`${evaluation.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${evaluation.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{evaluation.title}</h3>
                  <p className="text-gray-600">{evaluation.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duración:</span>
                    <span className="font-medium">{evaluation.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Preguntas:</span>
                    <span className="font-medium">{evaluation.questions}</span>
                  </div>
                </div>
                
                <Link 
                  href={evaluation.href}
                  className={`block w-full ${evaluation.color} hover:opacity-90 text-white text-center py-3 rounded-lg font-semibold transition-opacity`}
                >
                  Comenzar Evaluación
                                 </Link>
               </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Información Importante
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <i className="fas fa-shield-alt text-primary mr-2"></i>
                  Privacidad Garantizada
                </h3>
                <p className="text-gray-600">
                  Todos tus resultados son completamente privados y solo tú tienes acceso a ellos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <i className="fas fa-user-md text-primary mr-2"></i>
                  No es un Diagnóstico
                </h3>
                <p className="text-gray-600">
                  Estas evaluaciones son herramientas de screening, no reemplazan la consulta profesional.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <i className="fas fa-clock text-primary mr-2"></i>
                  Resultados Inmediatos
                </h3>
                <p className="text-gray-600">
                  Recibe tus resultados al instante con recomendaciones personalizadas.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  <i className="fas fa-chart-bar text-primary mr-2"></i>
                  Seguimiento del Progreso
                </h3>
                <p className="text-gray-600">
                  Guarda tus resultados para hacer seguimiento de tu evolución a lo largo del tiempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

