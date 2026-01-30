import { useState } from 'react'
import { Pencil } from 'lucide-react'
import ChartEditModal from './ChartEditModal'

// Reusable Alert Chart SVG component
function AlertChartSVG({ chartHeight = 180, chartWidth = 600, extended = false, fullWidth = false }) {
  const baseDataPoints = [
    { time: '07:00', value: 45 },
    { time: '08:00', value: 48 },
    { time: '09:00', value: 52 },
    { time: '10:00', value: 55 },
    { time: '11:00', value: 58 },
    { time: '16:00', value: 32 },
  ]

  // Extended data points for modal view
  const extendedDataPoints = [
    { time: '06:00', value: 42 },
    { time: '07:00', value: 45 },
    { time: '08:00', value: 48 },
    { time: '09:00', value: 52 },
    { time: '09:30', value: 54 },
    { time: '10:00', value: 55 },
    { time: '10:30', value: 57 },
    { time: '11:00', value: 58 },
    { time: '12:00', value: 62 },
    { time: '13:00', value: 68 },
    { time: '14:00', value: 55 },
    { time: '15:00', value: 42 },
    { time: '16:00', value: 32 },
  ]

  const dataPoints = extended ? extendedDataPoints : baseDataPoints

  const maxValue = 100

  const getPath = () => {
    const points = dataPoints.map((point, index) => {
      const x = (index / (dataPoints.length - 1)) * chartWidth
      const y = chartHeight - (point.value / maxValue) * chartHeight
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    return points.join(' ')
  }

  const getAreaPath = () => {
    const linePath = getPath()
    return `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`
  }

  return (
    <svg 
      viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} 
      className="w-full"
      style={fullWidth ? { height: '200px' } : { height: 'auto' }}
      preserveAspectRatio={fullWidth ? "none" : "xMidYMid meet"}
    >
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((value) => {
        const y = chartHeight - (value / maxValue) * chartHeight
        return (
          <g key={value}>
            <line
              x1="0"
              y1={y}
              x2={chartWidth}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text x="-5" y={y + 4} textAnchor="end" className="text-xs fill-gray-400">
              {value}
            </text>
          </g>
        )
      })}

      {/* Threshold line at 75 */}
      <line
        x1="0"
        y1={chartHeight - (75 / maxValue) * chartHeight}
        x2={chartWidth}
        y2={chartHeight - (75 / maxValue) * chartHeight}
        stroke="#f97316"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Violation zone */}
      <rect
        x={(4 / 5) * chartWidth}
        y="0"
        width={chartWidth - (4 / 5) * chartWidth}
        height={chartHeight - (75 / maxValue) * chartHeight}
        fill="#fee2e2"
        opacity="0.5"
      />

      {/* Incident marker line */}
      <line
        x1={(3 / 5) * chartWidth}
        y1="0"
        x2={(3 / 5) * chartWidth}
        y2={chartHeight}
        stroke="#9ca3af"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Area fill */}
      <path
        d={getAreaPath()}
        fill="url(#alertAreaGradient)"
        opacity="0.3"
      />

      {/* Line */}
      <path
        d={getPath()}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {/* Data points */}
      {dataPoints.map((point, index) => {
        const x = (index / (dataPoints.length - 1)) * chartWidth
        const y = chartHeight - (point.value / maxValue) * chartHeight
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="3"
            fill="#3b82f6"
          />
        )
      })}

      {/* X-axis labels */}
      {dataPoints.map((point, index) => {
        const x = (index / (dataPoints.length - 1)) * chartWidth
        return (
          <text
            key={index}
            x={x}
            y={chartHeight + 20}
            textAnchor="middle"
            className="text-xs fill-gray-400"
          >
            {point.time}
          </text>
        )
      })}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="alertAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function AlertContent({ content }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Title */}
      <h4 className="text-base font-semibold text-gray-900">{content.title}</h4>
      
      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">{content.description}</p>

      {/* Chart */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg relative">
        {/* Edit Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute top-3 right-3 p-1.5 bg-white hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <AlertChartSVG />
      </div>

      {/* Edit Modal */}
      <ChartEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={content.title}
      >
        <AlertChartSVG extended fullWidth />
      </ChartEditModal>
    </div>
  )
}



