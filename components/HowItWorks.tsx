export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: 'fas fa-user-plus',
      title: 'Regístrate',
      description: 'Crea tu cuenta en minutos y comienza tu viaje hacia el bienestar mental.'
    },
    {
      number: 2,
      icon: 'fas fa-clipboard-list',
      title: 'Evalúa tu Estado',
      description: 'Completa una breve evaluación para personalizar tu experiencia.'
    },
    {
      number: 3,
      icon: 'fas fa-tools',
      title: 'Accede a las Herramientas',
      description: 'Utiliza nuestras herramientas personalizadas para tu bienestar.'
    },
    {
      number: 4,
      icon: 'fas fa-chart-line',
      title: 'Sigue tu Progreso',
      description: 'Monitorea tu evolución y celebra tus logros.'
    }
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cómo Funciona Sensus
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un proceso simple y efectivo para tu bienestar mental
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 text-center h-full transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${step.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-blue-400"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
