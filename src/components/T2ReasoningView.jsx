import { useState, useEffect, useRef, useCallback } from 'react'
import { AlertTriangle, Activity, Database, FileText, Shield, ArrowUp, ArrowRight, GitCompare, Clock, Server, MessageCircle } from 'lucide-react'
import ReasoningBlock from './ReasoningBlock'
import KnowledgeBadge from './KnowledgeBadge'
import ChartPreview from './ChartPreview'
import ChartCanvas from './ChartCanvas'

const CHART_DATA = {
  reachTimeline: {
    title: 'Creator Reach Over Time',
    subtitle: 'Hourly reach % for Superstar Creator tier — last 24h',
    type: 'line',
    xAxisKey: 'time',
    dataKeys: ['reach', 'baseline'],
    referenceLine: { x: '13:00', label: 'Publish event' },
    data: [
      { time: '08:00', reach: 97, baseline: 95 },
      { time: '09:00', reach: 96, baseline: 95 },
      { time: '10:00', reach: 98, baseline: 95 },
      { time: '11:00', reach: 97, baseline: 95 },
      { time: '12:00', reach: 96, baseline: 95 },
      { time: '13:00', reach: 94, baseline: 95 },
      { time: '13:15', reach: 72, baseline: 95 },
      { time: '13:30', reach: 61, baseline: 95 },
      { time: '14:00', reach: 58, baseline: 95 },
      { time: '14:30', reach: 55, baseline: 95 },
      { time: '15:00', reach: 53, baseline: 95 },
      { time: '16:00', reach: 56, baseline: 95 },
      { time: '17:00', reach: 58, baseline: 95 },
    ],
  },
  holdQueue: {
    title: 'Integrity Hold Queue Volume',
    subtitle: 'Posts held by velocity filter — hourly buckets',
    type: 'bar',
    xAxisKey: 'time',
    dataKeys: ['held', 'released'],
    referenceLine: { x: '13:00', label: 'Filter triggered' },
    data: [
      { time: '08:00', held: 0, released: 0 },
      { time: '09:00', held: 1, released: 1 },
      { time: '10:00', held: 0, released: 0 },
      { time: '11:00', held: 1, released: 1 },
      { time: '12:00', held: 0, released: 0 },
      { time: '13:00', held: 47, released: 0 },
      { time: '14:00', held: 3, released: 12 },
      { time: '15:00', held: 0, released: 18 },
      { time: '16:00', held: 0, released: 17 },
      { time: '17:00', held: 0, released: 0 },
    ],
  },
  distributionSLI: {
    title: 'Distribution SLI Timeline',
    subtitle: 'Distribution score and hold rate during the incident window',
    type: 'area',
    xAxisKey: 'time',
    dataKeys: ['distributionScore', 'holdRate'],
    referenceLine: { x: '13:05', label: 'Album published' },
    data: [
      { time: '12:00', distributionScore: 0.94, holdRate: 0.02 },
      { time: '12:15', distributionScore: 0.95, holdRate: 0.01 },
      { time: '12:30', distributionScore: 0.93, holdRate: 0.02 },
      { time: '12:45', distributionScore: 0.94, holdRate: 0.01 },
      { time: '13:00', distributionScore: 0.93, holdRate: 0.03 },
      { time: '13:05', distributionScore: 0.78, holdRate: 0.31 },
      { time: '13:15', distributionScore: 0.65, holdRate: 0.42 },
      { time: '13:30', distributionScore: 0.61, holdRate: 0.38 },
      { time: '13:45', distributionScore: 0.59, holdRate: 0.35 },
      { time: '14:00', distributionScore: 0.58, holdRate: 0.33 },
      { time: '14:15', distributionScore: 0.57, holdRate: 0.31 },
      { time: '14:30', distributionScore: 0.60, holdRate: 0.22 },
      { time: '15:00', distributionScore: 0.65, holdRate: 0.12 },
    ],
  },
}

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

function TypeWriter({ text, speed = 15, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const idxRef = useRef(0)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    idxRef.current = 0
    setDisplayed('')
    const timer = setInterval(() => {
      idxRef.current += 1
      if (idxRef.current >= text.length) {
        setDisplayed(text)
        clearInterval(timer)
        completeRef.current?.()
      } else {
        setDisplayed(text.slice(0, idxRef.current))
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return <span>{displayed}<span className="opacity-40 animate-pulse">|</span></span>
}

function ThinkingIndicator({ label = 'Opsmate is thinking...' }) {
  return (
    <div className="flex gap-3 animate-fade-in mb-6">
      <div className="flex-shrink-0 w-4 h-4 mt-0.5">
        <OpsmateLogo className="w-4 h-4 text-gray-900" />
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900 mb-1.5">Opsmate</div>
        <span className="text-sm shimmer-text">{label}</span>
      </div>
    </div>
  )
}

function EvidenceCard({ icon: Icon, iconBg, title, subtitle, value, delta, valueColor, tag }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 mt-2">
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
        <Icon size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-gray-900 truncate">{title}</span>
          {tag && <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${tag.color}`}>{tag.label}</span>}
        </div>
        <div className="text-[12px] text-gray-500 mt-0.5">{subtitle}</div>
        {value && (
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className={`text-lg font-semibold ${valueColor || 'text-gray-900'}`}>{value}</span>
            {delta && <span className={`text-[12px] font-medium ${valueColor || 'text-gray-500'}`}>{delta}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

function Message({ children, typing, onTypingComplete }) {
  return (
    <div className="flex gap-3 mb-6 animate-fade-in">
      <div className="flex-shrink-0 w-4 h-4 mt-0.5">
        <OpsmateLogo className="w-4 h-4 text-gray-900" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 mb-2">Opsmate</div>
        <div className="text-[15px] text-gray-700 leading-relaxed space-y-3">
          {typing ? (
            <p><TypeWriter text={typing} speed={15} onComplete={onTypingComplete} /></p>
          ) : children}
        </div>
      </div>
    </div>
  )
}

const SCRIPT = [
  // 1. Opening high-level
  {
    id: 'intro',
    text: `I'm detecting an anomaly on creator distribution reach. Let me run a full analysis — I'll pull relevant alerts, metrics, deployment history, and cross-reference with recent incidents. This may take a moment.`,
    pause: 10000,
    thinkingLabel: 'Opsmate is planning...',
  },
  // 2. First evidence: alert
  {
    id: 'alert-1',
    text: `Found a firing alert on creator_reach_baseline_low — reach dropped below the 60% SLO baseline.`,
    card: {
      icon: AlertTriangle, iconBg: 'bg-red-100 text-red-600',
      title: 'creator_reach_baseline_low (ALRT-40291)',
      subtitle: '#creator-alerts-prod — triggered 4h ago',
      value: '58%', delta: '-42% from baseline', valueColor: 'text-red-600',
      tag: { label: 'FIRING', color: 'bg-red-100 text-red-700' },
    },
    pause: 3000,
  },
  // 3. Second alert
  {
    id: 'alert-2',
    text: `There's a correlated alert on Instagram distribution score — it fell sharply after a content publish event.`,
    card: {
      icon: Activity, iconBg: 'bg-purple-100 text-purple-600',
      title: 'ig_distribution_score_critical (ALRT-40293)',
      subtitle: '#ig-distribution-alerts — triggered 3.5h ago',
      value: '0.61', delta: '-35% from baseline', valueColor: 'text-red-600',
      tag: { label: 'FIRING', color: 'bg-red-100 text-red-700' },
    },
    pause: 2500,
  },
  // 4. Third alert
  {
    id: 'alert-3',
    text: `Integrity hold rate is way above normal — spiked to 3.1x baseline right at the moment of publish.`,
    card: {
      icon: Shield, iconBg: 'bg-amber-100 text-amber-600',
      title: 'integrity_false_positive_spike (ALRT-40295)',
      subtitle: '#integrity-alerts — triggered 3h ago',
      value: '3.1x', delta: '+210% from baseline', valueColor: 'text-amber-600',
      tag: { label: 'WARNING', color: 'bg-amber-100 text-amber-700' },
    },
    pause: 3500,
  },
  // 5. Scuba datasets
  {
    id: 'datasets',
    text: `I pulled three Scuba datasets to cross-reference the timeline and identify the affected surface areas.`,
    card: {
      icon: Database, iconBg: 'bg-indigo-100 text-indigo-600',
      title: '3 Datasets Loaded',
      subtitle: 'creator_distribution_metrics_raw, ts_post_reach_hourly, content_integrity_signals_v2',
    },
    extras: 'datasets',
    pause: 3000,
  },
  // 6. Recent diffs
  {
    id: 'diffs',
    text: `Checked deployment history — found 3 diffs in the blast radius that touched integrity or distribution pipelines.`,
    card: {
      icon: GitCompare, iconBg: 'bg-orange-100 text-orange-600',
      title: '3 Relevant Diffs',
      subtitle: 'D892341 (locale routing, 3d ago), D984521 (integrity thresholds, 18h ago), D918203 (CDN routing, 5d ago)',
    },
    pause: 3000,
  },
  // 7. Similar SEV
  {
    id: 'similar-sev',
    text: `Found a similar incident from 3 weeks ago with the same integrity filter path involved.`,
    card: {
      icon: FileText, iconBg: 'bg-gray-100 text-gray-600',
      title: 'S541892 — Drake content hold',
      subtitle: 'Simultaneous multi-platform release triggered same velocity filter — resolved by adding exemption',
      tag: { label: 'RELATED', color: 'bg-blue-50 text-blue-600' },
    },
    pause: 3000,
  },
  // 8. Integrity hold queue
  {
    id: 'hold-queue',
    text: `Queried the integrity hold queue directly — 47 posts held for this creator, all flagged by the cross-posting velocity filter from D984521. Hold timestamps align exactly with the SLI drop.`,
    card: {
      icon: Server, iconBg: 'bg-red-100 text-red-600',
      title: 'Integrity Hold Queue',
      subtitle: '47 posts held — all triggered by velocity filter, Superstar Creator tier missing from exemption allowlist',
      value: '47', delta: 'posts held', valueColor: 'text-red-600',
    },
    extras: 'hold-queue',
    pause: 4000,
    thinkingLabel: 'Opsmate is identifying root cause...',
  },
  // 9. Root cause
  {
    id: 'root-cause',
    text: null,
    extras: 'root-cause',
    pause: 2500,
  },
  // 10. Next steps
  {
    id: 'next-steps',
    text: null,
    extras: 'next-steps',
  },
]

export default function T2ReasoningView({ investigation }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showThinking, setShowThinking] = useState(false)
  const [thinkingLabel, setThinkingLabel] = useState('Opsmate is thinking...')
  const [userMessages, setUserMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isUserThinking, setIsUserThinking] = useState(false)
  const [expandedChart, setExpandedChart] = useState(null)
  const timeoutsRef = useRef([])
  const bottomRef = useRef(null)

  const hypotheses = investigation.sections.filter(s => s.type === 'hypothesis-card')
  const rootCause = investigation.sections.find(s => s.type === 'root-cause-detail')
  const execSummary = investigation.sections.find(s => s.type === 'hypothesis')

  const schedule = useCallback((fn, delay) => {
    const t = setTimeout(fn, delay)
    timeoutsRef.current.push(t)
    return t
  }, [])

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 100)
    return () => clearTimeout(t)
  }, [visibleCount, showThinking, isTyping, userMessages.length, isUserThinking])

  useEffect(() => {
    schedule(() => {
      setVisibleCount(1)
      setIsTyping(true)
    }, 500)
  }, [schedule])

  const advanceToNext = useCallback(() => {
    const currentStep = SCRIPT[visibleCount - 1]
    if (!currentStep) return

    if (currentStep.pause && visibleCount < SCRIPT.length) {
      setShowThinking(true)
      setThinkingLabel(currentStep.thinkingLabel || 'Opsmate is thinking...')
      schedule(() => {
        setShowThinking(false)
        setVisibleCount(v => v + 1)
        setIsTyping(true)
      }, currentStep.pause)
    }
  }, [visibleCount, schedule])

  const handleTypingComplete = useCallback(() => {
    setIsTyping(false)
    advanceToNext()
  }, [advanceToNext])

  // For steps with no text (static content), auto-advance after render
  useEffect(() => {
    if (visibleCount === 0) return
    const currentStep = SCRIPT[visibleCount - 1]
    if (currentStep && currentStep.text === null && !isTyping) {
      advanceToNext()
    }
  }, [visibleCount, isTyping, advanceToNext])

  const handleSend = useCallback(() => {
    const text = inputValue.trim()
    if (!text || isUserThinking) return
    setUserMessages(prev => [...prev, { id: `user-${Date.now()}`, type: 'user', text }])
    setInputValue('')
    setIsUserThinking(true)
    schedule(() => {
      const lower = text.toLowerCase()
      let reply
      let chart = null
      if (lower.includes('whatsapp')) {
        reply = 'WhatsApp uses a separate content processing pipeline that does not share the cross-posting velocity filter, which is why it was unaffected during this incident.'
      } else if (lower.includes('rollback') || lower.includes('fix') || lower.includes('revert')) {
        reply = 'I would recommend rolling back D984521 to restore the original velocity threshold of 5 posts/minute, then adding Superstar Creator tier to the exemption allowlist before re-deploying the filter update.'
      } else if (lower.includes('drake') || lower.includes('similar')) {
        reply = 'The Drake incident (S541892) followed the same pattern — simultaneous multi-platform publish triggered the velocity filter. That SEV was resolved by adding a tier exemption, but the fix was overwritten when D984521 shipped with a fresh allowlist.'
      } else if (lower.includes('hold') || lower.includes('queue') || lower.includes('integrity')) {
        reply = 'Here\'s the integrity hold queue volume during the incident. You can see the massive spike at 13:00 UTC when the velocity filter triggered on 47 posts simultaneously.'
        chart = CHART_DATA.holdQueue
      } else if (lower.includes('distribution') || lower.includes('sli') || lower.includes('score')) {
        reply = 'Here\'s the distribution SLI alongside the hold rate during the incident window. The distribution score dropped sharply right after the album was published at 13:05 UTC.'
        chart = CHART_DATA.distributionSLI
      } else if (lower.includes('timeline') || lower.includes('when')) {
        reply = 'The album was published at approximately 13:05 UTC. Within 30 seconds, the velocity filter triggered holds on all 47 posts. Here\'s the full timeline view:'
        chart = CHART_DATA.distributionSLI
      } else if (lower.includes('metric') || lower.includes('chart') || lower.includes('graph') || lower.includes('reach') || lower.includes('trend') || lower.includes('show')) {
        reply = 'Here\'s the creator reach timeline over the last 24 hours. You can see the sharp decline starting at the publish event around 13:00 UTC, dropping from 94% to 58% within an hour.'
        chart = CHART_DATA.reachTimeline
      } else {
        reply = 'The root cause is the integrity filter update D984521, which reduced cross-posting velocity limits from 5 to 2 posts/minute without exempting Superstar Creator tier accounts. I can dig deeper into any specific aspect — the deployment history, hold queue details, or mitigation options.'
      }
      setUserMessages(prev => [...prev, { id: `reply-${Date.now()}`, type: 'assistant', text: reply, chart }])
      setIsUserThinking(false)
    }, 2500)
  }, [inputValue, isUserThinking, schedule])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const visibleMessages = SCRIPT.slice(0, visibleCount)
  const isComplete = visibleCount >= SCRIPT.length && !isTyping && !showThinking

  const chatContent = (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className={`mx-auto px-6 py-10 pb-32 ${expandedChart ? 'max-w-full' : 'max-w-[720px]'}`}>

          {/* Header */}
          <div className="mb-10 pb-6 border-b border-gray-100">
            <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
              {investigation.id}
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              {investigation.title}
            </h1>
          </div>

          {/* Chat messages */}
          {visibleMessages.map((step, i) => {
            const isLast = i === visibleMessages.length - 1
            const shouldType = isLast && isTyping && step.text

            // Root cause: static block
            if (step.extras === 'root-cause') {
              return (
                <Message key={step.id}>
                  <p><strong>Root cause identified — high confidence.</strong></p>
                  <p>{rootCause?.content.summary}</p>

                  {/* Plan */}
                  <ReasoningBlock title="Plan">
                    <p className="text-[14px] text-gray-600 mb-3">
                      Based on the evidence collected, Opsmate investigated this incident in three stages:
                    </p>
                    <div className="space-y-2">
                      <div className="flex gap-2 text-[13px] text-gray-600 p-2 rounded-lg bg-gray-50 border border-gray-100">
                        <span className="text-gray-400 font-mono flex-shrink-0">1.</span>
                        <span><strong>Gather evidence</strong> — Pulled SLI metrics, integrity pipeline logs, and distribution traces from the incident window.</span>
                      </div>
                      <div className="flex gap-2 text-[13px] text-gray-600 p-2 rounded-lg bg-gray-50 border border-gray-100">
                        <span className="text-gray-400 font-mono flex-shrink-0">2.</span>
                        <span><strong>Correlate signals</strong> — Cross-referenced the creator reach drop with recent config changes and integrity hold-queue spikes.</span>
                      </div>
                      <div className="flex gap-2 text-[13px] text-gray-600 p-2 rounded-lg bg-gray-50 border border-gray-100">
                        <span className="text-gray-400 font-mono flex-shrink-0">3.</span>
                        <span><strong>Generate &amp; test hypotheses</strong> — Evaluated three candidate root causes against the evidence.</span>
                      </div>
                    </div>
                  </ReasoningBlock>

                  {/* Hypotheses tested */}
                  {hypotheses.map((hyp) => {
                    const isConfirmed = hyp.content.status === 'confirmed'
                    const title = hyp.title.replace(/^Hypothesis \d+: /, '')
                    return (
                      <ReasoningBlock key={hyp.id} title={`${title} — ${isConfirmed ? 'Confirmed' : 'Ruled Out'}`}>
                        <p className="text-[14px] text-gray-600 mb-2">{hyp.content.rationale}</p>
                        <div className="space-y-1.5 mt-2">
                          {hyp.content.evidence.map((item, ei) => (
                            <div key={ei} className="flex gap-2 text-[13px] text-gray-600 p-2 rounded-lg bg-gray-50 border border-gray-100">
                              <span className="text-gray-300 flex-shrink-0 mt-0.5">-</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </ReasoningBlock>
                    )
                  })}

                  {rootCause?.content.details?.map((detail, di) => (
                    <ReasoningBlock key={di} title={detail.heading}>
                      <p className="text-[14px] text-gray-600">{detail.text}</p>
                    </ReasoningBlock>
                  ))}
                  <ReasoningBlock title="Affected systems">
                    <div className="flex flex-wrap gap-2">
                      {rootCause?.content.affectedSystems?.map((sys, si) => (
                        <span key={si} className="px-2.5 py-1 rounded-md bg-red-50 border border-red-100 text-[13px] font-mono text-red-600">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </ReasoningBlock>
                </Message>
              )
            }

            // Next steps: static block
            if (step.extras === 'next-steps') {
              return (
                <Message key={step.id}>
                  <p><strong>Recommended next steps:</strong></p>
                  <ol className="space-y-2 mt-2">
                    {execSummary?.content.nextSteps?.map((s) => (
                      <li key={s.id} className="flex gap-2 text-[14px] text-gray-600">
                        <span className="text-gray-400 font-mono flex-shrink-0">{s.id}.</span>
                        {s.text}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-[14px] text-blue-800">
                      <strong>Confidence: High</strong> — Root cause confirmed through integrity hold queue
                      audit, deployment changelog correlation, and distribution SLI timeline analysis.
                    </p>
                  </div>
                </Message>
              )
            }

            return (
              <div key={step.id}>
                <Message
                  typing={shouldType ? step.text : null}
                  onTypingComplete={shouldType ? handleTypingComplete : undefined}
                >
                  <p>{step.text}</p>

                  {/* Evidence card below the message text */}
                  {step.card && (
                    <EvidenceCard {...step.card} />
                  )}

                  {/* Extra reasoning inside expandable blocks */}
                  {step.extras === 'datasets' && (
                    <ReasoningBlock title="Dataset details">
                      <KnowledgeBadge sources={[
                        'creator_distribution_metrics_raw — Hourly reach and distribution scores per creator per platform',
                        'ts_post_reach_hourly — Taylor Swift specific post-level reach tracking cube',
                        'content_integrity_signals_v2 — Integrity filter decisions and hold rates for creator content',
                      ]} />
                    </ReasoningBlock>
                  )}
                  {step.extras === 'hold-queue' && (
                    <ReasoningBlock title="Hold queue analysis">
                      <p className="text-[14px] text-gray-600 mb-2">
                        All 47 holds triggered by the cross-posting velocity filter introduced in D984521. The velocity threshold was reduced from 5 to 2 posts/minute, and Superstar Creator tier was missing from the exemption allowlist.
                      </p>
                      <p className="text-[14px] text-gray-600">
                        Ruled out locale routing (D892341 — no config change for this tier) and CDN cache invalidation (D918203 — 100% edge propagation confirmed). The integrity filter is the confirmed cause.
                      </p>
                    </ReasoningBlock>
                  )}
                </Message>
              </div>
            )
          })}

          {/* Thinking indicator — always pushed to the bottom */}
          {showThinking && <ThinkingIndicator label={thinkingLabel} />}

          {/* Suggested follow-ups */}
          {isComplete && userMessages.length === 0 && (
            <div className="mb-6 animate-fade-in">
              <div className="text-[13px] font-medium text-gray-400 mb-2">Suggested follow-ups</div>
              <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                {[
                  'Why was WhatsApp unaffected by the integrity filter?',
                  'Show me the full deployment timeline for D984521.',
                  'What safeguards should we add to prevent this from recurring?',
                ].map((text, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(text)
                      setTimeout(() => {
                        setUserMessages(prev => [...prev, { id: `user-${Date.now()}`, type: 'user', text }])
                        setInputValue('')
                        setIsUserThinking(true)
                        const lower = text.toLowerCase()
                        schedule(() => {
                          let reply
                          if (lower.includes('whatsapp')) {
                            reply = 'WhatsApp uses a separate content processing pipeline that does not share the cross-posting velocity filter, which is why it was unaffected during this incident.'
                          } else if (lower.includes('timeline') || lower.includes('deployment')) {
                            reply = 'D984521 was authored on Feb 23, landed on Feb 24 at 19:32 UTC, and propagated to prod by 20:15 UTC — approximately 18 hours before the album publish at 13:05 UTC on Feb 25. The diff modified velocity thresholds in the integrity filter pipeline without updating the Superstar Creator tier exemption allowlist.'
                          } else {
                            reply = 'To prevent recurrence, I recommend: (1) adding tier-aware validation to the integrity filter CI pipeline so threshold changes are tested against high-profile creator posting patterns, (2) creating a pre-launch checklist for major creator releases that verifies filter exemptions, and (3) setting up canary alerts on hold-rate spikes scoped to Superstar Creator tier accounts.'
                          }
                          setUserMessages(prev => [...prev, { id: `reply-${Date.now()}`, type: 'assistant', text: reply }])
                          setIsUserThinking(false)
                        }, 2500)
                      }, 0)
                    }}
                    className="flex items-center gap-3 w-full py-3 px-1 text-left group hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle size={16} className="text-gray-300 flex-shrink-0" />
                    <span className="flex-1 text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">{text}</span>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User messages */}
          {userMessages.map((msg) => (
            msg.type === 'user' ? (
              <div key={msg.id} className="flex justify-end mb-6 animate-fade-in">
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-action-primary text-white text-[15px]">
                  {msg.text}
                </div>
              </div>
            ) : (
              <Message key={msg.id}>
                <p>{msg.text}</p>
                {msg.chart && (
                  <ChartPreview
                    chart={msg.chart}
                    onExpand={() => setExpandedChart(msg.chart)}
                  />
                )}
              </Message>
            )
          ))}

          {isUserThinking && <ThinkingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="flex-shrink-0 bg-white px-6 py-3">
        <div className={`mx-auto ${expandedChart ? 'max-w-full' : 'max-w-[720px]'}`}>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-action-primary focus-within:ring-1 focus-within:ring-action-primary/20 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Opsmate a follow-up question..."
              className="flex-1 bg-transparent text-[15px] text-gray-700 placeholder-gray-400 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isUserThinking}
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                inputValue.trim() && !isUserThinking
                  ? 'bg-action-primary text-white hover:bg-action-hover'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="h-full flex bg-white">
      {expandedChart && (
        <div className="w-[60%] border-r border-gray-200 flex flex-col min-h-0">
          <ChartCanvas chart={expandedChart} onClose={() => setExpandedChart(null)} />
        </div>
      )}
      <div className={`flex flex-col min-h-0 transition-all duration-300 ease-out ${expandedChart ? 'w-[40%]' : 'w-full'}`}>
        {chatContent}
      </div>
    </div>
  )
}
