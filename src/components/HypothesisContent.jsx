import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowDown, Database, Check } from 'lucide-react'

function MiniSparkline({ data, status }) {
  const width = 120
  const height = 32
  const padding = 2

  if (!data || data.length < 2) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + (1 - (val - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const strokeColor = status === 'critical' ? '#ef4444' : status === 'recovering' ? '#22c55e' : '#3b82f6'

  return (
    <svg width={width} height={height} className="block">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(' ')}
      />
    </svg>
  )
}

function SourceBadge({ source }) {
  const [isHovered, setIsHovered] = useState(false)
  const [popoverPos, setPopoverPos] = useState('above')
  const badgeRef = useRef(null)

  const colorMap = {
    green: 'bg-emerald-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-amber-500',
    purple: 'bg-purple-500',
  }

  useEffect(() => {
    if (isHovered && badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect()
      setPopoverPos(rect.top < 160 ? 'below' : 'above')
    }
  }, [isHovered])

  const statusColor = source.preview?.status === 'critical'
    ? 'text-red-600 bg-red-50'
    : source.preview?.status === 'recovering'
      ? 'text-emerald-600 bg-emerald-50'
      : 'text-blue-600 bg-blue-50'

  return (
    <span
      ref={badgeRef}
      className="relative inline-flex ml-1 align-super"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`w-4 h-4 rounded-full ${colorMap[source.color] || 'bg-gray-400'} cursor-pointer flex items-center justify-center text-[9px] font-bold text-white transition-transform hover:scale-110`}
      >
        {source.id}
      </span>

      {isHovered && source.preview && (
        <div className={`absolute z-50 left-1/2 -translate-x-1/2 ${popoverPos === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-52 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-900">{source.preview.title}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${statusColor}`}>
                {source.preview.delta}
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1.5">{source.preview.value}</div>
            <MiniSparkline data={source.preview.sparkline} status={source.preview.status} />
            <div className="mt-1.5 text-[10px] text-gray-400 font-mono truncate">{source.label}</div>
          </div>
        </div>
      )}
    </span>
  )
}

export default function HypothesisContent({ content, onScrollToSection }) {
  const [checkedSteps, setCheckedSteps] = useState(
    () => new Set(content.nextSteps?.filter(s => s.completed).map(s => s.id) || [])
  )

  const toggleStep = (id) => {
    setCheckedSteps(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const renderCitations = (text) => {
    const parts = []
    let lastIndex = 0
    const citationPattern = /\[(\d+)\]/g
    let match

    while ((match = citationPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(
        <span
          key={match.index}
          className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-full align-super ml-0.5 cursor-default"
        >
          {match[1]}
        </span>
      )
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  return (
    <div className="space-y-6">
      {/* What Happened */}
      {content.whatHappened && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">What Happened</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{content.whatHappened}</p>
        </div>
      )}

      {/* Key Findings */}
      {content.keyFindings && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">Key Findings</h4>

          {/* Bullet Items */}
          <ul className="space-y-2.5 mb-4">
            {content.keyFindings.items?.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                <span className="flex-1">
                  {item.text}
                  {item.linkedSectionId && onScrollToSection && (
                    <button
                      onClick={() => onScrollToSection(item.linkedSectionId)}
                      className="inline-flex items-center gap-0.5 ml-1.5 px-2 py-0.5 text-[11px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors align-middle"
                    >
                      {item.linkedLabel || 'View'}
                      <ArrowDown className="w-2.5 h-2.5" />
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* Related Alert — hidden for now
          {content.keyFindings.relatedAlert && (
            <div className="mb-4">
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Related Alert</h5>
              <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {content.keyFindings.relatedAlert.name}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-50 rounded">
                      <span className="w-2 h-2 bg-red-500 rounded-sm" />
                    </span>
                    <span>Started {content.keyFindings.relatedAlert.startedAt}</span>
                    <span className="text-gray-300">•</span>
                    <span className="font-medium text-gray-600">{content.keyFindings.relatedAlert.channel}</span>
                    <span className="text-gray-300">•</span>
                    <span className="font-mono text-gray-500">{content.keyFindings.relatedAlert.alertKey}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 bg-white">
                  <span className="text-xs text-gray-500">
                    Surfaced {content.keyFindings.relatedAlert.surfacedAgo} • {content.keyFindings.relatedAlert.relatedCount} related alert{content.keyFindings.relatedAlert.relatedCount !== 1 ? 's' : ''}
                  </span>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Full Escalation
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
          */}

          {/* Related Scuba Datasets — hidden for now
          {content.keyFindings.relatedDatasets && content.keyFindings.relatedDatasets.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Related Datasets</h5>
              <div className="space-y-2">
                {content.keyFindings.relatedDatasets.map((ds, index) => (
                  <div key={index} className="flex items-start gap-2.5 px-3 py-2 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-colors">
                    <Database className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline font-mono"
                      >
                        {ds.name}
                      </a>
                      <p className="text-xs text-gray-500 mt-0.5">{ds.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          */}
        </div>
      )}

      {/* Root Cause */}
      {content.rootCause && (
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <h4 className="text-sm font-bold text-gray-900">Root Cause Analysis</h4>
            
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {content.rootCause.description.replace(/\[\d+\]/g, '')}
          </p>
        </div>
      )}

      {/* Next Steps */}
      {content.nextSteps && content.nextSteps.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">Next Steps</h4>
          <div className="space-y-2">
            {content.nextSteps.map((step) => (
              <label
                key={step.id}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    checkedSteps.has(step.id)
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                >
                  {checkedSteps.has(step.id) && <Check className="w-3 h-3" />}
                </button>
                <span className={`text-sm leading-relaxed transition-colors ${
                  checkedSteps.has(step.id) ? 'text-gray-400 line-through' : 'text-gray-700'
                }`}>
                  {step.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
