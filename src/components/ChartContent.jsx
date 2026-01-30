import { useState } from 'react'
import { ExternalLink, Pencil } from 'lucide-react'
import ChartEditModal from './ChartEditModal'

// Reusable Canvas Chart SVG component
function CanvasChartSVG({ chartHeight = 160, chartWidth = 560, extended = false, fullWidth = false }) {
  const baseDataPoints = [
    { time: '00:00', value: 42 },
    { time: '04:00', value: 38 },
    { time: '08:00', value: 55 },
    { time: '12:00', value: 72 },
    { time: '16:00', value: 68 },
    { time: '20:00', value: 85 },
    { time: '24:00', value: 62 },
  ]

  // Extended data points for modal view
  const extendedDataPoints = [
    { time: '00:00', value: 42 },
    { time: '02:00', value: 40 },
    { time: '04:00', value: 38 },
    { time: '06:00', value: 45 },
    { time: '08:00', value: 55 },
    { time: '10:00', value: 65 },
    { time: '12:00', value: 72 },
    { time: '14:00', value: 70 },
    { time: '16:00', value: 68 },
    { time: '18:00', value: 78 },
    { time: '20:00', value: 85 },
    { time: '22:00', value: 75 },
    { time: '24:00', value: 62 },
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
      viewBox={`0 0 ${chartWidth} ${chartHeight + 35}`} 
      className="w-full"
      style={fullWidth ? { height: '200px' } : { height: 'auto' }}
      preserveAspectRatio={fullWidth ? "none" : "xMidYMid meet"}
    >
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((value) => {
        const y = chartHeight - (value / maxValue) * chartHeight
        return (
          <line
            key={value}
            x1="0"
            y1={y}
            x2={chartWidth}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        )
      })}

      {/* Target/threshold line */}
      <line
        x1="0"
        y1={chartHeight - (70 / maxValue) * chartHeight}
        x2={chartWidth}
        y2={chartHeight - (70 / maxValue) * chartHeight}
        stroke="#10b981"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* Area fill */}
      <path
        d={getAreaPath()}
        fill="url(#canvasChartGradient)"
        opacity="0.4"
      />

      {/* Line */}
      <path
        d={getPath()}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((point, index) => {
        const x = (index / (dataPoints.length - 1)) * chartWidth
        const y = chartHeight - (point.value / maxValue) * chartHeight
        return (
          <g key={index}>
            <circle
              cx={x}
              cy={y}
              r="5"
              fill="white"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
          </g>
        )
      })}

      {/* X-axis labels */}
      {dataPoints.map((point, index) => {
        const x = (index / (dataPoints.length - 1)) * chartWidth
        return (
          <text
            key={index}
            x={x}
            y={chartHeight + 22}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {point.time}
          </text>
        )
      })}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="canvasChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function ChartContent({ content }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Chart Visualization */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 relative">
        {/* Edit Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute top-3 right-3 p-1.5 bg-white hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <CanvasChartSVG />
      </div>

      {/* Chart Link */}
      {content.url && (
        <a 
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          View original chart
        </a>
      )}

      {/* Description */}
      {content.description && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {content.description}
        </p>
      )}

      {/* Edit Modal */}
      <ChartEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Canvas Chart"
      >
        <CanvasChartSVG extended fullWidth />
      </ChartEditModal>
    </div>
  )
}

