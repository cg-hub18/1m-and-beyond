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
