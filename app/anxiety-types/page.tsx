import Header from '@/components/Header'

export default function AnxietyTypesPage() {
  const anxietyTypes = [
    {
      title: 'Trastorno de Ansiedad Generalizada (TAG)',
      description: 'Preocupación excesiva y persistente sobre diversos aspectos de la vida diaria.',
      symptoms: ['Preocupación constante', 'Dificultad para concentrarse', 'Irritabilidad', 'Fatiga'],
      icon: 'fas fa-brain'
    },
    {
      title: 'Trastorno de Pánico',
      description: 'Ataques de pánico inesperados y recurrentes.',
      symptoms: ['Palpitaciones', 'Sudoración', 'Temblores', 'Sensación de ahogo'],
      icon: 'fas fa-heartbeat'
    },
    {
      title: 'Fobia Social',
      description: 'Miedo intenso a situaciones sociales y ser juzgado por otros.',
      symptoms: ['Miedo a hablar en público', 'Evitar situaciones sociales', 'Rubor', 'Temblores'],
      icon: 'fas fa-users'
    },
    {
      title: 'Trastorno Obsesivo-Compulsivo (TOC)',
      description: 'Pensamientos obsesivos y comportamientos compulsivos.',
      symptoms: ['Pensamientos repetitivos', 'Comportamientos rituales', 'Ansiedad si no se realizan'],
      icon: 'fas fa-redo'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tipos de Ansiedad
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce los diferentes tipos de ansiedad y sus características para mejor comprensión y manejo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anxietyTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mr-4">
                    <i className={`${type.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{type.description}</p>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Síntomas comunes:</h4>
                  <ul className="space-y-2">
                    {type.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <i className="fas fa-check text-green-500 mr-3"></i>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-primary/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                ¿Te identificas con alguno de estos tipos?
              </h3>
              <p className="text-gray-600 mb-6">
                Es importante recordar que solo un profesional de la salud mental puede hacer un diagnóstico oficial.
              </p>
              <a 
                href="/hamilton-test"
                className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Realizar Evaluación
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

