import { Search, GitBranch, FlaskConical, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Search,
    label: 'Gather evidence',
    description:
      'Pulling SLI metrics, integrity pipeline logs, and distribution traces from the incident window to establish a baseline.',
  },
  {
    icon: GitBranch,
    label: 'Correlate signals',
    description:
      'Cross-referencing the creator reach drop on Facebook & Instagram with recent config changes (D984521) and integrity hold-queue spikes.',
  },
  {
    icon: FlaskConical,
    label: 'Generate & test hypotheses',
    description:
      'Evaluating three candidate root causes against the evidence to confirm or rule out each one.',
  },
]

const hypotheses = [
  {
    number: 1,
    title: 'Content Locale Routing Misconfiguration',
    brief:
      'A recent locale routing change (D892341) may be filtering content to only pl_PL users.',
  },
  {
    number: 2,
    title: 'Integrity Filter False Positive Cascade',
    brief:
      'The tightened cross-posting velocity threshold in D984521 may be incorrectly flagging high-volume creator posts.',
  },
  {
    number: 3,
    title: 'CDN Cache Invalidation Failure',
    brief:
      'Stale routing rules on edge PoPs after D918203 may be causing inconsistent content delivery.',
  },
]

export default function PlanContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 leading-relaxed">
        Based on the evidence collected so far, here is how Opsmate will investigate this incident.
      </p>

      {/* Approach steps */}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-500 shrink-0">
              <step.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{step.label}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hypotheses preview */}
      <div>
        <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Hypotheses to evaluate</h5>
        <div className="space-y-2">
          {hypotheses.map((h) => (
            <div
              key={h.number}
              className="flex items-start gap-3 px-3.5 py-2.5 rounded-lg border border-gray-100 bg-gray-50"
            >
              <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-[11px] font-bold text-gray-600 shrink-0">
                {h.number}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">{h.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{h.brief}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <ArrowRight className="w-3 h-3" />
        <span>Results will appear in the sections below as each hypothesis is evaluated.</span>
      </div>
    </div>
  )
}
