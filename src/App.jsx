import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Copilot from './components/Copilot'
import SEVChat from './components/SEVChat'
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
  const [isSEVChatOpen, setIsSEVChatOpen] = useState(true)
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
  const sevChatRef = useRef(null)

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
          title: 'Hypothesis',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: false,
          content: {
            summary: 'Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.',
            hypotheses: [
              {
                id: 'h1',
                title: 'Pellentesque Service Timeout Analysis',
                rationale: 'Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
                detailedSteps: [
                  {
                    title: 'Analyze Request Latency Patterns',
                    tableName: 'pellentesque_metrics_cube',
                    query: {
                      table: 'request_latency_raw',
                      filters: 'time_range = last_24h',
                      groupBy: 'endpoint, region, status_code',
                      lookFor: 'P99 latency spikes, timeout patterns',
                    },
                  },
                ],
              },
              {
                id: 'h2',
                title: 'Donec Sollicitudin Cache Invalidation',
                rationale: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec.',
                detailedSteps: [
                  {
                    title: 'Check Cache Hit Rates',
                    tableName: 'cache_performance_cube',
                    query: {
                      table: 'cache_stats_raw',
                      filters: 'cache_type = distributed',
                      groupBy: 'cache_key_prefix, hit_miss',
                      lookFor: 'Sudden drop in hit rates, eviction spikes',
                    },
                  },
                ],
              },
            ],
            nextSteps: [
              'Investigate hypothesis 1 for timeout correlation with deployment',
              'Review cache invalidation logs for anomalies',
            ],
          },
        },
        {
          id: 'root-cause',
          type: 'root-cause',
          title: 'Root cause',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: true,
          content: {
            summary: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim.',
            linkedSev: 'S612847',
            hasDetailedAnalysis: true,
          },
        },
        {
          id: 'mitigation',
          type: 'mitigation',
          title: 'Mitigation',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: true,
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

  const handleReferenceInSEVChat = (section) => {
    // Open SEVChat if not already open
    setIsSEVChatOpen(true)
    // Add the reference to SEVChat
    setTimeout(() => {
      sevChatRef.current?.addReference(section)
    }, 100) // Small delay to ensure chat is open
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
        title: 'Hypothesis',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: false,
        content: {
          summary: 'Opsmate has created a comprehensive investigation plan with 3 main hypotheses to explore:',
          hypotheses: [
            {
              id: 'h1',
              title: 'Authorization Service Database Overload',
              rationale: "Based on similar SEV S559486 and Meta's common auth service failure patterns, authorization service database overload is a frequent cause of slow loading and permission errors in internal tools like SEVManager.",
              detailedSteps: [
                {
                  title: 'Check Authorization Service Health',
                  tableName: 'metamate_users_growth_accounting_cube',
                  query: {
                    table: 'authorization_service_server_requests_raw',
                    filters: 'time_range = SEV timeframe',
                    groupBy: 'exception_class, method_name, error_type',
                    lookFor: 'High error rates, timeout exceptions, database connection failures',
                  },
                },
              ],
            },
            {
              id: 'h2',
              title: 'Upstream Dependency Failure',
              rationale: 'The SEV context explicitly mentions being impacted by S568713.',
              detailedSteps: [
                {
                  title: 'Review S568713 Timeline',
                  tableName: 'sev_timeline_events',
                  query: {
                    table: 'sev_timeline_events',
                    filters: 'sev_id = "S568713"',
                    groupBy: 'event_type, timestamp',
                    lookFor: 'Correlation with SEVManager errors',
                  },
                },
              ],
            },
          ],
          nextSteps: [
            'Start with Hypothesis 2 since S568713 is explicitly mentioned as the cause',
            'If S568713 correlation is confirmed, focus on understanding the dependency chain',
          ],
        },
      },
      {
        id: 'root-cause',
        type: 'root-cause',
        title: 'Root cause',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: true,
        content: {
          summary: 'The root cause of the recent authorization service issues was a cascading failure triggered by SEV S568713.',
          linkedSev: 'S568713',
          hasDetailedAnalysis: true,
        },
      },
      {
        id: 'mitigation',
        type: 'mitigation',
        title: 'Mitigation',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: true,
        content: {
          summary: 'To address the risk of future authorization service outages caused by upstream dependency failures.',
          linkedSev: 'S568713',
          actions: [
            { id: 1, text: 'Set up enhanced monitoring and alerting for all critical dependencies.', completed: false },
            { id: 2, text: 'Ensure automated alerts are in place for error spikes.', completed: false },
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

  return (
    <div className="h-screen flex flex-col bg-[#f0f2f5]">
      
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
        onToggleSEVChat={() => setIsSEVChatOpen(!isSEVChatOpen)}
        isSEVChatOpen={isSEVChatOpen}
      />
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
      
      {/* Read-only shared mode banner */}
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
          onTriggerProactiveRun={isReadOnlySharedMode ? undefined : handleTriggerProactiveRun}
          onCopy={isReadOnlySharedMode ? undefined : (section) => {
            setToast({
              isOpen: true,
              title: 'Widget Copied',
              message: `${section.title} copied. Use Cmd+V to paste in any branch.`,
            })
          }}
          onReferenceInSEVChat={!isReadOnlySharedMode && activeCanvasTab === 'shared' ? handleReferenceInSEVChat : undefined}
        />
        {activeBranchId && !isReadOnlySharedMode && (
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
            <StepsPanel isOpen={showSteps} onClose={() => setShowSteps(false)} stepsToShow={stepsToShow} />
          </>
        )}
        {/* SEVChat - only show on Shared Investigation (not on branches) */}
        {!activeBranchId && !isReadOnlySharedMode && (
          <SEVChat 
            ref={sevChatRef}
            isOpen={isSEVChatOpen} 
            onClose={() => setIsSEVChatOpen(false)} 
          />
        )}
      </div>
    </div>
  )
}

export default App
