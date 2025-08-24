export default function Team() {
  const team = [
    {
      name: 'Daniel Reina',
      role: 'Programador & Ayudante de Psicología',
      image: 'https://via.placeholder.com/300x300',
      description: 'Desarrollador apasionado por la tecnología y el bienestar mental. Apoya a la psicóloga en la creación de herramientas digitales que facilitan el manejo de la ansiedad.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Evelyn Aponte',
      role: 'Programadora & Ayudante de Psicología',
      image: 'https://via.placeholder.com/300x300',
      description: 'Especialista en desarrollo web y entusiasta de la salud mental. Colabora estrechamente con la psicóloga para transformar el conocimiento clínico en soluciones digitales accesibles.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Dayan Gaviria',
      role: 'Programador & Ayudante de Psicología',
      image: 'https://via.placeholder.com/300x300',
      description: 'Apasionado por la programación y el impacto social de la tecnología. Su trabajo se centra en crear experiencias digitales que apoyan la labor terapéutica de la psicóloga Milena Paul.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Milena Paul',
      role: 'Psicóloga Clínica',
      image: 'https://via.placeholder.com/300x300',
      description: 'Psicóloga con amplia experiencia en el tratamiento de la ansiedad y el bienestar emocional. Líder del equipo, integra la ciencia psicológica con la tecnología para ofrecer soluciones efectivas y humanas.',
      social: {
        linkedin: '#'
      }
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un equipo multidisciplinario comprometido con tu bienestar mental y el desarrollo de soluciones innovadoras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-4">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-white hover:text-primary transition-colors">
                        <i className="fab fa-linkedin text-xl"></i>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-white hover:text-primary transition-colors">
                        <i className="fab fa-twitter text-xl"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
