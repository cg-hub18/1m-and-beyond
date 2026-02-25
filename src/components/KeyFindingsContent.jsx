import { ArrowDown } from 'lucide-react'

export default function KeyFindingsContent({ content, onScrollToSection }) {
  return (
    <div>
      {content.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-6">{content.description}</p>
      )}

      <div className="grid grid-cols-1 gap-5">
        {content.findings?.map((finding, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-semibold text-gray-900">{finding.title}</h5>
              {finding.status && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  finding.status === 'critical' ? 'text-red-700 bg-red-50' :
                  finding.status === 'warning' ? 'text-amber-700 bg-amber-50' :
                  'text-emerald-700 bg-emerald-50'
                }`}>
                  {finding.statusLabel}
                </span>
              )}
            </div>
            {finding.description && (
              <p className="text-xs text-gray-500 mb-3">{finding.description}</p>
            )}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <svg viewBox={`0 0 ${finding.chart.width || 500} ${finding.chart.height || 160}`} className="w-full h-auto">
                {finding.chart.yLabels?.map((label) => {
                  const y = finding.chart.paddingTop + (1 - label.value / finding.chart.yMax) * finding.chart.plotHeight
                  return (
                    <g key={`y-${label.value}`}>
                      <line x1={finding.chart.paddingLeft} y1={y} x2={finding.chart.width - 10} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                      <text x={finding.chart.paddingLeft - 5} y={y + 4} textAnchor="end" className="text-xs" fill="#9ca3af">{label.text}</text>
                    </g>
                  )
                })}

                {finding.chart.threshold && (
                  <>
                    <line
                      x1={finding.chart.paddingLeft}
                      y1={finding.chart.paddingTop + (1 - finding.chart.threshold.value / finding.chart.yMax) * finding.chart.plotHeight}
                      x2={finding.chart.width - 10}
                      y2={finding.chart.paddingTop + (1 - finding.chart.threshold.value / finding.chart.yMax) * finding.chart.plotHeight}
                      stroke="#f97316" strokeWidth="1" strokeDasharray="4 4"
                    />
                    <text
                      x={finding.chart.width - 5}
                      y={finding.chart.paddingTop + (1 - finding.chart.threshold.value / finding.chart.yMax) * finding.chart.plotHeight + 4}
                      className="text-xs" fill="#f97316" textAnchor="end"
                    >
                      {finding.chart.threshold.label}
                    </text>
                  </>
                )}

                {finding.chart.lines?.map((line, li) => {
                  const points = line.data.map((val, i) => {
                    const x = finding.chart.paddingLeft + (i / (line.data.length - 1)) * (finding.chart.width - finding.chart.paddingLeft - 10)
                    const y = finding.chart.paddingTop + (1 - val / finding.chart.yMax) * finding.chart.plotHeight
                    return `${x},${y}`
                  }).join(' ')

                  return (
                    <g key={`line-${li}`}>
                      {line.fill && (
                        <polygon
                          points={`${points} ${finding.chart.width - 10},${finding.chart.paddingTop + finding.chart.plotHeight} ${finding.chart.paddingLeft},${finding.chart.paddingTop + finding.chart.plotHeight}`}
                          fill={line.fill}
                          opacity="0.15"
                        />
                      )}
                      <polyline
                        fill="none"
                        stroke={line.color}
                        strokeWidth={line.strokeWidth || 2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                    </g>
                  )
                })}

                {finding.chart.xLabels?.map((label, i) => {
                  const x = finding.chart.paddingLeft + (i / (finding.chart.xLabels.length - 1)) * (finding.chart.width - finding.chart.paddingLeft - 10)
                  return (
                    <text key={`x-${i}`} x={x} y={finding.chart.paddingTop + finding.chart.plotHeight + 18} textAnchor="middle" className="text-xs" fill="#9ca3af">{label}</text>
                  )
                })}

              </svg>
            </div>
            {finding.linkedSectionId && onScrollToSection && (
              <button
                onClick={() => onScrollToSection(finding.linkedSectionId)}
                className="inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 text-[11px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
              >
                <ArrowDown className="w-3 h-3" />
                {finding.linkedLabel || 'View details'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
