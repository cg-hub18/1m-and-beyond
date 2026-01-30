import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Badge({ children, variant = 'default' }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const badgeRef = useRef(null)

  const variants = {
    high: 'bg-green-100 text-green-700 border border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    low: 'bg-gray-100 text-gray-600 border border-gray-200',
    default: 'bg-gray-200 text-gray-700',
  }

  const confidenceData = {
    high: { score: 65, label: 'High' },
    medium: { score: 45, label: 'Medium' },
    low: { score: 25, label: 'Low' },
  }

  const confidence = confidenceData[variant] || confidenceData.high

  useEffect(() => {
    if (showTooltip && badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect()
      setTooltipPosition({
        top: rect.bottom + 8,
        left: rect.left,
      })
    }
  }, [showTooltip])

  return (
    <div className="relative inline-block">
      <span 
        ref={badgeRef}
        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full cursor-default ${variants[variant]}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>

      {showTooltip && createPortal(
        <div 
          className="fixed w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 animate-fade-in"
          style={{ 
            top: tooltipPosition.top, 
            left: tooltipPosition.left,
            zIndex: 9999 
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Arrow */}
          <div className="absolute left-4 -top-2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45" />
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-lg font-semibold text-gray-900">Opsmate Confidence</h4>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant]}`}>
              {confidence.label}
            </span>
          </div>

          {/* Score */}
          <div className="text-4xl font-bold text-gray-900 mb-3">
            {confidence.score}%
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            Opsmate's confidence score shows how strongly the root cause matches operational criteria.
          </p>

          {/* Slider */}
          <div className="relative">
            <div className="h-2 rounded-full bg-gradient-to-r from-red-500 to-green-500" />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-5 bg-white rounded-sm border border-gray-300 shadow-sm"
              style={{ left: `${confidence.score}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

