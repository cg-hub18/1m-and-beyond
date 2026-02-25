function DeploymentTimeline({ timeline }) {
  const svgWidth = 950
  const labelWidth = 150
  const rightPad = 15
  const tlWidth = svgWidth - labelWidth - rightPad
  const startMin = timeline.startMinute ?? 15
  const endMin = timeline.endMinute ?? 195
  const range = endMin - startMin

  const timeToX = (m) => labelWidth + ((m - startMin) / range) * tlWidth

  const timeTicks = [
    { m: 30, label: '12:30 PM' },
    { m: 60, label: '1:00 PM' },
    { m: 90, label: '1:30 PM' },
    { m: 120, label: '2:00 PM' },
    { m: 150, label: '2:30 PM' },
    { m: 180, label: '3:00 PM' },
  ]

  const laneH = 32
  const headerH = 22
  const laneStart = headerH + 4
  const svgHeight = laneStart + timeline.lanes.length * laneH + 4

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-x-auto">
      <div className="min-w-[700px]">
        <div className="text-xs text-gray-500 mb-2 font-medium">{timeline.date}</div>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          {timeTicks.map(tick => (
            <text key={tick.m} x={timeToX(tick.m)} y={headerH - 4} textAnchor="middle" fontSize="10" fill="#9ca3af">{tick.label}</text>
          ))}

          {timeline.lanes.map((lane, li) => {
            const cy = laneStart + li * laneH + laneH / 2
            return (
              <g key={li}>
                <rect x={8} y={cy - 5} width={10} height={10} rx={2} fill="#6366f1" />
                <text x={24} y={cy + 3.5} fontSize="10" fill="#374151">{lane.label}</text>

                {lane.events.map((ev, ei) => {
                  const x = timeToX(ev.m)
                  if (ev.n != null && ev.h) {
                    return (
                      <g key={ei}>
                        <circle cx={x} cy={cy} r={11} fill="white" stroke="#6366f1" strokeWidth={2} />
                        <text x={x} y={cy + 3.5} textAnchor="middle" fontSize="9" fontWeight="600" fill="#6366f1">{ev.n}</text>
                      </g>
                    )
                  }
                  if (ev.n != null) {
                    const w = Math.max(String(ev.n).length * 7 + 8, 20)
                    return (
                      <g key={ei}>
                        <rect x={x - w / 2} y={cy - 9} width={w} height={18} rx={9} fill="#6366f1" />
                        <text x={x} y={cy + 3.5} textAnchor="middle" fontSize="9" fontWeight="500" fill="white">{ev.n}</text>
                      </g>
                    )
                  }
                  return <rect key={ei} x={x - 4} y={cy - 4} width={8} height={8} rx={2} fill="#6366f1" />
                })}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default function RootCauseDetailContent({ content }) {
  const renderTextWithLinks = (text) => {
    const pattern = /(D\d{5,})/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(
        <a
          key={match.index}
          href="#"
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          onClick={(e) => e.preventDefault()}
        >
          {match[1]}
        </a>
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
      <p className="text-sm text-gray-700 leading-relaxed">
        {renderTextWithLinks(content.summary)}
      </p>

      {content.timeline && (
        <DeploymentTimeline timeline={content.timeline} />
      )}

      {content.details && content.details.length > 0 && (
        <div className="space-y-4">
          {content.details.map((detail, i) => (
            <div key={i}>
              <h5 className="text-sm font-semibold text-gray-900 mb-1.5">{detail.heading}</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {renderTextWithLinks(detail.text)}
              </p>
            </div>
          ))}
        </div>
      )}

      {content.affectedSystems && content.affectedSystems.length > 0 && (
        <div>
          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Affected Systems</h5>
          <div className="flex flex-wrap gap-2">
            {content.affectedSystems.map((system) => (
              <span key={system} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-mono text-gray-600">
                {system}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
