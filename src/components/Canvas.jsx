import { useState, useEffect, useRef } from 'react'
import { List, FileText, AlertTriangle, Lightbulb, Shield, PlusCircle, Send, BarChart3, Play } from 'lucide-react'
import SectionCard from './SectionCard'

export default function Canvas({ sections, isSharedView = false, isReadOnly = false, onMitigate, onAskOpsmate, onAddChart, onRemove, onTriggerProactiveRun, onCopy, onReferenceInSEVChat }) {
  const [expandedSections, setExpandedSections] = useState({})
  const [animatedSections, setAnimatedSections] = useState(new Set())
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [showOutline, setShowOutline] = useState(false)
  const [chartInput, setChartInput] = useState('')
  const prevSectionsRef = useRef([])
  const scrollRef = useRef(null)
  const sectionRefs = useRef({})

  const handleAddChart = () => {
    if (!chartInput.trim()) return
    onAddChart?.(chartInput.trim())
    setChartInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && chartInput.trim()) {
      handleAddChart()
    }
  }

  const getSectionIcon = (type) => {
    switch (type) {
      case 'hypothesis':
        return Lightbulb
      case 'root-cause':
        return AlertTriangle
      case 'mitigation':
        return Shield
      case 'alert':
        return AlertTriangle
      case 'chart':
        return BarChart3
      default:
        return FileText
    }
  }

  const scrollToSection = (sectionId) => {
    const sectionElement = sectionRefs.current[sectionId]
    if (sectionElement && scrollRef.current) {
      const containerRect = scrollRef.current.getBoundingClientRect()
      const elementRect = sectionElement.getBoundingClientRect()
      const scrollTop = scrollRef.current.scrollTop
      const offset = 24
      const targetPosition = scrollTop + elementRect.top - containerRect.top - offset
      
      scrollRef.current.scrollTo({ 
        top: targetPosition, 
        behavior: 'smooth' 
      })
    }
    setShowOutline(false)
  }

  // Mark initial load complete after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true)
      prevSectionsRef.current = sections
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Track which sections are new and need slide-up animation (only after initial load)
  useEffect(() => {
    if (!initialLoadComplete) return
    
    const prevIds = new Set(prevSectionsRef.current.map(s => s.id))
    const newSectionIds = sections
      .filter(s => !prevIds.has(s.id))
      .map(s => s.id)
    
    if (newSectionIds.length > 0) {
      setAnimatedSections(new Set(newSectionIds))
      
      // Scroll to the new section after animation starts
      setTimeout(() => {
        const newSectionId = newSectionIds[0]
        const sectionElement = sectionRefs.current[newSectionId]
        if (sectionElement && scrollRef.current) {
          const containerRect = scrollRef.current.getBoundingClientRect()
          const elementRect = sectionElement.getBoundingClientRect()
          const scrollTop = scrollRef.current.scrollTop
          const offset = 24
          const targetPosition = scrollTop + elementRect.top - containerRect.top - offset
          
          scrollRef.current.scrollTo({ 
            top: targetPosition, 
            behavior: 'smooth' 
          })
        }
      }, 200)
      
      // Clear animation flag after animation completes
      setTimeout(() => {
        setAnimatedSections(new Set())
      }, 900)
    }
    
    prevSectionsRef.current = sections
  }, [sections, initialLoadComplete])

  // Initialize expanded state for new sections
  useEffect(() => {
    setExpandedSections(prev => {
      const updated = { ...prev }
      sections.forEach(section => {
        if (!(section.id in updated)) {
          updated[section.id] = section.isExpanded ?? true
        }
      })
      return updated
    })
  }, [sections])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Shared Canvas Banner */}
      {isSharedView && !isReadOnly && (
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 shrink-0">
          <p className="text-sm text-gray-700">
            Shared Investigation is <span className="underline">visible to all</span>. All users can paste widgets and share directly to SEVchat.
          </p>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
      {/* Outline Button - show on all canvases (except read-only) */}
      {!isReadOnly && (
      <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={() => setShowOutline(!showOutline)}
          className={`p-2 rounded-lg border border-gray-200 bg-white shadow-sm transition-colors ${
            showOutline ? 'bg-gray-50 text-gray-600' : 'hover:bg-gray-50 text-gray-400 hover:text-gray-600'
          }`}
        >
          <List className="w-5 h-5" />
        </button>

        {/* Outline Menu */}
        {showOutline && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowOutline(false)} 
            />
            
            {/* Menu */}
            <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Outline</h3>
              </div>
              <div className="py-2">
                {sections.map((section) => {
                  const Icon = getSectionIcon(section.type)
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-700 truncate">{section.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
      )}

      {/* Canvas Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pt-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-4">
          {sections.map((section, index) => {
            const isNew = animatedSections.has(section.id)
            const isLastDynamicSection = section.type === 'alert' && index === sections.length - 1
            const shouldAnimate = !initialLoadComplete || isNew
            
            return (
              <div 
                key={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el }}
                className={isNew ? 'animate-slide-up' : (shouldAnimate ? 'animate-fade-in' : '')}
                style={shouldAnimate && !isNew ? { opacity: 0, animationDelay: `${0.05 * (index + 1)}s` } : {}}
              >
                <SectionCard
                  section={section}
                  isExpanded={expandedSections[section.id] ?? section.isExpanded}
                  onToggle={() => toggleSection(section.id)}
                  onMitigate={onMitigate}
                  isSharedView={isSharedView}
                  isReadOnly={isReadOnly}
                  onAskOpsmate={onAskOpsmate}
                  onRemove={onRemove}
                  onCopy={onCopy}
                  onReferenceInSEVChat={onReferenceInSEVChat}
                />
                {/* Add extra space below new alert sections */}
                {isLastDynamicSection && (
                  <div className="h-[30vh]" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Left - Trigger proactive run button (hide in read-only mode) */}
      {!isReadOnly && onTriggerProactiveRun && (
        <div className="absolute bottom-6 left-6 z-10">
          <button 
            type="button"
            onClick={onTriggerProactiveRun}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Play className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Trigger proactive run</span>
          </button>
        </div>
      )}

      {/* Bottom Chart Input Bar (hide in read-only mode) */}
      {!isReadOnly && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f0f2f5] via-[#f0f2f5] to-transparent pt-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-card">
              <PlusCircle className="w-5 h-5 text-gray-300 shrink-0" />
              <input
                type="text"
                value={chartInput}
                onChange={(e) => setChartInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a note or paste a chart URL: <chart link> <title>"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button 
                onClick={handleAddChart}
                disabled={!chartInput.trim()}
                className="p-2 bg-blue-100 text-blue-400 rounded-full hover:bg-blue-200 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
