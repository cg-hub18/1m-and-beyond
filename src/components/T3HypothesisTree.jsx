import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import {
  AlertTriangle, CheckCircle2, XCircle, Target, Shield,
  Activity, GitCommit, Terminal, ExternalLink, Database,
  AlertCircle, FileText, ArrowUp, Paperclip,
} from 'lucide-react'

function OpsmateLogo({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0206 15.0256C10.3164 15.8619 11.1136 16.4613 12.0513 16.4615C12.9891 16.4613 13.7863 15.8619 14.0821 15.0256H15.1493C14.8242 16.4359 13.5606 17.4872 12.0514 17.4872C10.5427 17.4872 9.27906 16.4359 8.95341 15.0256H10.0206ZM12.0508 16.4615H12.0519C12.0517 16.4615 12.0515 16.4615 12.0513 16.4615C12.0512 16.4615 12.051 16.4615 12.0508 16.4615Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.12879 7.38461C9.61545 7.38462 10.8211 8.59026 10.8211 10.0769C10.8211 11.5636 9.61545 12.7692 8.12879 12.7692C6.64213 12.7692 5.43649 11.5636 5.43649 10.0769C5.43649 8.59026 6.64213 7.38461 8.12879 7.38461ZM8.12879 8.41026C7.20828 8.41026 6.46213 9.15641 6.46213 10.0769C6.46213 10.9974 7.20828 11.7436 8.12879 11.7436C9.0493 11.7436 9.79546 10.9974 9.79546 10.0769C9.79546 9.15641 9.0493 8.41026 8.12879 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.8724 7.38461C17.359 7.38462 18.5647 8.59026 18.5647 10.0769C18.5647 11.5636 17.359 12.7692 15.8724 12.7692C14.3857 12.7692 13.1801 11.5636 13.1801 10.0769C13.1801 8.59026 14.3857 7.38461 15.8724 7.38461ZM15.8724 8.41026C14.9519 8.41026 14.2057 9.15641 14.2057 10.0769C14.2057 10.9974 14.9519 11.7436 15.8724 11.7436C16.7929 11.7436 17.5391 10.9974 17.5391 10.0769C17.5391 9.15641 16.7929 8.41026 15.8724 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6673 0C15.177 6.43207e-06 15.5903 0.413337 15.5903 0.923077V5.22922C15.9447 5.2087 16.2862 5.18513 16.616 5.16001V0.98152L18.7175 1.42874C20.2498 1.75489 21.3893 3.00361 21.6047 4.51848C21.6688 4.50617 21.7293 4.49385 21.7867 4.48257C22.019 4.43591 22.1944 4.39746 22.3103 4.37079C22.3683 4.35746 22.4114 4.34716 22.439 4.34049C22.4529 4.33742 22.4631 4.33487 22.4693 4.33333C22.4724 4.33282 22.4744 4.33178 22.4755 4.33178H22.476C22.8877 4.22614 23.3067 4.47435 23.4123 4.88562H23.4113C23.517 5.29741 23.2688 5.71642 22.8575 5.82206C22.8483 5.82463 22.8185 5.83178 22.8016 5.83589C22.7673 5.84409 22.718 5.85592 22.6534 5.87079C22.5247 5.90002 22.3354 5.94154 22.0888 5.99129C21.9442 6.02 21.7795 6.05179 21.5954 6.08564C21.6252 6.27487 21.6411 6.46923 21.6411 6.66667V17.7436C21.6411 19.7667 20.0139 21.4103 17.9965 21.4359H14.9744C14.7406 21.7472 14.3683 21.9487 13.9488 21.9487H10.0514C9.63189 21.9487 9.25958 21.7472 9.02573 21.4359H6.00364C3.98621 21.4108 2.35906 19.7672 2.35906 17.7441V6.66717C2.35906 6.46922 2.37494 6.27536 2.40469 6.08614C2.22058 6.05229 2.05596 6.02102 1.91135 5.99179C1.66469 5.94256 1.47597 5.90104 1.34674 5.87129C1.28213 5.85642 1.23287 5.84459 1.19851 5.83639C1.18158 5.83228 1.15184 5.82513 1.14262 5.82257C0.731345 5.71692 0.483149 5.29744 0.58878 4.88617C0.694421 4.47489 1.1139 4.2267 1.52518 4.33233H1.52573C1.52676 4.33235 1.5288 4.33332 1.53184 4.33383C1.53799 4.33537 1.54829 4.33746 1.56214 4.34105C1.58983 4.34771 1.63291 4.35796 1.69084 4.37129C1.80623 4.39796 1.98213 4.43641 2.21443 4.48307C2.27187 4.49487 2.33237 4.50667 2.39647 4.51898C2.61186 3.00411 3.75134 1.75539 5.28364 1.42924L7.3852 0.982071V5.16051C7.71494 5.18563 8.05649 5.20925 8.41085 5.22977V0.923077C8.41085 0.413333 8.82418 0 9.33392 0H14.6673ZM19.9411 6.35181C18.076 6.61233 15.3739 6.87179 12.0011 6.87179C8.62827 6.87179 5.9257 6.61284 4.06109 6.35181C4.01493 6.34515 3.96929 6.339 3.92417 6.33233C3.90673 6.44104 3.89803 6.55283 3.89803 6.66667V17.7436C3.89803 18.9333 4.86213 19.8974 6.05187 19.8974H9.02623C9.26008 19.5862 9.63239 19.3846 10.0519 19.3846H13.9493C14.3688 19.3846 14.7411 19.5862 14.9749 19.8974H17.9493C19.139 19.8974 20.1032 18.9333 20.1032 17.7436H20.1042V6.66667C20.1042 6.55283 20.0949 6.44155 20.078 6.33233C20.0329 6.339 19.9872 6.34515 19.9411 6.35181ZM10.616 1.4359C10.3611 1.4359 10.1544 1.64256 10.1544 1.89744V2.14874C10.1544 3.06155 10.5601 3.92771 11.2616 4.51232L11.7052 4.88206C11.7909 4.95333 11.896 4.98923 12.0006 4.98923C12.1052 4.98923 12.2103 4.95334 12.296 4.88206L12.7396 4.51232C13.4411 3.92771 13.8467 3.06206 13.8467 2.14874V1.89744C13.8467 1.64257 13.6401 1.4359 13.3852 1.4359H10.616Z" fill="currentColor"/>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Data transformation — converts investigation sections into tree structure
// ---------------------------------------------------------------------------

function buildTree(investigation) {
  const execSummary = investigation.sections.find(s => s.type === 'hypothesis')
  const hypotheses = investigation.sections.filter(s => s.type === 'hypothesis-card')
  const rootCauseSection = investigation.sections.find(s => s.type === 'root-cause-detail')

  const symptomItems = (execSummary?.content?.keyFindings?.items || []).filter(item => item.source)

  const hypothesisNodes = hypotheses.map((h, i) => {
    const confidence =
      h.content.status === 'confirmed' ? 95
      : h.content.status === 'ruled_out' ? (i === 0 ? 15 : 8)
      : 50
    return {
      id: h.id,
      type: 'hypothesis',
      label: h.title.replace(/^Hypothesis \d+:\s*/, ''),
      fullTitle: h.title,
      status: h.content.status,
      confidence,
      rationale: h.content.rationale,
      evidence: h.content.evidence || [],
      investigation: h.content.investigation || [],
    }
  })

  return {
    symptomItems,
    hypotheses: hypothesisNodes,
    rootCause: rootCauseSection ? {
      id: 'root-cause',
      type: 'root-cause',
      label: 'Root Cause',
      summary: rootCauseSection.content.summary,
      details: rootCauseSection.content.details,
      affectedSystems: rootCauseSection.content.affectedSystems,
      timeline: rootCauseSection.content.timeline,
    } : null,
    mitigation: {
      id: 'mitigation',
      type: 'mitigation',
      label: 'Mitigation',
      steps: execSummary?.content?.nextSteps || [],
    },
    alert: execSummary?.content?.keyFindings?.relatedAlert,
    datasets: execSummary?.content?.keyFindings?.relatedDatasets,
  }
}

// ---------------------------------------------------------------------------
// Sparkline — tiny inline chart for metric previews
// ---------------------------------------------------------------------------

function Sparkline({ data, color = '#ef4444', width = 80, height = 24 }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Diff-link helper — renders D123456 references as blue links
// ---------------------------------------------------------------------------

function renderTextWithLinks(text) {
  const pattern = /(D\d{5,})/g
  const parts = []
  let lastIndex = 0
  let match
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <a
        key={match.index}
        href="#"
        className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
        onClick={(e) => e.preventDefault()}
      >
        {match[1]}
      </a>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

// ---------------------------------------------------------------------------
// TreeNode — individual node card rendered in the tree
// ---------------------------------------------------------------------------

const STATUS_STYLES = {
  confirmed: {
    border: 'border-red-400',
    dot: 'bg-red-500',
    text: 'text-red-700',
    label: 'Root Cause',
  },
  ruled_out: {
    border: 'border-gray-300',
    dot: 'bg-gray-400',
    text: 'text-gray-500',
    label: 'Ruled Out',
  },
  likely: {
    border: 'border-amber-400',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    label: 'Plausible',
  },
}

function TreeNode({ node, isSelected, onClick, nodeRef }) {
  const selectedRing = 'border-blue-500 ring-2 ring-blue-100 shadow-elevated'
  const base = 'cursor-pointer rounded-xl bg-white border-2 transition-all duration-200 shadow-card'

  if (node.type === 'symptoms') {
    return (
      <div
        ref={nodeRef}
        onClick={onClick}
        className={`${base} px-5 py-3 min-w-[200px] ${isSelected ? selectedRing : 'border-orange-300 hover:shadow-elevated'}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <AlertTriangle size={16} className="text-orange-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Observed Symptoms</div>
            <div className="text-xs text-gray-500">3 anomalies detected</div>
          </div>
        </div>
      </div>
    )
  }

  if (node.type === 'hypothesis') {
    const s = STATUS_STYLES[node.status] || STATUS_STYLES.likely
    return (
      <div
        ref={nodeRef}
        onClick={onClick}
        className={`${base} px-4 py-3 w-[220px] ${isSelected ? selectedRing : `${s.border} hover:shadow-elevated`}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
            <span className={`text-[11px] font-semibold uppercase tracking-wide ${s.text}`}>{s.label}</span>
          </div>
          <span className={`text-xs font-bold ${s.text}`}>{node.confidence}%</span>
        </div>
        <div className={`text-sm font-medium ${node.status === 'ruled_out' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {node.label}
        </div>
        <div className="text-[11px] text-gray-400 mt-1">{node.evidence.length} evidence items</div>
      </div>
    )
  }

  if (node.type === 'root-cause') {
    return (
      <div
        ref={nodeRef}
        onClick={onClick}
        className={`${base} px-5 py-3 min-w-[260px] ${isSelected ? selectedRing : 'border-red-400 hover:shadow-elevated'}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Target size={16} className="text-red-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Root Cause Identified</div>
            <div className="text-xs text-red-600 font-medium">Integrity Filter D984521</div>
          </div>
        </div>
      </div>
    )
  }

  if (node.type === 'mitigation') {
    const done = node.steps.filter(s => s.completed).length
    return (
      <div
        ref={nodeRef}
        onClick={onClick}
        className={`${base} px-5 py-3 min-w-[220px] ${isSelected ? selectedRing : 'border-emerald-400 hover:shadow-elevated'}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Shield size={16} className="text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Mitigation Plan</div>
            <div className="text-xs text-gray-500">{done}/{node.steps.length} actions complete</div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// EvidenceNode — small child card for evidence items in the tree
// ---------------------------------------------------------------------------

function EvidenceNode({ node, isSelected, onClick, nodeRef }) {
  const s = STATUS_STYLES[node.parentStatus] || STATUS_STYLES.likely
  const isRuledOut = node.parentStatus === 'ruled_out'
  const isConfirmed = node.parentStatus === 'confirmed'
  const selectedRing = 'border-blue-500 ring-2 ring-blue-100 shadow-elevated'

  return (
    <div
      ref={nodeRef}
      onClick={onClick}
      className={`cursor-pointer rounded-lg bg-white border transition-all duration-200 shadow-sm w-[200px] px-3 py-2.5 ${
        isSelected
          ? selectedRing
          : isRuledOut
            ? 'border-gray-200 opacity-50 hover:opacity-75 hover:shadow-md'
            : isConfirmed
              ? 'border-gray-200 border-l-red-400 border-l-2 hover:shadow-md'
              : 'border-gray-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isConfirmed ? 'bg-red-400' : isRuledOut ? 'bg-gray-300' : 'bg-amber-400'}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">E{node.evidenceIndex + 1}</span>
          </div>
          <p className={`text-xs leading-relaxed line-clamp-2 ${isRuledOut ? 'text-gray-400' : 'text-gray-600'}`}>
            {node.text}
          </p>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EvidencePanel — right-pane detail panel, content depends on selected node
// ---------------------------------------------------------------------------

function SymptomsDetail({ treeData }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Observed Symptoms</h3>
        <p className="text-sm text-gray-500">Anomalies detected across creator distribution metrics</p>
      </div>

      <div className="space-y-3">
        {treeData.symptomItems.map((item, i) => (
          <div key={i} className="p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {item.source.label}
              </span>
              <span className={`text-xs font-semibold ${item.source.preview?.status === 'critical' ? 'text-red-600' : 'text-gray-600'}`}>
                {item.source.preview?.delta}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-gray-900">{item.source.preview?.value}</div>
                <div className="text-xs text-gray-500">{item.source.preview?.title}</div>
              </div>
              <Sparkline
                data={item.source.preview?.sparkline}
                color={item.source.preview?.status === 'critical' ? '#ef4444' : '#6b7280'}
              />
            </div>
          </div>
        ))}
      </div>

      {treeData.alert && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Triggering Alert</h4>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-sm font-medium text-red-800">{treeData.alert.alertKey}</span>
            </div>
            <div className="text-xs text-red-700">{treeData.alert.name}</div>
            <div className="flex items-center gap-3 mt-2 text-xs text-red-600">
              <span>Started: {treeData.alert.startedAt}</span>
              <span>{treeData.alert.channel}</span>
            </div>
          </div>
        </div>
      )}

      {treeData.datasets && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Related Datasets</h4>
          <div className="space-y-2">
            {treeData.datasets.map((ds, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                <Database size={14} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono text-gray-700">{ds.name}</div>
                  <div className="text-xs text-gray-500">{ds.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function HypothesisDetail({ node }) {
  const isConfirmed = node.status === 'confirmed'
  const isRuledOut = node.status === 'ruled_out'

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">{node.fullTitle}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isConfirmed
                ? 'bg-red-50 text-red-700 border border-red-200'
                : isRuledOut
                  ? 'bg-gray-100 text-gray-500 border border-gray-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isConfirmed ? <CheckCircle2 size={12} /> : isRuledOut ? <XCircle size={12} /> : <AlertTriangle size={12} />}
            {isConfirmed ? 'Confirmed Root Cause' : isRuledOut ? 'Ruled Out' : 'Under Investigation'}
          </span>
          <span className="text-xs text-gray-400">Confidence: {node.confidence}%</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Rationale</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{renderTextWithLinks(node.rationale)}</p>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          {isRuledOut ? 'Refuting Evidence' : 'Supporting Evidence'}
        </h4>
        <div className="space-y-2">
          {node.evidence.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isConfirmed ? 'bg-red-400' : isRuledOut ? 'bg-gray-300' : 'bg-amber-400'}`} />
              <span className="text-sm text-gray-600 leading-relaxed">{renderTextWithLinks(item)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Investigation Steps</h4>
        <ol className="space-y-2">
          {node.investigation.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{renderTextWithLinks(step)}</span>
            </li>
          ))}
        </ol>
      </div>

      {isConfirmed && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Raw Evidence</h4>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Terminal size={12} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500">Log Snippet</span>
            </div>
            <pre className="text-[11px] bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto font-mono leading-relaxed">
{`[13:05:12 UTC] integrity_filter: velocity_check TRIGGERED
  creator_id=ts_official tier=superstar
  velocity=3 posts/min threshold=2 posts/min
  action=HOLD queue=integrity_review
  diff_ref=D984521 rule=cross_post_velocity_v2
[13:05:12 UTC] distribution: hold_applied
  post_ids=[fb_9912, ig_4401, wa_2201]
  surfaces=[feed, stories, reels]
  estimated_hold_duration=4h`}
            </pre>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Activity size={12} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500">Trace</span>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-700 hover:bg-blue-100 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <ExternalLink size={14} />
              <span className="font-mono text-xs">trace/integrity-pipeline/abc123def456</span>
            </a>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <GitCommit size={12} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500">Commit Diff — D984521</span>
            </div>
            <pre className="text-[11px] bg-gray-900 text-gray-300 p-3 rounded-lg overflow-x-auto font-mono leading-relaxed">
              <span className="text-gray-500">{'// integrity_filter/velocity_config.py\n'}</span>
              <span className="text-red-400">{'- CROSS_POST_VELOCITY_LIMIT = 5  # posts/min\n'}</span>
              <span className="text-green-400">{'+ CROSS_POST_VELOCITY_LIMIT = 2  # posts/min\n'}</span>
              {'\n'}
              <span className="text-gray-500">{'// integrity_filter/tier_exemptions.py\n'}</span>
              <span className="text-red-400">{'- EXEMPT_TIERS = ["superstar", "verified_creator"]\n'}</span>
              <span className="text-green-400">{'+ EXEMPT_TIERS = ["verified_creator"]'}</span>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

function RootCauseDetail({ node }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Root Cause Analysis</h3>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          <Target size={12} />
          High Confidence
        </span>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Summary</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{renderTextWithLinks(node.summary)}</p>
      </div>

      {node.details && (
        <div className="space-y-4">
          {node.details.map((detail, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{detail.heading}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{renderTextWithLinks(detail.text)}</p>
            </div>
          ))}
        </div>
      )}

      {node.affectedSystems && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Affected Systems</h4>
          <div className="flex flex-wrap gap-2">
            {node.affectedSystems.map((system) => (
              <span key={system} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-mono text-gray-600">
                {system}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Impact Metrics</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-xs text-red-600 mb-1">FB Reach Drop</div>
            <div className="text-lg font-bold text-red-800">-42%</div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-xs text-red-600 mb-1">IG Distribution</div>
            <div className="text-lg font-bold text-red-800">0.94 &rarr; 0.61</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-xs text-amber-600 mb-1">Posts Held</div>
            <div className="text-lg font-bold text-amber-800">47</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-xs text-green-600 mb-1">WhatsApp</div>
            <div className="text-lg font-bold text-green-800">Unaffected</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MitigationDetail({ node }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Mitigation Plan</h3>
        <p className="text-sm text-gray-500">Recommended actions to resolve this incident</p>
      </div>

      <div className="relative">
        {node.steps.map((step, i) => (
          <div key={step.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 relative z-10">
            <div className="relative flex flex-col items-center shrink-0">
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  step.completed ? 'bg-gray-400 border-gray-400' : 'border-gray-300'
                }`}
              >
                {step.completed && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </div>
            <span className={`text-sm leading-relaxed ${step.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {step.text}
            </span>
          </div>
        ))}
        {/* Dotted connector line running behind the checkmarks */}
        <div
          className="absolute z-0"
          style={{
            left: 'calc(12px + 10px)',
            top: '20px',
            bottom: '20px',
            width: '0px',
            borderLeft: '2px dashed #d1d5db',
          }}
        />
      </div>

      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
          <FileText size={14} />
          Follow-up Task: Audit integrity filter tier exemptions
        </div>
        <div className="text-xs text-blue-600 mt-1">Assigned to: Integrity Platform Team</div>
      </div>
    </div>
  )
}

function EvidencePanel({ selectedNode, treeData }) {
  if (!selectedNode) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Select a node to view details
      </div>
    )
  }

  switch (selectedNode.type) {
    case 'symptoms':
      return <SymptomsDetail treeData={treeData} />
    case 'hypothesis':
      return <HypothesisDetail node={selectedNode} />
    case 'root-cause':
      return <RootCauseDetail node={selectedNode} />
    case 'mitigation':
      return <MitigationDetail node={selectedNode} />
    default:
      return null
  }
}

// ---------------------------------------------------------------------------
// ChatPanel — conversational interface for the hypothesis tree
// ---------------------------------------------------------------------------

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      "I'm analyzing the hypothesis tree for this SEV. I can help you dig deeper into any node — ask me about specific evidence, request additional investigation, or explore alternative hypotheses.",
    quickActions: [
      { id: 'summarize-tree', label: 'Summarize findings' },
      { id: 'why-ruled-out', label: 'Why was H1 ruled out?' },
      { id: 'confidence', label: 'Explain confidence scores' },
      { id: 'next-steps', label: 'What should we do next?' },
    ],
  },
]

const CANNED_RESPONSES = {
  'summarize-tree': {
    content:
      'Three hypotheses were evaluated. Hypothesis 1 (Locale Routing) and Hypothesis 3 (CDN Cache) were ruled out based on contradicting evidence — distribution logs showed no locale filtering and CDN propagation was confirmed at all 42 PoPs. Hypothesis 2 (Integrity Filter) was confirmed at 95% confidence: D984521 reduced the cross-posting velocity threshold from 5 to 2 posts/min and omitted Superstar Creator tier accounts from the exemption list, causing 47 posts to be held.',
    quickActions: [
      { id: 'deep-dive-h2', label: 'Deep dive on H2' },
      { id: 'next-steps', label: 'What are the next steps?' },
    ],
  },
  'why-ruled-out': {
    content:
      'Hypothesis 1 (Locale Routing Misconfiguration) was ruled out for three reasons:\n\n1. D892341 landed 3 days prior but locale routing config was verified unchanged for Superstar Creator tier\n2. Reach degradation affected all locales equally, not just non-pl_PL regions\n3. Distribution logs showed zero locale-based filtering decisions during the incident window\n\nThe evidence pattern pointed clearly away from a locale issue — the drop was platform-wide, not locale-specific.',
    quickActions: [
      { id: 'why-h3-out', label: 'Why was H3 ruled out?' },
      { id: 'confidence', label: 'Explain confidence scores' },
    ],
  },
  'why-h3-out': {
    content:
      'Hypothesis 3 (CDN Cache Invalidation) was ruled out because:\n\n1. CDN propagation logs confirmed 100% edge PoP coverage within 4 minutes of D918203\n2. Cache hit/miss ratios were consistent across all geographic regions\n3. Content delivery latency showed no geographic variance — the issue was upstream in the distribution pipeline, not at the CDN layer\n\nThis was a quick rule-out since the CDN metrics were clean across the board.',
    quickActions: [
      { id: 'deep-dive-h2', label: 'Tell me more about H2' },
    ],
  },
  confidence: {
    content:
      "Confidence scores reflect the weight of evidence for each hypothesis:\n\n• **H2: 95%** — 4 independent evidence items all corroborating, exact timestamp correlation, and a clear code change (D984521) as the trigger. This is near-certain.\n• **H1: 15%** — The locale routing theory had some surface plausibility (D892341 existed) but all 3 evidence checks refuted it.\n• **H3: 8%** — CDN issues were a long-shot from the start. All infrastructure metrics were clean. Low initial prior, fully refuted.\n\nScores are derived from evidence strength, corroboration count, and whether any evidence directly refutes the hypothesis.",
    quickActions: [
      { id: 'deep-dive-h2', label: 'Deep dive on root cause' },
    ],
  },
  'deep-dive-h2': {
    content:
      'The root cause trace is clear: D984521 modified `integrity_filter/velocity_config.py`, reducing `CROSS_POST_VELOCITY_LIMIT` from 5 to 2 posts/min. Simultaneously, `tier_exemptions.py` was updated to remove "superstar" from `EXEMPT_TIERS`.\n\nWhen Taylor Swift\'s team published across FB + IG + WhatsApp at 13:05 UTC, the velocity filter immediately triggered. 47 posts were placed in the integrity hold queue. Distribution SLI dropped within 30 seconds of the hold being applied.\n\nWhatsApp was unaffected because it uses a separate content pipeline that doesn\'t share the cross-posting velocity filter.',
    quickActions: [
      { id: 'next-steps', label: 'What should we do next?' },
    ],
  },
  'next-steps': {
    content:
      "Based on the confirmed root cause, here's the recommended action plan:\n\n1. **Immediate**: Add Superstar Creator tier back to the exemption allowlist in the velocity filter\n2. **Immediate**: Manually release the 47 held posts from the integrity review queue\n3. **Short-term**: Set up proactive monitoring for high-profile creator launches\n4. **Follow-up**: File a task to audit all integrity filter tier exemptions to prevent similar gaps\n\nThe first two actions should restore distribution within ~30 minutes of deployment.",
    quickActions: [
      { id: 'summarize-tree', label: 'Summarize again' },
    ],
  },
}

function ChatPanel({ selectedNode }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, isThinking])

  const addAssistantReply = async (response) => {
    setIsThinking(true)
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000))
    setIsThinking(false)
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: 'assistant', ...response },
    ])
  }

  const handleQuickAction = (actionId) => {
    const response = CANNED_RESPONSES[actionId]
    if (response) addAssistantReply(response)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', content: text },
    ])

    const nodeContext = selectedNode
      ? `You're currently viewing the "${selectedNode.label || selectedNode.fullTitle || selectedNode.type}" node. `
      : ''

    addAssistantReply({
      content: `${nodeContext}I can investigate that further. What specific aspect would you like me to focus on?`,
      quickActions: [
        { id: 'summarize-tree', label: 'Summarize findings' },
        { id: 'next-steps', label: 'Recommended actions' },
      ],
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in" style={{ opacity: 0, animationDelay: '0.05s' }}>
            {msg.role === 'user' ? (
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <OpsmateLogo className="w-5 h-5 text-gray-900" />
                  <span className="text-sm font-medium text-gray-900">Opsmate</span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-3">
                  {msg.content}
                </div>
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-2">
                    {msg.quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isThinking}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="animate-fade-in" style={{ opacity: 0, animationDelay: '0.05s' }}>
            <div className="flex items-center gap-2 mb-2">
              <OpsmateLogo className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Opsmate</span>
            </div>
            <span className="text-sm text-gray-400 shimmer-text">Thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask about the investigation..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-2 rounded-full transition-colors ${
                input.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// T3HypothesisTree — main view component
// ---------------------------------------------------------------------------

export default function T3HypothesisTree({ investigation }) {
  const treeData = useMemo(() => buildTree(investigation), [investigation])
  const [selectedNodeId, setSelectedNodeId] = useState('symptoms')
  const [rightTab, setRightTab] = useState('evidence')

  const nodeRefs = useRef({})
  const contentRef = useRef(null)
  const [paths, setPaths] = useState([])

  const allNodes = useMemo(() => {
    const nodes = []
    nodes.push({ id: 'symptoms', type: 'symptoms' })
    treeData.hypotheses.forEach((h) => {
      nodes.push(h)
      h.evidence.forEach((text, i) => {
        nodes.push({
          id: `${h.id}-ev-${i}`,
          type: 'evidence',
          text,
          evidenceIndex: i,
          parentId: h.id,
          parentStatus: h.status,
          parentLabel: h.fullTitle,
        })
      })
    })
    if (treeData.rootCause) nodes.push(treeData.rootCause)
    nodes.push(treeData.mitigation)
    return nodes
  }, [treeData])

  const selectedNode = allNodes.find((n) => n.id === selectedNodeId) || allNodes[0]

  const confirmedId = treeData.hypotheses.find((h) => h.status === 'confirmed')?.id

  const edges = useMemo(() => {
    const e = []
    treeData.hypotheses.forEach((h) => e.push({ from: 'symptoms', to: h.id }))
    if (confirmedId && treeData.rootCause) e.push({ from: confirmedId, to: 'root-cause' })
    if (treeData.rootCause) e.push({ from: 'root-cause', to: 'mitigation' })
    return e
  }, [treeData, confirmedId])

  const updatePaths = useCallback(() => {
    const container = contentRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()

    const newPaths = edges
      .map((edge) => {
        const fromEl = nodeRefs.current[edge.from]
        const toEl = nodeRefs.current[edge.to]
        if (!fromEl || !toEl) return null

        const fromRect = fromEl.getBoundingClientRect()
        const toRect = toEl.getBoundingClientRect()

        const x1 = fromRect.left + fromRect.width / 2 - containerRect.left
        const y1 = fromRect.top + fromRect.height - containerRect.top
        const x2 = toRect.left + toRect.width / 2 - containerRect.left
        const y2 = toRect.top - containerRect.top

        const midY = (y1 + y2) / 2
        const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`

        const isHighlighted =
          edge.to === confirmedId || edge.from === confirmedId || edge.to === 'mitigation'

        return { d, key: `${edge.from}-${edge.to}`, highlighted: isHighlighted }
      })
      .filter(Boolean)

    setPaths(newPaths)
  }, [edges, confirmedId])

  useEffect(() => {
    const timer = setTimeout(updatePaths, 60)
    const observer = new ResizeObserver(() => updatePaths())
    if (contentRef.current) observer.observe(contentRef.current)
    window.addEventListener('resize', updatePaths)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('resize', updatePaths)
    }
  }, [updatePaths])

  const setNodeRef = useCallback(
    (id) => (el) => {
      nodeRefs.current[id] = el
    },
    [],
  )

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* -------- Left Pane: Tree -------- */}
      <div className="flex-1 overflow-auto">
        <div ref={contentRef} className="relative min-h-full">
          {/* SVG connector layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {paths.map((p) => (
              <path
                key={p.key}
                d={p.d}
                fill="none"
                stroke={p.highlighted ? '#f87171' : '#d1d5db'}
                strokeWidth={p.highlighted ? 2 : 1.5}
                strokeDasharray={p.highlighted ? 'none' : '4 3'}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* Tree levels */}
          <div className="relative z-10 flex flex-col items-center gap-14 py-10 px-6">
            {/* Header */}
            <div className="text-center">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                {investigation.id}
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mt-1">{investigation.title}</h2>
            </div>

            {/* Level 0 — Observed Symptoms */}
            <TreeNode
              node={{ id: 'symptoms', type: 'symptoms' }}
              isSelected={selectedNodeId === 'symptoms'}
              onClick={() => setSelectedNodeId('symptoms')}
              nodeRef={setNodeRef('symptoms')}
            />

            {/* Level 1 — Hypotheses */}
            <div className="flex items-start gap-6">
              {treeData.hypotheses.map((h) => (
                <TreeNode
                  key={h.id}
                  node={h}
                  isSelected={selectedNodeId === h.id}
                  onClick={() => setSelectedNodeId(h.id)}
                  nodeRef={setNodeRef(h.id)}
                />
              ))}
            </div>

            {/* Level 2 — Root Cause */}
            {treeData.rootCause && (
              <TreeNode
                node={treeData.rootCause}
                isSelected={selectedNodeId === 'root-cause'}
                onClick={() => setSelectedNodeId('root-cause')}
                nodeRef={setNodeRef('root-cause')}
              />
            )}

            {/* Level 3 — Mitigation */}
            <TreeNode
              node={treeData.mitigation}
              isSelected={selectedNodeId === 'mitigation'}
              onClick={() => setSelectedNodeId('mitigation')}
              nodeRef={setNodeRef('mitigation')}
            />
          </div>
        </div>
      </div>

      {/* -------- Right Pane: Evidence / Chat -------- */}
      <div className="w-[420px] border-l border-gray-200 bg-white flex flex-col overflow-hidden shrink-0">
        {/* Tab bar */}
        <div className="flex border-b border-gray-200 bg-gray-50/50 shrink-0">
          {[
            { id: 'evidence', label: 'Evidence' },
            { id: 'chat', label: 'Chat' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRightTab(tab.id)}
              className={`flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                rightTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {rightTab === 'evidence' ? (
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <EvidencePanel selectedNode={selectedNode} treeData={treeData} />
          </div>
        ) : (
          <ChatPanel selectedNode={selectedNode} />
        )}
      </div>
    </div>
  )
}
