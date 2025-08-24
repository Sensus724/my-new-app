'use client'

import { useState } from 'react'
import Header from '@/components/Header'

export default function DepressionTestPage() {
  const [step, setStep] = useState<'intro' | 'test' | 'results'>('intro')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('')

  const questions = [
    { id: 'q1', q: '¿Te has sentido triste o vacío la mayor parte del tiempo?' },
    { id: 'q2', q: '¿Has perdido interés o placer en actividades que antes disfrutabas?' },
    { id: 'q3', q: '¿Tienes cambios en el apetito o peso sin proponértelo?' },
    { id: 'q4', q: '¿Tienes problemas para dormir o duermes demasiado?' },
    { id: 'q5', q: '¿Te sientes fatigado o con poca energía casi todos los días?' },
    { id: 'q6', q: '¿Te sientes inútil o con culpa excesiva?' }
  ]

  const options = [
    { value: '0', label: 'Nunca' },
    { value: '1', label: 'Varios días' },
    { value: '2', label: 'Más de la mitad de los días' },
    { value: '3', label: 'Casi todos los días' }
  ]

  const handle = (id: string, value: string) => setAnswers((p) => ({ ...p, [id]: value }))

  const calc = () => {
    const total = Object.values(answers).reduce((s, v) => s + parseInt(v), 0)
    setScore(total)
    if (total <= 4) setLevel('Depresión mínima')
    else if (total <= 9) setLevel('Depresión leve')
    else if (total <= 14) setLevel('Depresión moderada')
    else setLevel('Depresión severa')
    setStep('results')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 'intro' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Test de Depresión</h1>
              <p className="text-gray-600 mb-8">Responde 6 preguntas para evaluar la presencia de síntomas depresivos.</p>
              <button onClick={() => setStep('test')} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold">Comenzar</button>
            </div>
          )}

          {step === 'test' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Responde sinceramente</h2>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <div key={q.id} className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{i + 1}. {q.q}</h3>
                    <div className="space-y-2">
                      {options.map((o) => (
                        <label key={o.value} className="flex items-center cursor-pointer">
                          <input type="radio" name={q.id} value={o.value} checked={answers[q.id] === o.value} onChange={(e) => handle(q.id, e.target.value)} className="mr-3" />
                          <span className="text-gray-700">{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
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
              <div className="space-y-4 text-left">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">0-4: Mínima</h4>
                  <p className="text-green-700">Observa tus emociones y mantén hábitos saludables.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">5-9: Leve</h4>
                  <p className="text-yellow-700">Considera apoyo social y actividades placenteras.</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800">10-14: Moderada</h4>
                  <p className="text-orange-700">Evalúa hablar con un profesional de salud mental.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800">15+: Severa</h4>
                  <p className="text-red-700">Busca ayuda profesional. Si hay riesgo, acude a emergencias.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


