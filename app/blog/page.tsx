import Header from '@/components/Header'
// import { motion } from 'framer-motion'

export default function BlogPage() {
  const posts = [
    {
      title: 'Técnicas efectivas para manejar la ansiedad diaria',
      excerpt: 'Respiración diafragmática, mindfulness y hábitos que pueden ayudarte a reducir la ansiedad en tu día a día.',
      date: '2025-06-15',
      category: 'Ansiedad',
      readTime: '6 min'
    },
    {
      title: 'Cómo mejorar tu higiene del sueño',
      excerpt: 'Una buena rutina de sueño es clave para tu bienestar mental. Te contamos cómo empezar.',
      date: '2025-06-10',
      category: 'Bienestar',
      readTime: '5 min'
    },
    {
      title: 'Ejercicios de respiración guiada: una guía rápida',
      excerpt: 'Aprende a realizar ejercicios de respiración que puedes usar en momentos de estrés.',
      date: '2025-06-05',
      category: 'Respiración',
      readTime: '4 min'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Consejos, técnicas y artículos para mejorar tu bienestar mental.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
                             <article
                 key={idx}
                 className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
               >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                 <div className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('es-ES')}</div>
               </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


