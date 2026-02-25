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

  const hasExplicitCount = stepsToShow !== null && stepsToShow !== undefined
  const steps = hasExplicitCount ? allSteps.slice(0, stepsToShow) : allSteps
  const displayCount = hasExplicitCount ? stepsToShow : allSteps.length

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
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
    </>
  )
}
