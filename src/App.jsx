import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Copilot from './components/Copilot'
import SourcesPanel from './components/SourcesPanel'
import StepsPanel from './components/StepsPanel'
import ShareModal from './components/ShareModal'
import Toast from './components/Toast'
import LeftNav from './components/LeftNav'

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
          id: 'root-cause',
          type: 'root-cause',
          title: 'Incident Timeline',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: false,
          content: {
            timelineDescription: 'The Stories pipeline integrity check failure began at **14:15 UTC** when the async hold queue started accumulating unreleased posts. By **14:30 UTC**, Stories reach had degraded to 54% of baseline. The primary feed rollback at **13:45 UTC** did not propagate to the Stories config path.',
          },
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
          whatHappened: 'Taylor Swift\'s "Life of a Showgirl" album announcement was posted simultaneously across Facebook, Instagram, and YouTube. Within minutes, unconnected distribution metrics dropped sharply and reach numbers diverged significantly from projected baselines. The Creator Forensics team had proactively filed T234502850 to monitor this release.',
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
                { text: 'YouTube upload SLI within normal range — no alerts fired for cross-platform distribution' },
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
            description: 'A recent integrity filter update (D984521) tightened thresholds for simultaneous multi-platform posts [1]. Posts exceeding the new cross-posting velocity limit were flagged and held for review, causing distribution delays [2]. The filter was not exempting Superstar Creator tier accounts, which historically have different posting patterns [3].',
            sources: [
              { id: 1, color: 'green', label: 'Integrity filter changelog' },
              { id: 2, color: 'blue', label: 'Distribution pipeline logs' },
              { id: 3, color: 'red', label: 'Creator tier config' },
            ],
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
        id: 'root-cause',
        type: 'root-cause',
        title: 'Incident Timeline',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          timelineDescription: 'The upstream dependency failure began at **09:42 UTC** when the authorization service started experiencing elevated latency. By **09:48 UTC**, error rates exceeded the 5% threshold, triggering the initial alert. The cascading failure reached SEVManager at **09:52 UTC**, causing widespread permission check failures.',
        },
      },
      {
        id: 'key-findings',
        type: 'key-findings',
        title: 'Key Findings',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          description: 'Correlated SLI metrics across platforms during the incident window show clear distribution suppression on Facebook and Instagram, while YouTube remained unaffected.',
          findings: [
            {
              title: 'Creator Reach SLI',
              description: 'Post reach on Facebook dropped 42% vs. projected baseline within the first 2 hours of the album announcement.',
              status: 'critical',
              statusLabel: '-42% from baseline',
              linkedSectionId: 'hypothesis-1',
              linkedLabel: 'Hypothesis 1',
              chart: {
                width: 500, height: 160, paddingLeft: 45, paddingTop: 15, plotHeight: 120, yMax: 100,
                yLabels: [
                  { value: 0, text: '0%' }, { value: 25, text: '25%' }, { value: 50, text: '50%' }, { value: 75, text: '75%' }, { value: 100, text: '100%' },
                ],
                threshold: { value: 60, label: '60% threshold' },
                xLabels: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
                lines: [
                  { data: [92, 91, 93, 90, 88, 82, 74, 68, 62, 59, 58, 58], color: '#ef4444', fill: '#ef4444', strokeWidth: 2 },
                ],
              },
            },
            {
              title: 'Instagram Distribution Score',
              description: 'Distribution score fell from 0.94 to 0.61, indicating suppression by integrity filters on Instagram.',
              status: 'critical',
              statusLabel: '0.94 → 0.61',
              linkedSectionId: 'hypothesis-2',
              linkedLabel: 'Hypothesis 2',
              chart: {
                width: 500, height: 160, paddingLeft: 45, paddingTop: 15, plotHeight: 120, yMax: 1,
                yLabels: [
                  { value: 0, text: '0.0' }, { value: 0.25, text: '0.25' }, { value: 0.5, text: '0.50' }, { value: 0.75, text: '0.75' }, { value: 1, text: '1.0' },
                ],
                threshold: { value: 0.7, label: '0.70 SLO' },
                xLabels: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
                lines: [
                  { data: [0.94, 0.93, 0.94, 0.93, 0.91, 0.85, 0.78, 0.71, 0.66, 0.63, 0.61, 0.61], color: '#3b82f6', fill: '#3b82f6', strokeWidth: 2 },
                ],
              },
            },
            {
              title: 'Integrity Hold Rate',
              description: 'False-positive integrity holds spiked to 3.1x baseline after the cross-posting velocity filter flagged the simultaneous multi-platform posts.',
              status: 'critical',
              statusLabel: '3.1x baseline',
              linkedSectionId: 'root-cause-detail',
              linkedLabel: 'Root Cause',
              chart: {
                width: 500, height: 160, paddingLeft: 45, paddingTop: 15, plotHeight: 120, yMax: 4,
                yLabels: [
                  { value: 0, text: '0x' }, { value: 1, text: '1x' }, { value: 2, text: '2x' }, { value: 3, text: '3x' }, { value: 4, text: '4x' },
                ],
                threshold: { value: 1, label: '1x baseline' },
                xLabels: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
                lines: [
                  { data: [0.4, 0.5, 0.4, 0.6, 0.8, 1.2, 1.8, 2.4, 2.8, 3.0, 3.1, 3.1], color: '#f59e0b', fill: '#f59e0b', strokeWidth: 2 },
                ],
              },
            },
          ],
        },
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
          summary: 'A recent integrity filter update (D984521) tightened thresholds for simultaneous multi-platform posts. The cross-posting velocity limit was reduced from 5 to 2 posts per minute, and Superstar Creator tier accounts were not added to the exemption allowlist. When Taylor Swift\'s album announcement was published simultaneously across Facebook, Instagram, and YouTube, the velocity filter immediately flagged all posts, triggering integrity holds that suppressed distribution across both Facebook and Instagram.',
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
              heading: 'YouTube Unaffected',
              text: 'YouTube uses a separate content processing pipeline that does not share the cross-posting velocity filter. YouTube uploads were processed through standard creator upload flow, which has independent integrity checks that did not trigger on this content.',
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
      {
        id: 'next-steps-detail',
        type: 'next-steps-detail',
        title: 'Next Steps',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          summary: 'Immediate remediation focuses on restoring distribution for affected posts and preventing recurrence through allowlist updates and monitoring improvements.',
          steps: [
            { id: 1, title: 'Rollback integrity filter threshold', priority: 'P0', description: 'Revert D984521 cross-posting velocity limit from 2 back to 5 posts/min to unblock flagged content immediately.', owner: 'Integrity Team' },
            { id: 2, title: 'Add Superstar Creator tier to allowlist', priority: 'P0', description: 'Update the integrity filter exemption allowlist to include all Superstar Creator tier accounts (>50M followers).', owner: 'Integrity Team' },
            { id: 3, title: 'Release held posts from review queue', priority: 'P0', description: 'Manually release all posts currently held in the integrity review queue that were flagged by the velocity filter.', owner: 'Content Ops' },
            { id: 4, title: 'Add velocity filter integration test', priority: 'P1', description: 'Create automated tests that validate high-profile creator posting patterns against velocity filter thresholds before deployment.', owner: 'Integrity Team' },
            { id: 5, title: 'Set up creator reach monitoring alert', priority: 'P2', description: 'Configure an alert for when Superstar Creator tier reach drops below 80% of baseline within a 1-hour window.', owner: 'Observability' },
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

  return (
    <div className="h-screen flex bg-[#f0f2f5]">
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
    </div>
  )
}

export default App
