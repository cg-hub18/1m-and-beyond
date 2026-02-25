export default function RootCauseContent({ content }) {
  const renderBoldText = (text) => {
    const parts = []
    let lastIndex = 0
    const boldPattern = /\*\*(.+?)\*\*/g
    let match

    while ((match = boldPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(
        <span key={match.index} className="font-semibold">{match[1]}</span>
      )
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  return (
    <div className="space-y-5">
      {content.timelineDescription && (
        <div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {renderBoldText(content.timelineDescription)}
          </p>
        </div>
      )}

      {/* Error Rate Chart */}
      <div>
        <h5 className="text-sm font-semibold text-gray-900 mb-3">Error Rate Over Time</h5>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <svg viewBox="0 0 600 200" className="w-full h-auto">
            {[0, 25, 50, 75, 100].map((value) => {
              const y = 160 - (value / 100) * 140
              return (
                <g key={value}>
                  <line x1="40" y1={y} x2="580" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                  <text x="35" y={y + 4} textAnchor="end" className="text-xs" fill="#9ca3af">{value}%</text>
                </g>
              )
            })}

            <line x1="40" y1={160 - (5 / 100) * 140} x2="580" y2={160 - (5 / 100) * 140} stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
            <text x="585" y={160 - (5 / 100) * 140 + 4} className="text-xs" fill="#f97316">5%</text>

            <path d="M 40 153 L 100 152 L 160 153 L 220 151 L 280 140" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <path d="M 280 140 L 320 80 L 360 45 L 400 35 L 440 38 L 480 42 L 520 85 L 560 120 L 580 145" fill="none" stroke="#ef4444" strokeWidth="2" />
            <path d="M 280 140 L 320 80 L 360 45 L 400 35 L 440 38 L 480 42 L 520 85 L 560 120 L 580 145 L 580 160 L 280 160 Z" fill="url(#errorGradient)" opacity="0.3" />

            {['09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30'].map((time, i) => (
              <text key={time} x={40 + i * 90} y="180" textAnchor="middle" className="text-xs" fill="#9ca3af">{time}</text>
            ))}

            <defs>
              <linearGradient id="errorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Service Latency Chart */}
      <div>
        <h5 className="text-sm font-semibold text-gray-900 mb-3">Service Latency (p99)</h5>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <svg viewBox="0 0 600 210" className="w-full h-auto">
            {[0, 200, 400, 600, 800].map((value) => {
              const y = 160 - (value / 800) * 140
              return (
                <g key={`lat-${value}`}>
                  <line x1="45" y1={y} x2="580" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                  <text x="40" y={y + 4} textAnchor="end" className="text-xs" fill="#9ca3af">{value}ms</text>
                </g>
              )
            })}

            <line x1="45" y1={160 - (150 / 800) * 140} x2="580" y2={160 - (150 / 800) * 140} stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
            <text x="585" y={160 - (150 / 800) * 140 + 4} className="text-xs" fill="#f97316">15</text>

            <path d="M 55 142 L 115 143 L 175 141 L 235 140 L 280 100 L 320 45 L 360 30 L 400 35 L 440 55 L 480 80 L 520 110 L 560 135 L 580 140" fill="none" stroke="#8b5cf6" strokeWidth="2" />
            <path d="M 55 148 L 115 147 L 175 149 L 235 148 L 280 125 L 320 75 L 360 55 L 400 60 L 440 78 L 480 100 L 520 125 L 560 142 L 580 147" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 3" />
            <path d="M 55 150 L 115 151 L 175 150 L 235 149 L 280 135 L 320 95 L 360 70 L 400 72 L 440 90 L 480 115 L 520 135 L 560 148 L 580 150" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />

            {['09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30'].map((time, i) => (
              <text key={`lt-${time}`} x={55 + i * 87.5} y="180" textAnchor="middle" className="text-xs" fill="#9ca3af">{time}</text>
            ))}

            <line x1="55" y1="198" x2="75" y2="198" stroke="#8b5cf6" strokeWidth="2" />
            <text x="80" y="201" className="text-xs" fill="#6b7280">auth_service</text>
            <line x1="185" y1="198" x2="205" y2="198" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="210" y="201" className="text-xs" fill="#6b7280">api_gateway</text>
            <line x1="305" y1="198" x2="325" y2="198" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="330" y="201" className="text-xs" fill="#6b7280">sevmanager</text>
          </svg>
        </div>
      </div>

      {/* Request Volume Chart */}
      <div>
        <h5 className="text-sm font-semibold text-gray-900 mb-3">Request Volume</h5>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <svg viewBox="0 0 600 200" className="w-full h-auto">
            {[0, 2, 4, 6, 8].map((value) => {
              const y = 160 - (value / 8) * 140
              return (
                <g key={`rv-${value}`}>
                  <line x1="45" y1={y} x2="580" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                  <text x="40" y={y + 4} textAnchor="end" className="text-xs" fill="#9ca3af">{value}k</text>
                </g>
              )
            })}

            {[
              { x: 65, h: 2.1 }, { x: 105, h: 2.0 }, { x: 145, h: 2.2 },
              { x: 185, h: 2.1 }, { x: 225, h: 2.3 }, { x: 255, h: 2.4 },
            ].map((bar, i) => {
              const barH = (bar.h / 8) * 140
              return (
                <rect key={`nb-${i}`} x={bar.x} y={160 - barH} width="30" height={barH} rx="2" fill="#3b82f6" opacity="0.7" />
              )
            })}

            {[
              { x: 295, h: 5.8 }, { x: 335, h: 7.2 }, { x: 375, h: 7.8 },
              { x: 415, h: 6.5 }, { x: 455, h: 4.8 }, { x: 495, h: 3.2 },
              { x: 535, h: 2.5 },
            ].map((bar, i) => {
              const barH = (bar.h / 8) * 140
              return (
                <rect key={`sb-${i}`} x={bar.x} y={160 - barH} width="30" height={barH} rx="2" fill="#ef4444" opacity="0.7" />
              )
            })}

            {['09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30'].map((time, i) => (
              <text key={`rv-t-${time}`} x={55 + i * 87.5} y="180" textAnchor="middle" className="text-xs" fill="#9ca3af">{time}</text>
            ))}

          </svg>
        </div>
      </div>
    </div>
  )
}
