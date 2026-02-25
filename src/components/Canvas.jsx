import { useState, useEffect, useRef } from 'react'
import { PlusCircle, Send } from 'lucide-react'
import SectionCard from './SectionCard'
import OutlineSidebar from './OutlineSidebar'

export default function Canvas({ sections, isSharedView = false, isReadOnly = false, onMitigate, onAskOpsmate, onAddChart, onRemove, onCopy, onOpenSteps }) {
  const [expandedSections, setExpandedSections] = useState({})
  const [animatedSections, setAnimatedSections] = useState(new Set())
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
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
          updated[section.id] = section.isExpanded ?? false
        }
      })
      return updated
    })
  }, [sections])

  const [activeSectionId, setActiveSectionId] = useState(null)

  // Track which section is currently visible in the viewport
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('data-section-id')
          if (id) setActiveSectionId(id)
        }
      },
      { root: container, rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    )

    const currentRefs = sectionRefs.current
    Object.values(currentRefs).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections, initialLoadComplete])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const scrollToSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: true
    }))

    const doScroll = () => {
      const el = sectionRefs.current[sectionId]
      if (el && scrollRef.current) {
        const containerRect = scrollRef.current.getBoundingClientRect()
        const elementRect = el.getBoundingClientRect()
        const scrollTop = scrollRef.current.scrollTop
        const targetPosition = scrollTop + elementRect.top - containerRect.top - 24
        scrollRef.current.scrollTo({ top: targetPosition, behavior: 'smooth' })
      }
    }

    setTimeout(doScroll, 50)
    setTimeout(doScroll, 300)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">

      <div className="flex-1 flex overflow-hidden relative">
      {/* Outline Sidebar */}
      <div className="hidden xl:block absolute left-6 top-6 z-10">
        <OutlineSidebar
          sections={sections}
          activeSectionId={activeSectionId}
          onScrollToSection={scrollToSection}
        />
      </div>

      {/* Canvas Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pt-6 pb-24">
        <div className="max-w-[1088px] mx-auto space-y-4">
          {sections.map((section, index) => {
            const isNew = animatedSections.has(section.id)
            const isLastDynamicSection = section.type === 'alert' && index === sections.length - 1
            const shouldAnimate = !initialLoadComplete || isNew
            const prevSection = index > 0 ? sections[index - 1] : null
            const showDivider = prevSection && prevSection.type === 'hypothesis' && section.type !== 'hypothesis'
            
            return (
              <div 
                key={section.id}
                data-section-id={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el }}
                className={isNew ? 'animate-slide-up' : (shouldAnimate ? 'animate-fade-in' : '')}
                style={shouldAnimate && !isNew ? { opacity: 0, animationDelay: `${0.05 * (index + 1)}s` } : {}}
              >
                {showDivider && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Detailed Findings</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
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
                  onScrollToSection={scrollToSection}
                  onOpenSteps={onOpenSteps}
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
