import { X, CheckCircle2 } from 'lucide-react'

export default function StepsPanel({ isOpen, onClose, stepsToShow }) {
  const allSteps = [
    'Identify and ingest SEV alert or SLO breach.',
    'Pull relevant metadata: service.',
    'Gather monitoring data, SLOs, and KPIs.',
    'Fetch logs from relevant systems',
    'Identify recent, config shifts, flags.',
    'Determine upstream service relationships.',
    'Compare with similar previous incidents.',
    'Produce likely root cause explanations.',
    'Order by likelihood and confidence.',
    'Turn hypotheses into steps to test.',
    'Run checks, traces, log queries.',
    'Capture results from each test.',
    'Update hypothesis likelihoods.',
    'Mark hypotheses as confirmed or refuted.',
    'Explore lower-probability causes.',
    'Recommend mitigation action.',
    'Combine confirmed hypothesis, evidence.',
    'Create structured findings + actions.',
    'Display context, plan, and findings.',
  ]

  // Show only the number of steps specified, or all if not specified
  // Use explicit check for null/undefined to allow stepsToShow of 0
  const hasExplicitCount = stepsToShow !== null && stepsToShow !== undefined
  const steps = hasExplicitCount ? allSteps.slice(0, stepsToShow) : allSteps
  const displayCount = hasExplicitCount ? stepsToShow : allSteps.length

  return (
    <div 
      className={`bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-[380px] opacity-100' : 'w-0 opacity-0 border-l-0'
      }`}
    >
      <div className="min-w-[380px] flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{displayCount} Steps</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

