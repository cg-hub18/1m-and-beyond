import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function RootCauseContent({ content }) {
  const [showDetails, setShowDetails] = useState(false)

  // Parse and render text with SEV links
  const renderTextWithLinks = (text) => {
    const sevPattern = /(SEV\s*)(S\d+)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = sevPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      // Add the "SEV " text
      parts.push(match[1])
      // Add the linked SEV ID
      parts.push(
        <a 
          key={match.index}
          href="#" 
          className="text-blue-600 hover:text-blue-700 hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          {match[2]}
        </a>
      )
      lastIndex = match.index + match[0].length
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700 leading-relaxed">
        {renderTextWithLinks(content.summary)}
      </p>

      {content.hasDetailedAnalysis && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">Detailed Analysis</span>
          {showDetails ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </button>
      )}

      {showDetails && (
        <div className="p-4 bg-gray-50 rounded-lg animate-fade-in space-y-5">
          {/* Timeline */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900 mb-2">Incident Timeline</h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              The upstream dependency failure began at <span className="font-medium">09:42 UTC</span> when the authorization service started experiencing elevated latency. By <span className="font-medium">09:48 UTC</span>, error rates exceeded the 5% threshold, triggering the initial alert. The cascading failure reached SEVManager at <span className="font-medium">09:52 UTC</span>, causing widespread permission check failures.
            </p>
          </div>

          {/* Impact Graph */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900 mb-3">Error Rate Over Time</h5>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <svg viewBox="0 0 600 200" className="w-full h-auto">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((value) => {
                  const y = 160 - (value / 100) * 140
                  return (
                    <g key={value}>
                      <line x1="40" y1={y} x2="580" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                      <text x="35" y={y + 4} textAnchor="end" className="text-xs" fill="#9ca3af">{value}%</text>
                    </g>
                  )
                })}

                {/* Threshold line */}
                <line x1="40" y1={160 - (5 / 100) * 140} x2="580" y2={160 - (5 / 100) * 140} stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                <text x="585" y={160 - (5 / 100) * 140 + 4} className="text-xs" fill="#f97316">5% threshold</text>

                {/* Incident marker */}
                <line x1="280" y1="20" x2="280" y2="160" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                <text x="280" y="15" textAnchor="middle" className="text-xs" fill="#ef4444">09:48 - Incident Start</text>

                {/* Error rate line - before incident */}
                <path
                  d="M 40 153 L 100 152 L 160 153 L 220 151 L 280 140"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Error rate line - during incident */}
                <path
                  d="M 280 140 L 320 80 L 360 45 L 400 35 L 440 38 L 480 42 L 520 85 L 560 120 L 580 145"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />

                {/* Area fill for incident */}
                <path
                  d="M 280 140 L 320 80 L 360 45 L 400 35 L 440 38 L 480 42 L 520 85 L 560 120 L 580 145 L 580 160 L 280 160 Z"
                  fill="url(#errorGradient)"
                  opacity="0.3"
                />

                {/* X-axis labels */}
                {['09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30'].map((time, i) => (
                  <text key={time} x={40 + i * 90} y="180" textAnchor="middle" className="text-xs" fill="#9ca3af">{time}</text>
                ))}

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="errorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900 mb-2">Key Findings</h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-blue-500 mt-1">•</span>
                <span>Database connection pool exhaustion was the primary trigger, with connections dropping from 500 to 12 available.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-blue-500 mt-1">•</span>
                <span>Retry storms amplified the issue, with request volume increasing 340% during the incident window.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-blue-500 mt-1">•</span>
                <span>Circuit breakers failed to trip due to misconfigured thresholds in the authorization service.</span>
              </li>
            </ul>
          </div>

          {/* Affected Services */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900 mb-2">Affected Services</h5>
            <div className="flex flex-wrap gap-2">
              {['authorization_service', 'sevmanager', 'user_permissions', 'api_gateway', 'session_manager'].map((service) => (
                <span key={service} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-mono text-gray-600">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

