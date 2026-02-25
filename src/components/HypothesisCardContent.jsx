import { CheckCircle2, XCircle } from 'lucide-react'

export default function HypothesisCardContent({ content }) {
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

  const statusConfig = {
    confirmed: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Confirmed' },
    likely: { icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Likely' },
    ruled_out: { icon: XCircle, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Ruled Out' },
  }

  const status = statusConfig[content.status] || statusConfig.likely

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700 leading-relaxed">
        {renderTextWithLinks(content.rationale)}
      </p>

      {content.evidence && content.evidence.length > 0 && (
        <div>
          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Evidence</h5>
          <ul className="space-y-1.5">
            {content.evidence.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span>{renderTextWithLinks(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.investigation && content.investigation.length > 0 && (
        <div>
          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Investigation Steps</h5>
          <ol className="space-y-1.5">
            {content.investigation.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                <span className="text-gray-400 font-medium shrink-0 text-xs mt-0.5">{i + 1}.</span>
                <span>{renderTextWithLinks(step)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
