'use client'

import { useState, useEffect } from 'react'

export default function AnxietyChart() {
  const [chartData, setChartData] = useState<number[]>([])

  useEffect(() => {
    // Simular datos del gráfico
    setChartData([15, 18, 12, 20, 16, 14, 19, 17, 13, 15, 11, 18])
  }, [])

  const getAnxietyLevel = (value: number) => {
    if (value <= 17) return { level: 'Leve', color: 'bg-green-500' }
    if (value <= 24) return { level: 'Moderada', color: 'bg-yellow-500' }
    if (value <= 30) return { level: 'Alta', color: 'bg-orange-500' }
    return { level: 'Grave', color: 'bg-red-500' }
  }

  const maxValue = Math.max(...chartData, 30)
  const minValue = Math.min(...chartData, 0)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Evolución de la Ansiedad
      </h2>
      
      <div className="space-y-4">
        {/* Gráfico de barras */}
        <div className="flex items-end justify-between h-48 space-x-2">
          {chartData.map((value, index) => {
            const height = ((value - minValue) / (maxValue - minValue)) * 100
            const anxietyInfo = getAnxietyLevel(value)
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative">
                  <div
                    className={`${anxietyInfo.color} rounded-t w-full transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                    {value}
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">
                  {index + 1}
                </span>
              </div>
            )
          })}
        </div>
        
        {/* Leyenda */}
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Leve (≤17)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Moderada (18-24)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Alta (25-30)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
                         <span>Grave (&gt;30)</span>
          </div>
        </div>
        
        {/* Resumen */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Resumen</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Promedio:</span>
              <span className="ml-2 font-medium">
                {Math.round(chartData.reduce((a, b) => a + b, 0) / chartData.length)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Tendencia:</span>
              <span className="ml-2 font-medium text-green-600">
                <i className="fas fa-arrow-down mr-1"></i>
                Mejorando
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
