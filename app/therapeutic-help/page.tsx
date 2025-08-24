import Header from '@/components/Header'

export default function TherapeuticHelpPage() {
  const techniques = [
    {
      title: 'Respiración Diafragmática',
      description: 'Técnica de respiración profunda para reducir la ansiedad y el estrés.',
      steps: [
        'Siéntate en una posición cómoda',
        'Coloca una mano en tu pecho y otra en tu abdomen',
        'Inhala lentamente por la nariz, sintiendo que tu abdomen se expande',
        'Exhala lentamente por la boca',
        'Repite durante 5-10 minutos'
      ],
      icon: 'fas fa-wind',
      color: 'bg-blue-500'
    },
    {
      title: 'Relajación Muscular Progresiva',
      description: 'Técnica que consiste en tensar y relajar grupos musculares específicos.',
      steps: [
        'Comienza con los músculos de los pies',
        'Tensa los músculos durante 5 segundos',
        'Relaja completamente durante 10 segundos',
        'Sube gradualmente por todo el cuerpo',
        'Termina con los músculos faciales'
      ],
      icon: 'fas fa-spa',
      color: 'bg-green-500'
    },
    {
      title: 'Mindfulness y Meditación',
      description: 'Práctica de atención plena para estar presente en el momento.',
      steps: [
        'Encuentra un lugar tranquilo',
        'Siéntate en una posición cómoda',
        'Cierra los ojos y respira normalmente',
        'Enfócate en tu respiración',
        'Cuando tu mente divague, regresa suavemente a la respiración'
      ],
      icon: 'fas fa-om',
      color: 'bg-purple-500'
    },
    {
      title: 'Terapia Cognitivo-Conductual',
      description: 'Técnica para identificar y cambiar patrones de pensamiento negativos.',
      steps: [
        'Identifica pensamientos automáticos negativos',
        'Cuestiona la evidencia de estos pensamientos',
        'Busca perspectivas alternativas',
        'Desarrolla pensamientos más equilibrados',
        'Practica regularmente'
      ],
      icon: 'fas fa-brain',
      color: 'bg-orange-500'
    }
  ]

  const resources = [
    {
      title: 'Líneas de Ayuda',
      description: 'Números de emergencia y apoyo emocional.',
      items: [
        'Crisis Text Line: Envía "AYUDA" al 741741',
        'Línea Nacional de Prevención del Suicidio: 988',
        'Crisis de Ansiedad: 1-800-273-8255'
      ],
      icon: 'fas fa-phone-alt',
      color: 'bg-red-500'
    },
    {
      title: 'Recursos en Línea',
      description: 'Plataformas y aplicaciones de apoyo.',
      items: [
        'Headspace: Meditación y mindfulness',
        'Calm: Ejercicios de relajación',
        'BetterHelp: Terapia en línea',
        'Talkspace: Consultas psicológicas'
      ],
      icon: 'fas fa-laptop',
      color: 'bg-indigo-500'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ayuda Terapéutica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Técnicas y recursos profesionales para el manejo de la ansiedad y el bienestar mental.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Técnicas de Relajación
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {techniques.map((technique, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-center mb-6">
                    <div className={`${technique.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                      <i className={`${technique.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{technique.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{technique.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Pasos a seguir:</h4>
                    <ol className="space-y-2">
                      {technique.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recursos de Apoyo
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-center mb-6">
                    <div className={`${resource.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                      <i className={`${resource.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  
                  <ul className="space-y-3">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <i className="fas fa-check text-green-500 mr-3"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Necesitas Ayuda Profesional?
            </h3>
            <p className="text-gray-600 mb-6">
              Si estás experimentando síntomas severos o persistentes, es importante buscar ayuda profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contactar Especialista
              </a>
              <a 
                href="/dashboard"
                className="bg-white hover:bg-gray-50 text-primary border border-primary px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Ir al Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

