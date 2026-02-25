import { useState } from 'react'
import { Check } from 'lucide-react'

export default function NextStepsDetailContent({ content }) {
  const [checkedSteps, setCheckedSteps] = useState(
    () => new Set(content.steps?.filter(s => s.completed).map(s => s.id) || [])
  )

  const toggleStep = (id) => {
    setCheckedSteps(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const priorityColors = {
    P0: 'text-red-700 bg-red-50 border-red-200',
    P1: 'text-amber-700 bg-amber-50 border-amber-200',
    P2: 'text-blue-700 bg-blue-50 border-blue-200',
  }

  return (
    <div className="space-y-5">
      {content.summary && (
        <p className="text-sm text-gray-600 leading-relaxed">{content.summary}</p>
      )}

      <div className="space-y-3">
        {content.steps?.map((step) => (
          <div
            key={step.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              checkedSteps.has(step.id) ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'
            }`}
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
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-sm font-medium leading-relaxed transition-colors ${
                  checkedSteps.has(step.id) ? 'text-gray-400 line-through' : 'text-gray-900'
                }`}>
                  {step.title}
                </span>
                {step.priority && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${priorityColors[step.priority] || priorityColors.P2}`}>
                    {step.priority}
                  </span>
                )}
              </div>
              {step.description && (
                <p className={`text-xs leading-relaxed transition-colors ${
                  checkedSteps.has(step.id) ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              )}
              {step.owner && (
                <span className={`inline-block mt-1 text-[11px] font-medium transition-colors ${
                  checkedSteps.has(step.id) ? 'text-gray-300' : 'text-gray-400'
                }`}>
                  Owner: {step.owner}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
