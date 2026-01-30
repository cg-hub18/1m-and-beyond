import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Table2 } from 'lucide-react'

export default function HypothesisContent({ content }) {
  const [expandedHypotheses, setExpandedHypotheses] = useState({})

  const toggleHypothesis = (id) => {
    setExpandedHypotheses(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Parse and render text with SEV/diff links
  const renderTextWithLinks = (text) => {
    const linkPattern = /(SEV\s*)?(S\d+|D\d+)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      if (match[1]) {
        parts.push(match[1])
      }
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
    
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  const renderDetailedSteps = (steps) => {
    return (
      <div className="space-y-6 pt-4">
        {steps.map((step, index) => (
          <div key={index} className="space-y-3">
            {/* Step Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">
                {index + 1}. {step.title}:
              </span>
              {step.tableName && (
                <code className="px-2 py-0.5 bg-gray-100 text-gray-700 text-sm rounded font-mono">
                  {step.tableName}
                </code>
              )}
            </div>

            {/* Scuba Card */}
            {step.query && (
              <div className="border border-gray-200 rounded-lg bg-white">
                {/* Card Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Table2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Scuba</span>
                  </div>
                  <a 
                    href="#" 
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    View in Scuba
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Card Content */}
                <div className="px-4 py-3 space-y-2">
                  <p className="text-sm font-semibold text-gray-900">{step.query.table}</p>
                  
                  {step.query.filters && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Filters:</span> {step.query.filters}
                    </p>
                  )}
                  
                  {step.query.groupBy && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Group by:</span> {step.query.groupBy}
                    </p>
                  )}
                  
                  {step.query.timeRange && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Time range:</span> {step.query.timeRange}
                    </p>
                  )}
                  
                  {step.query.lookFor && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-500">Look for:</span> {step.query.lookFor}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {content.summary}
      </p>

      {/* Hypotheses */}
      <div className="space-y-6">
        {content.hypotheses.map((hypothesis, index) => (
          <div key={hypothesis.id} className="space-y-3">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">
                Hypothesis {index + 1}: {hypothesis.title}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-medium">Rationale</span> – {renderTextWithLinks(hypothesis.rationale)}
              </p>
            </div>

            {/* Detailed Steps Accordion */}
            <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
              <button
                onClick={() => toggleHypothesis(hypothesis.id)}
                className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">Detailed Steps</span>
                {expandedHypotheses[hypothesis.id] ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expandedHypotheses[hypothesis.id] && hypothesis.detailedSteps && (
                <div className="px-4 pb-4 animate-fade-in">
                  {renderDetailedSteps(hypothesis.detailedSteps)}
                </div>
              )}
            </div>

            {/* Divider between hypotheses */}
            {index < content.hypotheses.length - 1 && (
              <hr className="border-gray-200 mt-4" />
            )}
          </div>
        ))}
      </div>

      {/* Next Steps */}
      {content.nextSteps && (
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-gray-900">Next Steps</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {content.nextSteps.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {renderTextWithLinks(step)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
