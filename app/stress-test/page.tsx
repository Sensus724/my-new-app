'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Header from '@/components/Header'
import { motion } from 'framer-motion'

export default function StressTestPage() {
  const { data: session } = useSession()
  const [step, setStep] = useState<'intro' | 'test' | 'results'>('intro')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('')

  const questions = [
    { id: 'q1', q: '¿Con qué frecuencia te sientes abrumado por tus responsabilidades?' },
    { id: 'q2', q: '¿Tienes dificultades para relajarte después del trabajo o estudio?' },
    { id: 'q3', q: '¿Con qué frecuencia notas tensión muscular o dolores de cabeza?' },
    { id: 'q4', q: '¿Tu sueño se ve afectado por preocupaciones o tensiones?' },
    { id: 'q5', q: '¿Te irritas con facilidad debido a la presión diaria?' }
  ]

  const options = [
    { value: '0', label: 'Nunca' },
    { value: '1', label: 'A veces' },
    { value: '2', label: 'Frecuentemente' },
    { value: '3', label: 'Casi siempre' }
  ]

  const handle = (id: string, value: string) => setAnswers((p) => ({ ...p, [id]: value }))

  const calc = async () => {
    const total = Object.values(answers).reduce((s, v) => s + parseInt(v), 0)
    setScore(total)
    if (total <= 3) setLevel('Estrés bajo')
    else if (total <= 7) setLevel('Estrés moderado')
    else setLevel('Estrés alto')
    setStep('results')

    // Guardar si hay sesión
    if (session?.user?.id) {
      try {
        const res = await fetch('/api/stress-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: total, answers, level: total <= 3 ? 'Estrés bajo' : total <= 7 ? 'Estrés moderado' : 'Estrés alto' })
        })
        if (res.ok) toast.success('Resultado guardado')
        else toast.error('No se pudo guardar el resultado')
      } catch {
        toast.error('Error de red al guardar')
      }
    } else {
      toast('Inicia sesión para guardar tus resultados')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 'intro' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Evaluación de Estrés</h1>
              <p className="text-gray-600 mb-8">Evalúa tu nivel de estrés con 5 preguntas rápidas.</p>
              <button onClick={() => setStep('test')} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold">Comenzar</button>
            </div>
          )}

          {step === 'test' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Responde sinceramente</h2>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <motion.div key={q.id} className="border-b border-gray-200 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{i + 1}. {q.q}</h3>
                    <div className="space-y-2">
                      {options.map((o) => (
                        <label key={o.value} className="flex items-center cursor-pointer">
                          <input type="radio" name={q.id} value={o.value} checked={answers[q.id] === o.value} onChange={(e) => handle(q.id, e.target.value)} className="mr-3" />
                          <span className="text-gray-700">{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button disabled={Object.keys(answers).length < questions.length} onClick={calc} className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold">Ver resultados</button>
              </div>
            </div>
          )}

          {step === 'results' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Resultados</h2>
              <p className="text-xl text-gray-700 mb-6">Nivel: <span className="text-primary font-semibold">{level}</span> (puntaje {score})</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Bajo</h4>
                  <p className="text-green-700">Mantén tus hábitos saludables y tiempos de descanso.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Moderado</h4>
                  <p className="text-yellow-700">Prueba técnicas de relajación y organiza tus tareas.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800">Alto</h4>
                  <p className="text-red-700">Considera apoyo profesional y reduce cargas cuando sea posible.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


