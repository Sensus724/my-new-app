'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'

export default function HamiltonTestPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro')
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [score, setScore] = useState(0)
  const [result, setResult] = useState('')

  const questions = [
    {
      id: 'q1',
      question: '¿Se siente tenso o nervioso?',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Leve' },
        { value: '2', label: 'Moderado' },
        { value: '3', label: 'Severo' },
        { value: '4', label: 'Muy severo' }
      ]
    },
    {
      id: 'q2',
      question: '¿Se siente temeroso como si algo terrible fuera a suceder?',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Leve' },
        { value: '2', label: 'Moderado' },
        { value: '3', label: 'Severo' },
        { value: '4', label: 'Muy severo' }
      ]
    },
    {
      id: 'q3',
      question: '¿Se preocupa por cosas que realmente no deberían preocuparle?',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Leve' },
        { value: '2', label: 'Moderado' },
        { value: '3', label: 'Severo' },
        { value: '4', label: 'Muy severo' }
      ]
    },
    {
      id: 'q4',
      question: '¿Tiene dificultad para relajarse?',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Leve' },
        { value: '2', label: 'Moderado' },
        { value: '3', label: 'Severo' },
        { value: '4', label: 'Muy severo' }
      ]
    },
    {
      id: 'q5',
      question: '¿Se siente tan inquieto que no puede quedarse quieto?',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Leve' },
        { value: '2', label: 'Moderado' },
        { value: '3', label: 'Severo' },
        { value: '4', label: 'Muy severo' }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0)
    setScore(total)
    
    if (total <= 7) {
      setResult('Ansiedad mínima')
    } else if (total <= 14) {
      setResult('Ansiedad leve')
    } else if (total <= 21) {
      setResult('Ansiedad moderada')
    } else {
      setResult('Ansiedad severa')
    }
    
    setCurrentStep('results')
  }

  const startTest = () => {
    setCurrentStep('test')
  }

  const retakeTest = () => {
    setAnswers({})
    setScore(0)
    setResult('')
    setCurrentStep('intro')
  }

  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Test de Hamilton para Ansiedad
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Este test te ayudará a evaluar tu nivel de ansiedad actual. 
                Es una herramienta de screening basada en criterios clínicos profesionales.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                  Información Importante
                </h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• El test consta de 5 preguntas</li>
                  <li>• Duración aproximada: 5-10 minutos</li>
                  <li>• Tus respuestas son completamente privadas</li>
                  <li>• Este test no reemplaza la consulta profesional</li>
                </ul>
              </div>
              
              <button
                onClick={startTest}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Comenzar Test
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'test') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Test de Hamilton
                </h1>
                <p className="text-gray-600">
                  Responde cada pregunta según cómo te has sentido en la última semana.
                </p>
              </div>
              
              <div className="space-y-8">
                {questions.map((q, index) => (
                  <motion.div key={q.id} className="border-b border-gray-200 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {index + 1}. {q.question}
                    </h3>
                    <div className="space-y-3">
                      {q.options.map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={q.id}
                            value={option.value}
                            checked={answers[q.id] === option.value}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={calculateScore}
                  disabled={Object.keys(answers).length < questions.length}
                  className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Ver Resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Resultados del Test
              </h1>
              
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Tu Puntuación: {score}
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Resultado: <span className="font-semibold text-primary">{result}</span>
                </p>
              </div>
              
              <div className="text-left mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Interpretación:
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">0-7 puntos: Ansiedad mínima</h4>
                    <p className="text-green-700">Tu nivel de ansiedad está dentro del rango normal.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">8-14 puntos: Ansiedad leve</h4>
                    <p className="text-yellow-700">Experimentas algunos síntomas de ansiedad leves.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">15-21 puntos: Ansiedad moderada</h4>
                    <p className="text-orange-700">Tienes síntomas de ansiedad que pueden afectar tu vida diaria.</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">22+ puntos: Ansiedad severa</h4>
                    <p className="text-red-700">Es recomendable buscar ayuda profesional.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={retakeTest}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Repetir Test
                </button>
                <a
                  href="/dashboard"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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

  return null
}
