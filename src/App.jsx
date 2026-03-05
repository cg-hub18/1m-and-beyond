import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Copilot from './components/Copilot'
import SourcesPanel from './components/SourcesPanel'
import StepsPanel from './components/StepsPanel'
import ShareModal from './components/ShareModal'
import Toast from './components/Toast'
import LeftNav from './components/LeftNav'
import VersionBar from './components/VersionBar'
import T2ReasoningView from './components/T2ReasoningView'
import T3HypothesisTree from './components/T3HypothesisTree'

function App() {
  const [showSources, setShowSources] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isReadOnlySharedMode, setIsReadOnlySharedMode] = useState(false)
  const [sharedSectionsFromUrl, setSharedSectionsFromUrl] = useState(null)
  const [sharedTitleFromUrl, setSharedTitleFromUrl] = useState(null)
  const [sharedIsBranch, setSharedIsBranch] = useState(false)
  const [sections, setSections] = useState([])
  const [promotedSections, setPromotedSections] = useState([])
  const [activeCanvasTab, setActiveCanvasTab] = useState('shared')
  const [toast, setToast] = useState({ isOpen: false, title: '', message: '' })
  const [stepsToShow, setStepsToShow] = useState(null)
  const [isCreatingBranch, setIsCreatingBranch] = useState(false)
  const [activeBranchId, setActiveBranchId] = useState(null)
  const [hasNavNotification, setHasNavNotification] = useState(false)
  const [analyses, setAnalyses] = useState([
    { id: 'analysis-1', title: 'Shared Investigation', isNew: false, branches: [] }
  ])
  const [activeAnalysisId, setActiveAnalysisId] = useState('analysis-1')
  const [activeVersion, setActiveVersion] = useState('T1')
  const [t2Key, setT2Key] = useState(0)
  const handleVersionChange = (v) => {
    if (v === 'T2') setT2Key(k => k + 1)
    setActiveVersion(v)
  }
  const copilotRef = useRef(null)

  // Handle paste (Cmd+V) to paste copied widgets
  useEffect(() => {
    const handlePaste = async (e) => {
      // Don't paste in read-only mode
      if (isReadOnlySharedMode) return
      
      try {
        const clipboardText = await navigator.clipboard.readText()
        const data = JSON.parse(clipboardText)
        
        if (data.type === 'opsmate-widget' && data.section) {
          e.preventDefault()
          
          const newSection = {
            ...data.section,
            id: `pasted-${Date.now()}`,
          }
          
          // If on a branch, add to that branch's sections
          if (activeBranchId) {
            setAnalyses(prev => prev.map(analysis => {
              if (analysis.id !== activeAnalysisId) return analysis
              return {
                ...analysis,
                branches: analysis.branches.map(branch => {
                  if (branch.id !== activeBranchId) return branch
                  return {
                    ...branch,
                    sections: [...branch.sections, newSection]
                  }
                })
              }
            }))
          } else {
            // On shared canvas - for analysis-1 use promotedSections, for others add to their sections
            if (activeAnalysisId === 'analysis-1') {
              setPromotedSections(prev => [...prev, newSection])
            } else {
              setAnalyses(prev => prev.map(analysis => 
                analysis.id === activeAnalysisId 
                  ? { ...analysis, sections: [...(analysis.sections || []), newSection] }
                  : analysis
              ))
            }
          }
          
          setToast({
            isOpen: true,
            title: 'Widget Pasted',
            message: `${newSection.title} has been added to your canvas`,
          })
        }
      } catch {
        // Not valid JSON or not an Opsmate widget - ignore
      }
    }
    
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [activeBranchId, activeAnalysisId, isReadOnlySharedMode])

  // Detect if viewing via shared link (read-only mode)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedId = params.get('shared')
    const encodedData = params.get('data')
    
    if (sharedId) {
      setIsReadOnlySharedMode(true)
      
      if (encodedData) {
        try {
          const decoded = decodeURIComponent(atob(encodedData))
          const sharedData = JSON.parse(decoded)
          
          if (sharedData.sections) {
            setSharedSectionsFromUrl(sharedData.sections)
            setSharedTitleFromUrl(sharedData.title || null)
            setSharedIsBranch(sharedData.isBranch || false)
          } else {
            setSharedSectionsFromUrl(sharedData)
          }
        } catch (err) {
          console.error('Failed to decode shared data:', err)
        }
      }
      
      if (sharedId.startsWith('branch-')) {
        setActiveBranchId(sharedId)
        setActiveCanvasTab('personal')
      }
    }
  }, [])

  const handleTriggerProactiveRun = () => {
    // Update the investigation sections with new lorem ipsum content
    setInvestigation(prev => ({
      ...prev,
      sections: [
        {
          id: 'hypothesis',
          type: 'hypothesis',
          title: 'Executive Summary',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: true,
          content: {
            whatHappened: 'A follow-up analysis detected additional distribution anomalies affecting Taylor Swift content across secondary surfaces including Reels and Stories. The integrity filter rollback partially restored reach but residual holds remain in the queue.',
            keyFindings: {
              items: [
                {
                  text: 'Reels reach SLI recovered to 78% after rollback, tracked by',
                  source: { id: 'A', color: 'green', label: 'reels_reach_recovery_monitor', preview: { title: 'Reels Reach SLI', value: '78%', delta: '+24%', status: 'recovering', sparkline: [54, 55, 58, 62, 68, 72, 76, 78] } },
                },
                {
                  text: 'Stories reach SLI remains at 54% — still breaching threshold per',
                  source: { id: 'B', color: 'red', label: 'creator_stories_reach_low', preview: { title: 'Stories Reach SLI', value: '54%', delta: '-46%', status: 'critical', sparkline: [95, 90, 82, 70, 62, 58, 55, 54] } },
                },
                { text: '12 posts still held in integrity review queue — no SLI breach but manual release pending' },
              ],
              relatedAlert: {
                name: 'creator-stories-reach < 55% baseline (prod)',
                startedAt: '4:02 PM',
                channel: '#creator-alerts-prod',
                alertKey: 'creator_stories_reach_low (ALRT-40305)',
                surfacedAgo: '1h ago',
                relatedCount: 1,
              },
              relatedDatasets: [
                { name: 'reels_distribution_hourly', description: 'Reels-specific distribution and reach metrics' },
                { name: 'stories_pipeline_signals', description: 'Stories pipeline processing and integrity decisions' },
              ],
            },
            rootCause: {
              confidence: 'High',
              description: 'The Stories pipeline uses a separate integrity check (D991034) that was not covered by the initial filter rollback [1]. This secondary filter shares the same cross-posting velocity logic but runs asynchronously [2], causing delayed holds that persist after the primary fix [3].',
              sources: [
                { id: 1, color: 'green', label: 'Stories pipeline config' },
                { id: 2, color: 'blue', label: 'Async filter traces' },
                { id: 3, color: 'red', label: 'Hold queue audit' },
              ],
            },
            nextSteps: [
              { id: 1, text: 'Apply the same filter rollback to the Stories integrity pipeline', completed: false },
              { id: 2, text: 'Manually release remaining 12 held posts from the queue', completed: false },
              { id: 3, text: 'Verify reach recovery across all surfaces within 1 hour', completed: false },
            ],
          },
        },
        {
          id: 'plan',
          type: 'plan',
          title: 'Plan',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: false,
          content: {},
        },
        {
          id: 'mitigation',
          type: 'mitigation',
          title: 'Mitigation',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: false,
          content: {
            summary: 'Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et.',
            linkedSev: 'S612847',
            actions: [
              { id: 1, text: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', completed: false },
              { id: 2, text: 'Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.', completed: false },
              { id: 3, text: 'Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit.', completed: false },
            ],
          },
        },
      ],
    }))
    
    // Mark the shared investigation as having new content
    setAnalyses(prev => prev.map(a => 
      a.id === 'analysis-1' ? { ...a, isNew: true } : a
    ))
    setHasNavNotification(true)
    
    setToast({
      isOpen: true,
      title: 'Proactive Run Complete',
      message: 'Investigation updated with new analysis',
    })
  }

  const handleSelectAnalysis = (analysisId) => {
    setActiveAnalysisId(analysisId)
    setActiveBranchId(null)
    setActiveCanvasTab('shared')
    setHasNavNotification(false)
    setIsNavOpen(false)
    
    setAnalyses(prev => prev.map(a => 
      a.id === analysisId ? { ...a, isNew: false } : a
    ))
  }

  const handleCreateBranch = async () => {
    setIsCreatingBranch(true)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const activeAnalysis = analyses.find(a => a.id === activeAnalysisId)
    const analysisBranches = activeAnalysis?.branches || []
    
    let sectionsToClone = []
    if (activeBranchId) {
      const currentBranch = analysisBranches.find(b => b.id === activeBranchId)
      sectionsToClone = currentBranch?.sections || []
    } else {
      sectionsToClone = activeAnalysisId === 'analysis-1' 
        ? [...investigation.sections, ...promotedSections]
        : (activeAnalysis?.sections || [])
    }
    
    const clonedSections = JSON.parse(JSON.stringify(sectionsToClone))
    
    const newBranch = {
      id: `branch-${Date.now()}`,
      name: `Opsmate Chat ${analysisBranches.length + 1}`,
      createdAt: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      }),
      sections: clonedSections,
    }
    
    setAnalyses(prev => prev.map(analysis => 
      analysis.id === activeAnalysisId 
        ? { ...analysis, branches: [...(analysis.branches || []), newBranch] }
        : analysis
    ))
    
    setActiveBranchId(newBranch.id)
    setActiveCanvasTab('personal')
    setIsCreatingBranch(false)
    
    setToast({
      isOpen: true,
      title: 'Branch Created',
      message: `${newBranch.name} has been created`,
    })
  }

  const handleSelectBranch = (branchId, analysisId) => {
    if (branchId === 'shared') {
      setActiveBranchId(null)
      setActiveCanvasTab('shared')
    } else {
      if (analysisId) {
        setActiveAnalysisId(analysisId)
      }
      setActiveBranchId(branchId)
      setActiveCanvasTab('personal')
    }
    setIsNavOpen(false)
  }

  const handleRenameBranch = (branchId, newName) => {
    setAnalyses(prev => prev.map(analysis => ({
      ...analysis,
      branches: analysis.branches.map(branch =>
        branch.id === branchId ? { ...branch, name: newName } : branch
      )
    })))
  }

  const handleRemoveSection = (section) => {
    // For analysis-1, remove from promotedSections; for others, remove from their sections array
    if (activeAnalysisId === 'analysis-1') {
      setPromotedSections(prev => prev.filter(s => s.id !== section.id))
    } else {
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === activeAnalysisId 
          ? { ...analysis, sections: (analysis.sections || []).filter(s => s.id !== section.id) }
          : analysis
      ))
    }
    
    setToast({
      isOpen: true,
      title: 'Removed from Canvas',
      message: `${section.title} has been removed`,
    })
  }

  const handleRemoveBranchSection = (section) => {
    setAnalyses(prev => prev.map(analysis => {
      if (analysis.id !== activeAnalysisId) return analysis
      return {
        ...analysis,
        branches: analysis.branches.map(branch => {
          if (branch.id !== activeBranchId) return branch
          return {
            ...branch,
            sections: branch.sections.filter(s => s.id !== section.id)
          }
        })
      }
    }))
    
    setToast({
      isOpen: true,
      title: 'Widget Removed',
      message: `${section.title} has been removed`,
    })
  }

  const [investigation, setInvestigation] = useState({
    id: 'S553136',
    title: 'Taylor Swift - Life of a Showgirl - Only In Polish',
    sections: [
      {
        id: 'hypothesis',
        type: 'hypothesis',
        title: 'Executive Summary',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: true,
        content: {
          whatHappened: 'Taylor Swift\'s "Life of a Showgirl" album announcement was posted simultaneously across Facebook, Instagram, and WhatsApp. Within minutes, unconnected distribution metrics dropped sharply and reach numbers diverged significantly from projected baselines. The Creator Forensics team had proactively filed T234502850 to monitor this release.',
          whatHappenedChart: {
            title: 'Creator Distribution Reach — All Platforms',
            width: 560, height: 126, paddingLeft: 46, paddingTop: 10, plotHeight: 91, yMax: 100,
            yLabels: [
              { value: 0, text: '0%' }, { value: 25, text: '25%' }, { value: 50, text: '50%' }, { value: 75, text: '75%' }, { value: 100, text: '100%' },
            ],
            threshold: { value: 60, label: '60% SLO' },
            xLabels: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
            annotation: { xIndex: 3, label: 'Album posted' },
            lines: [
              { label: 'Facebook', data: [91, 92, 93, 92, 74, 65, 60, 58, 57, 56, 55, 55], color: '#3b82f6', strokeWidth: 2 },
              { label: 'Instagram', data: [94, 93, 94, 93, 80, 71, 64, 61, 59, 58, 57, 57], color: '#a855f7', strokeWidth: 2 },
              { label: 'WhatsApp', data: [88, 89, 90, 89, 88, 87, 88, 89, 88, 87, 88, 88], color: '#22c55e', strokeWidth: 2 },
            ],
          },
          keyFindings: {
              items: [
                {
                  text: 'SLI for creator reach dropped below 60% threshold, triggering',
                  source: { id: 'A', color: 'red', label: 'creator_reach_baseline_low', preview: { title: 'Creator Reach SLI', value: '58%', delta: '-42%', status: 'critical', sparkline: [92, 88, 85, 74, 65, 60, 58, 58] } },
                  linkedSectionId: 'key-findings',
                  linkedLabel: 'See details',
                },
                {
                  text: 'Instagram distribution SLI fell from 0.94 to 0.61, correlated with',
                  source: { id: 'B', color: 'blue', label: 'ig_distribution_score_critical', preview: { title: 'IG Distribution Score', value: '0.61', delta: '-35%', status: 'critical', sparkline: [94, 93, 91, 85, 78, 70, 64, 61] } },
                  linkedSectionId: 'key-findings',
                  linkedLabel: 'See details',
                },
                { text: 'WhatsApp upload SLI within normal range — no alerts fired for cross-platform distribution' },
                {
                  text: 'Integrity hold-rate SLI exceeded 3x baseline, see',
                  source: { id: 'C', color: 'yellow', label: 'integrity_false_positive_spike', preview: { title: 'Integrity Hold Rate', value: '3.1x', delta: '+210%', status: 'critical', sparkline: [10, 12, 11, 15, 28, 45, 62, 78] } },
                  linkedSectionId: 'key-findings',
                  linkedLabel: 'See details',
                },
              ],
            relatedAlert: {
              name: 'creator-distribution-reach < 60% baseline (prod)',
              startedAt: '2:17 PM',
              channel: '#creator-alerts-prod',
              alertKey: 'creator_reach_baseline_low (ALRT-40291)',
              surfacedAgo: '4h ago',
              relatedCount: 2,
            },
            relatedDatasets: [
              { name: 'creator_distribution_metrics_raw', description: 'Hourly reach and distribution scores per creator per platform' },
              { name: 'ts_post_reach_hourly', description: 'Taylor Swift specific post-level reach tracking cube' },
              { name: 'content_integrity_signals_v2', description: 'Integrity filter decisions and hold rates for creator content' },
            ],
          },
          rootCause: {
            confidence: 'High',
            description: 'A recent integrity filter update (D984521) tightened thresholds for simultaneous multi-platform posts [1]. The cross-posting velocity limit was reduced from 5 to 2 posts per minute, which immediately impacted high-volume creators who publish across platforms simultaneously. Posts exceeding the new limit were flagged and held for review, causing distribution delays of up to 4 hours [2]. The filter was not exempting Superstar Creator tier accounts, which historically have different posting patterns and were previously allowlisted under the prior threshold configuration [3].',
            sources: [
              { id: 1, color: 'green', label: 'Integrity filter changelog' },
              { id: 2, color: 'blue', label: 'Distribution pipeline logs' },
              { id: 3, color: 'red', label: 'Creator tier config' },
            ],
            timeline: {
              date: 'Feb 25, 2026',
              timeLabels: ['12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
              rows: [
                {
                  label: 'Mobile App Shipments',
                  color: '#6366f1',
                  events: [
                    { position: 0.4 }, { position: 1.1, count: 2 }, { position: 1.7 }, { position: 2.1 },
                    { position: 2.6 }, { position: 3.2 }, { position: 3.7 }, { position: 4.0, count: 2 },
                    { position: 4.3, count: 2 }, { position: 4.8 }, { position: 5.2 }, { position: 5.5 },
                  ],
                },
                {
                  label: 'GKs',
                  color: '#7c3aed',
                  events: [
                    { position: 0.0, value: 13 }, { position: 0.2, value: 17 }, { position: 0.4, value: 17 },
                    { position: 0.6, value: 22 }, { position: 0.8, value: 8 }, { position: 0.9, value: 11 },
                    { position: 1.1, value: 27 }, { position: 1.3, value: 17 }, { position: 1.5, value: 19 },
                    { position: 1.7, value: 25 }, { position: 1.9, value: 10 }, { position: 2.1, value: 30 },
                    { position: 2.3, value: 36 }, { position: 2.5, value: 23 }, { position: 2.7, value: 27 },
                    { position: 2.9, value: 28 }, { position: 3.1, value: 25 }, { position: 3.3, value: 29 },
                    { position: 3.5, value: 26 }, { position: 3.7, value: 29 }, { position: 3.9, value: 26 },
                    { position: 4.1, value: 23 }, { position: 4.3, value: 31 }, { position: 4.5, value: 30 },
                    { position: 4.6, value: 11 }, { position: 4.8, value: 19 }, { position: 5.0, value: 23 },
                    { position: 5.1, value: 24 }, { position: 5.2, value: 31 }, { position: 5.4, value: 23 },
                    { position: 5.5, value: 22 }, { position: 5.6, value: 25 }, { position: 5.7, value: 36 },
                    { position: 5.8, value: 27 }, { position: 5.9, value: 23 }, { position: 6.0, value: 33 },
                  ],
                },
                {
                  label: 'MetaConfig',
                  color: '#7c3aed',
                  events: [
                    { position: 0.0, value: 22 }, { position: 0.15, value: 18 }, { position: 0.3, value: 12 },
                    { position: 0.45, value: 11 }, { position: 0.6, value: 28 }, { position: 0.75, value: 3 },
                    { position: 0.9, value: 19 }, { position: 1.05, value: 29 }, { position: 1.2, value: 33 },
                    { position: 1.35, value: 1 }, { position: 1.5, value: 26 }, { position: 1.65, value: 21 },
                    { position: 1.8, value: 14 }, { position: 1.95, value: 21 }, { position: 2.1, value: 35 },
                    { position: 2.25, value: 21 }, { position: 2.4, value: 18 }, { position: 2.55, value: 21 },
                    { position: 2.7, value: 31 }, { position: 2.85, value: 1 }, { position: 3.0, value: 23 },
                    { position: 3.15, value: 21 }, { position: 3.3, value: 12 }, { position: 3.45, value: 3 },
                    { position: 3.6, value: 19 }, { position: 3.75, value: 21 }, { position: 3.9, value: 30 },
                    { position: 4.05, value: 21 }, { position: 4.2, value: 17 }, { position: 4.35, value: 33 },
                    { position: 4.5, value: 1 }, { position: 4.65, value: 26 }, { position: 4.8, value: 29 },
                    { position: 4.95, value: 11 }, { position: 5.1, value: 35 }, { position: 5.25, value: 21 },
                    { position: 5.4, value: 27 }, { position: 5.55, value: 1 }, { position: 5.7, value: 30 },
                    { position: 5.85, value: 21 }, { position: 6.0, value: 19 },
                  ],
                },
              ],
            },
          },
          nextSteps: [
            { id: 1, text: 'Add Superstar Creator exemption to the cross-posting velocity filter', completed: false },
            { id: 2, text: 'Retroactively release held posts from the integrity review queue', completed: false },
            { id: 3, text: 'Set up proactive monitoring for high-profile creator launches', completed: false },
            { id: 4, text: 'File follow-up task to audit integrity filter tier exemptions', completed: false },
          ],
        },
      },
      {
        id: 'plan',
        type: 'plan',
        title: 'Plan',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {},
      },
      {
        id: 'hypothesis-1',
        type: 'hypothesis-card',
        title: 'Hypothesis 1: Content Locale Routing Misconfiguration',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          status: 'ruled_out',
          rationale: 'The content distribution pipeline may have an incorrect locale filter applied. Recent changes to the Creator distribution service (D892341) modified locale routing logic. This could explain why content is exclusively reaching pl_PL locale users while being filtered out for all other regions.',
          evidence: [
            'D892341 landed 3 days before the incident — locale routing config was verified unchanged for this creator tier',
            'Reach degradation affected all locales equally, not just non-pl_PL regions',
            'Distribution logs show no locale-based filtering decisions during the incident window',
          ],
          investigation: [
            'Inspected locale routing configuration after D892341 — no changes to Superstar Creator tier routing',
            'Compared locale filter rules before and after the diff — routing paths were identical',
            'Queried reach metrics cube: all locales showed proportional drops, ruling out locale-specific filtering',
          ],
        },
      },
      {
        id: 'hypothesis-2',
        type: 'hypothesis-card',
        title: 'Hypothesis 2: Integrity Filter False Positive Cascade',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          status: 'confirmed',
          rationale: 'The integrity review system is incorrectly flagging content for review. A recent threshold adjustment (D984521) tightened the false-positive tolerance for cross-posting velocity checks. High-profile simultaneous posts triggered holds across all platforms because Superstar Creator tier accounts were not exempted from the new velocity limits.',
          evidence: [
            'D984521 deployed 18 hours before the incident — reduced cross-posting velocity threshold from 5 to 2 posts/minute',
            'Integrity hold queue shows 47 posts held for this creator in the incident window, all flagged by velocity filter',
            'Hold rate correlated exactly with the post publication time at 13:05 UTC',
            'No other Superstar Creator tier accounts were exempted from the new threshold',
          ],
          investigation: [
            'Queried integrity hold queue — confirmed all 47 holds triggered by cross-posting velocity filter from D984521',
            'Correlated hold timestamps with distribution SLI drops — exact match within 30 seconds',
            'Reviewed velocity threshold parameters — 2 posts/minute limit triggered on simultaneous FB + IG + YT publish',
            'Verified Creator tier exemption config — Superstar tier was missing from the allowlist in D984521',
          ],
        },
      },
      {
        id: 'hypothesis-3',
        type: 'hypothesis-card',
        title: 'Hypothesis 3: CDN Cache Invalidation Failure',
        createdBy: 'Opsmate',
        priority: 'Medium',
        isExpanded: false,
        content: {
          status: 'ruled_out',
          rationale: 'A CDN cache invalidation failure may be serving stale routing rules to edge nodes. The last CDN config push (D918203) included a routing table update that may not have propagated to all edge PoPs, causing inconsistent content delivery across regions.',
          evidence: [
            'CDN propagation logs show 100% edge PoP coverage within 4 minutes of D918203 deployment',
            'Cache hit/miss ratios were consistent across all geographic regions during the incident',
            'Content delivery latency showed no geographic variance — issue was upstream in the distribution pipeline',
          ],
          investigation: [
            'Checked CDN edge propagation status for D918203 — full propagation confirmed at all 42 PoPs',
            'Compared cache hit/miss ratios across regions — no anomalies detected',
            'Verified edge PoPs were using current routing configurations — no stale configs found',
          ],
        },
      },
      {
        id: 'root-cause-detail',
        type: 'root-cause-detail',
        title: 'Root Cause',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          summary: 'A recent integrity filter update (D984521) tightened thresholds for simultaneous multi-platform posts. The cross-posting velocity limit was reduced from 5 to 2 posts per minute, and Superstar Creator tier accounts were not added to the exemption allowlist. When Taylor Swift\'s album announcement was published simultaneously across Facebook, Instagram, and WhatsApp, the velocity filter immediately flagged all posts, triggering integrity holds that suppressed distribution across both Facebook and Instagram.',
          timeline: {
            date: 'Feb 25, 2026',
            startMinute: 15,
            endMinute: 195,
            lanes: [
              {
                label: 'Mobile App Shipments',
                events: [
                  { m: 25 }, { m: 52, n: 2, h: true }, { m: 70 }, { m: 82 },
                  { m: 100 }, { m: 110 }, { m: 130 }, { m: 143, n: 2, h: true },
                  { m: 150, n: 2, h: true }, { m: 170 }, { m: 182 }, { m: 190 },
                ],
              },
              {
                label: 'GKs',
                events: [
                  { m: 16, n: 13 }, { m: 20, n: 17 }, { m: 24, n: 17 }, { m: 28, n: 22 },
                  { m: 33, n: 8 }, { m: 37, n: 11 }, { m: 42, n: 27 }, { m: 46, n: 17 },
                  { m: 51, n: 19 }, { m: 55, n: 25 }, { m: 62, n: 10 }, { m: 67, n: 30 },
                  { m: 72, n: 36 }, { m: 77, n: 23 }, { m: 82, n: 27 }, { m: 87, n: 28 },
                  { m: 92, n: 25 }, { m: 97, n: 29 }, { m: 102, n: 26 }, { m: 108, n: 29 },
                  { m: 113, n: 26 }, { m: 118, n: 23 }, { m: 123, n: 31 }, { m: 129, n: 30 },
                  { m: 134, n: 11 }, { m: 139, n: 19 }, { m: 145, n: 23 }, { m: 150, n: 24 },
                  { m: 155, n: 31 }, { m: 161, n: 23 }, { m: 166, n: 22 }, { m: 171, n: 25 },
                  { m: 177, n: 36 }, { m: 182, n: 27 }, { m: 187, n: 23 }, { m: 192, n: 33 },
                ],
              },
              {
                label: 'MetaConfig',
                events: [
                  { m: 15, n: 22 }, { m: 19, n: 18 }, { m: 23, n: 12 }, { m: 27, n: 15 },
                  { m: 30, n: 28 }, { m: 34, n: 31 }, { m: 37, n: 19 }, { m: 41, n: 24 },
                  { m: 44, n: 33 }, { m: 48, n: 17 }, { m: 51, n: 26 }, { m: 55, n: 21 },
                  { m: 58, n: 14 }, { m: 62, n: 29 }, { m: 65, n: 35 }, { m: 69, n: 22 },
                  { m: 72, n: 18 }, { m: 76, n: 27 }, { m: 79, n: 31 }, { m: 83, n: 16 },
                  { m: 86, n: 23 }, { m: 90, n: 28 }, { m: 93, n: 12 }, { m: 97, n: 34 },
                  { m: 100, n: 19 }, { m: 104, n: 25 }, { m: 107, n: 30 }, { m: 111, n: 22 },
                  { m: 114, n: 17 }, { m: 118, n: 28 }, { m: 121, n: 33 }, { m: 125, n: 14 },
                  { m: 128, n: 26 }, { m: 132, n: 21 }, { m: 135, n: 29 }, { m: 139, n: 18 },
                  { m: 142, n: 35 }, { m: 146, n: 23 }, { m: 149, n: 27 }, { m: 153, n: 11 },
                  { m: 156, n: 30 }, { m: 160, n: 24 }, { m: 163, n: 19 }, { m: 167, n: 32 },
                  { m: 170, n: 15 }, { m: 174, n: 28 }, { m: 177, n: 22 }, { m: 181, n: 18 },
                  { m: 184, n: 12 },
                ],
              },
            ],
          },
          details: [
            {
              heading: 'Filter Configuration Change',
              text: 'D984521 modified the cross-posting velocity threshold in the integrity filter pipeline. The change was intended to catch coordinated inauthentic behavior but did not account for legitimate high-profile creator posting patterns. The Superstar Creator tier, which includes accounts with >50M followers, was previously exempt from velocity checks but was omitted from the updated allowlist.',
            },
            {
              heading: 'Distribution Impact',
              text: 'When posts were flagged, the integrity pipeline placed them in a review hold queue. During the hold period, the distribution pipeline treated these posts as pending review, suppressing organic reach and excluding them from recommendation surfaces. Facebook reach dropped 42% and Instagram distribution score fell from 0.94 to 0.61 within 2 hours.',
            },
            {
              heading: 'WhatsApp Unaffected',
              text: 'WhatsApp uses a separate content processing pipeline that does not share the cross-posting velocity filter. WhatsApp uploads were processed through standard creator upload flow, which has independent integrity checks that did not trigger on this content.',
            },
          ],
          affectedSystems: [
            'integrity_filter_pipeline',
            'distribution_service',
            'creator_reach_metrics',
            'content_hold_queue',
            'cross_posting_velocity_checker',
          ],
        },
      },
    ],
  })

  const addSection = (newSection) => {
    // If on a branch, add to that branch's sections
    if (activeBranchId) {
      setAnalyses(prev => prev.map(analysis => {
        if (analysis.id !== activeAnalysisId) return analysis
        return {
          ...analysis,
          branches: analysis.branches.map(branch => {
            if (branch.id !== activeBranchId) return branch
            return { ...branch, sections: [...branch.sections, newSection] }
          })
        }
      }))
    } else {
      // On shared canvas - for analysis-1 use promotedSections, for others add to their sections
      if (activeAnalysisId === 'analysis-1') {
        setPromotedSections(prev => [...prev, newSection])
      } else {
        setAnalyses(prev => prev.map(analysis => 
          analysis.id === activeAnalysisId 
            ? { ...analysis, sections: [...(analysis.sections || []), newSection] }
            : analysis
        ))
      }
    }
  }

  const handleAddChart = (input) => {
    const isUrl = input.startsWith('http://') || input.startsWith('https://')
    
    const newChart = {
      id: `chart-${Date.now()}`,
      type: 'chart',
      title: 'Canvas Chart',
      createdBy: 'Jamie Gomez',
      avatar: '/profile.jpg',
      isExpanded: true,
      content: {
        url: isUrl ? input : null,
        description: 'This chart has been embedded from an external analytics tool.',
      },
    }
    
    if (activeBranchId) {
      setAnalyses(prev => prev.map(analysis => {
        if (analysis.id !== activeAnalysisId) return analysis
        return {
          ...analysis,
          branches: analysis.branches.map(branch => {
            if (branch.id !== activeBranchId) return branch
            return { ...branch, sections: [...branch.sections, newChart] }
          })
        }
      }))
    } else {
      // On shared canvas - for analysis-1 use promotedSections, for others add to their sections
      if (activeAnalysisId === 'analysis-1') {
        setPromotedSections(prev => [...prev, newChart])
      } else {
        setAnalyses(prev => prev.map(analysis => 
          analysis.id === activeAnalysisId 
            ? { ...analysis, sections: [...(analysis.sections || []), newChart] }
            : analysis
        ))
      }
    }
  }

  const handleAddSharedChart = (input) => {
    const isUrl = input.startsWith('http://') || input.startsWith('https://')
    
    const newChart = {
      id: `chart-${Date.now()}`,
      type: 'chart',
      title: 'Canvas Chart',
      createdBy: 'Jamie Gomez',
      avatar: '/profile.jpg',
      isExpanded: true,
      content: {
        url: isUrl ? input : null,
        description: 'This chart has been embedded from an external analytics tool.',
      },
    }
    
    // For analysis-1, use promotedSections; for other analyses, add to their sections array
    if (activeAnalysisId === 'analysis-1') {
      setPromotedSections(prev => [...prev, newChart])
    } else {
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === activeAnalysisId 
          ? { ...analysis, sections: [...(analysis.sections || []), newChart] }
          : analysis
      ))
    }
  }

  // Get the active analysis and its branches
  const activeAnalysis = analyses.find(a => a.id === activeAnalysisId)
  const analysisBranches = activeAnalysis?.branches || []

  // For shared view, check which analysis is active
  const sharedSections = activeAnalysisId === 'analysis-1' 
    ? [...investigation.sections, ...promotedSections]
    : (activeAnalysis?.sections || [])
  
  // Get the active branch's sections if on a branch
  const activeBranch = analysisBranches.find(b => b.id === activeBranchId)
  const branchSections = activeBranch?.sections || []
  
  // Display sections based on current view
  const displaySections = isReadOnlySharedMode && sharedSectionsFromUrl 
    ? sharedSectionsFromUrl 
    : (activeCanvasTab === 'shared' ? sharedSections : branchSections)

  const showCopilot = activeBranchId && !isReadOnlySharedMode && activeCanvasTab === 'personal'

  if (activeVersion === 'T2') {
    return (
      <div className="h-screen flex flex-col bg-white pb-12">
        <T2ReasoningView key={t2Key} investigation={investigation} />
        <VersionBar activeVersion={activeVersion} onVersionChange={handleVersionChange} />
      </div>
    )
  }

  if (activeVersion === 'T3') {
    return (
      <div className="h-screen flex flex-col bg-[#f0f2f5] pb-12">
        <T3HypothesisTree investigation={investigation} />
        <VersionBar activeVersion={activeVersion} onVersionChange={handleVersionChange} />
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-[#f0f2f5] pb-12">
      <LeftNav 
        isOpen={isNavOpen} 
        onClose={() => setIsNavOpen(false)} 
        activeBranchId={activeBranchId}
        onSelectBranch={handleSelectBranch}
        analyses={analyses}
        activeAnalysisId={activeAnalysisId}
        onSelectAnalysis={handleSelectAnalysis}
      />
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        activeBranchId={activeBranchId}
        activeAnalysisId={activeAnalysisId}
        currentSections={displaySections}
        currentTitle={activeAnalysis?.title || ''}
        currentBranchName={activeBranch?.name || ''}
      />
      <Toast 
        isOpen={toast.isOpen}
        onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
        title={toast.title}
        message={toast.message}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          investigationId={investigation.id} 
          title={investigation.title}
          activeCanvasTab={activeCanvasTab}
          onCanvasTabChange={setActiveCanvasTab}
          onShare={() => setShowShareModal(true)}
          onToggleNav={() => {
            setIsNavOpen(true)
            setHasNavNotification(false)
          }}
          onCreateBranch={handleCreateBranch}
          isCreatingBranch={isCreatingBranch}
          activeBranch={activeBranch}
          hasNotification={hasNavNotification}
          analysisTitle={isReadOnlySharedMode && sharedTitleFromUrl ? sharedTitleFromUrl : activeAnalysis?.title}
          onRenameBranch={handleRenameBranch}
          isReadOnly={isReadOnlySharedMode}
          sharedIsBranch={sharedIsBranch}
        />
        
        {isReadOnlySharedMode && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-center">
            <span className="text-sm text-amber-800">
              📎 This canvas is read-only
            </span>
          </div>
        )}
        
        <div className="flex-1 flex overflow-hidden">
          <Canvas 
            sections={displaySections} 
            isSharedView={activeCanvasTab === 'shared'}
            isReadOnly={isReadOnlySharedMode}
            onMitigate={undefined}
            onAskOpsmate={isReadOnlySharedMode ? undefined : (section) => {
              if (copilotRef.current) {
                copilotRef.current.setReference(section)
              }
            }}
            onAddChart={isReadOnlySharedMode ? undefined : (activeCanvasTab === 'personal' ? handleAddChart : handleAddSharedChart)}
            onRemove={isReadOnlySharedMode ? undefined : (activeCanvasTab === 'shared' ? handleRemoveSection : handleRemoveBranchSection)}
            onCopy={isReadOnlySharedMode ? undefined : (section) => {
              setToast({
                isOpen: true,
                title: 'Widget Copied',
                message: `${section.title} copied. Use Cmd+V to paste in any branch.`,
              })
            }}
            onOpenSteps={isReadOnlySharedMode ? undefined : () => {
              setShowSteps(true)
            }}
          />
        </div>
      </div>

      {showCopilot && (
        <>
          <Copilot 
            key={activeBranchId}
            ref={copilotRef}
            onOpenSources={() => setShowSources(true)} 
            onOpenSteps={(count) => {
              setStepsToShow(count)
              setShowSteps(true)
            }}
            onAddSection={addSection}
            onViewSharedCanvas={() => setActiveCanvasTab('shared')}
          />
          <SourcesPanel isOpen={showSources} onClose={() => setShowSources(false)} />
        </>
      )}

      <StepsPanel isOpen={showSteps} onClose={() => setShowSteps(false)} stepsToShow={stepsToShow} />

      <VersionBar activeVersion={activeVersion} onVersionChange={handleVersionChange} />
    </div>
  )
}

export default App
