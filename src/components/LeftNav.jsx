import { useState, useEffect } from 'react'
import { X, Settings, HelpCircle, MessageCircle, ChevronDown, ChevronRight, Users } from 'lucide-react'

export default function LeftNav({ isOpen, onClose, activeBranchId, onSelectBranch, analyses = [], activeAnalysisId, onSelectAnalysis }) {
  // Track which analyses are expanded (default all expanded)
  const [expandedAnalyses, setExpandedAnalyses] = useState(new Set(analyses.map(a => a.id)))

  // Auto-expand new analyses when they're added
  useEffect(() => {
    setExpandedAnalyses(prev => {
      const newSet = new Set(prev)
      analyses.forEach(a => newSet.add(a.id))
      return newSet
    })
  }, [analyses])

  const toggleExpanded = (analysisId) => {
    setExpandedAnalyses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(analysisId)) {
        newSet.delete(analysisId)
      } else {
        newSet.add(analysisId)
      }
      return newSet
    })
  }

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ]

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M10.0206 15.0256C10.3164 15.8619 11.1136 16.4613 12.0513 16.4615C12.9891 16.4613 13.7863 15.8619 14.0821 15.0256H15.1493C14.8242 16.4359 13.5606 17.4872 12.0514 17.4872C10.5427 17.4872 9.27906 16.4359 8.95341 15.0256H10.0206ZM12.0508 16.4615H12.0519C12.0517 16.4615 12.0515 16.4615 12.0513 16.4615C12.0512 16.4615 12.051 16.4615 12.0508 16.4615Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.12879 7.38461C9.61545 7.38462 10.8211 8.59026 10.8211 10.0769C10.8211 11.5636 9.61545 12.7692 8.12879 12.7692C6.64213 12.7692 5.43649 11.5636 5.43649 10.0769C5.43649 8.59026 6.64213 7.38461 8.12879 7.38461ZM8.12879 8.41026C7.20828 8.41026 6.46213 9.15641 6.46213 10.0769C6.46213 10.9974 7.20828 11.7436 8.12879 11.7436C9.0493 11.7436 9.79546 10.9974 9.79546 10.0769C9.79546 9.15641 9.0493 8.41026 8.12879 8.41026Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.8724 7.38461C17.359 7.38462 18.5647 8.59026 18.5647 10.0769C18.5647 11.5636 17.359 12.7692 15.8724 12.7692C14.3857 12.7692 13.1801 11.5636 13.1801 10.0769C13.1801 8.59026 14.3857 7.38461 15.8724 7.38461ZM15.8724 8.41026C14.9519 8.41026 14.2057 9.15641 14.2057 10.0769C14.2057 10.9974 14.9519 11.7436 15.8724 11.7436C16.7929 11.7436 17.5391 10.9974 17.5391 10.0769C17.5391 9.15641 16.7929 8.41026 15.8724 8.41026Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.6673 0C15.177 6.43207e-06 15.5903 0.413337 15.5903 0.923077V5.22922C15.9447 5.2087 16.2862 5.18513 16.616 5.16001V0.98152L18.7175 1.42874C20.2498 1.75489 21.3893 3.00361 21.6047 4.51848C21.6688 4.50617 21.7293 4.49385 21.7867 4.48257C22.019 4.43591 22.1944 4.39746 22.3103 4.37079C22.3683 4.35746 22.4114 4.34716 22.439 4.34049C22.4529 4.33742 22.4631 4.33487 22.4693 4.33333C22.4724 4.33282 22.4744 4.33178 22.4755 4.33178H22.476C22.8877 4.22614 23.3067 4.47435 23.4123 4.88562H23.4113C23.517 5.29741 23.2688 5.71642 22.8575 5.82206C22.8483 5.82463 22.8185 5.83178 22.8016 5.83589C22.7673 5.84409 22.718 5.85592 22.6534 5.87079C22.5247 5.90002 22.3354 5.94154 22.0888 5.99129C21.9442 6.02 21.7795 6.05179 21.5954 6.08564C21.6252 6.27487 21.6411 6.46923 21.6411 6.66667V17.7436C21.6411 19.7667 20.0139 21.4103 17.9965 21.4359H14.9744C14.7406 21.7472 14.3683 21.9487 13.9488 21.9487H10.0514C9.63189 21.9487 9.25958 21.7472 9.02573 21.4359H6.00364C3.98621 21.4108 2.35906 19.7672 2.35906 17.7441V6.66717C2.35906 6.46922 2.37494 6.27536 2.40469 6.08614C2.22058 6.05229 2.05596 6.02102 1.91135 5.99179C1.66469 5.94256 1.47597 5.90104 1.34674 5.87129C1.28213 5.85642 1.23287 5.84459 1.19851 5.83639C1.18158 5.83228 1.15184 5.82513 1.14262 5.82257C0.731345 5.71692 0.483149 5.29744 0.58878 4.88617C0.694421 4.47489 1.1139 4.2267 1.52518 4.33233H1.52573C1.52676 4.33235 1.5288 4.33332 1.53184 4.33383C1.53799 4.33537 1.54829 4.33746 1.56214 4.34105C1.58983 4.34771 1.63291 4.35796 1.69084 4.37129C1.80623 4.39796 1.98213 4.43641 2.21443 4.48307C2.27187 4.49487 2.33237 4.50667 2.39647 4.51898C2.61186 3.00411 3.75134 1.75539 5.28364 1.42924L7.3852 0.982071V5.16051C7.71494 5.18563 8.05649 5.20925 8.41085 5.22977V0.923077C8.41085 0.413333 8.82418 0 9.33392 0H14.6673ZM19.9411 6.35181C18.076 6.61233 15.3739 6.87179 12.0011 6.87179C8.62827 6.87179 5.9257 6.61284 4.06109 6.35181C4.01493 6.34515 3.96929 6.339 3.92417 6.33233C3.90673 6.44104 3.89803 6.55283 3.89803 6.66667V17.7436C3.89803 18.9333 4.86213 19.8974 6.05187 19.8974H9.02623C9.26008 19.5862 9.63239 19.3846 10.0519 19.3846H13.9493C14.3688 19.3846 14.7411 19.5862 14.9749 19.8974H17.9493C19.139 19.8974 20.1032 18.9333 20.1032 17.7436H20.1042V6.66667C20.1042 6.55283 20.0949 6.44155 20.078 6.33233C20.0329 6.339 19.9872 6.34515 19.9411 6.35181ZM10.616 1.4359C10.3611 1.4359 10.1544 1.64256 10.1544 1.89744V2.14874C10.1544 3.06155 10.5601 3.92771 11.2616 4.51232L11.7052 4.88206C11.7909 4.95333 11.896 4.98923 12.0006 4.98923C12.1052 4.98923 12.2103 4.95334 12.296 4.88206L12.7396 4.51232C13.4411 3.92771 13.8467 3.06206 13.8467 2.14874V1.89744C13.8467 1.64257 13.6401 1.4359 13.3852 1.4359H10.616Z" fill="currentColor"/>
              </svg>
            <span className="font-semibold text-gray-900">Opsmate</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {/* Shared Investigation (first analysis - not a folder) */}
            {analyses.length > 0 && (() => {
              const sharedAnalysis = analyses.find(a => a.id === 'analysis-1')
              if (!sharedAnalysis) return null
              
              const isOnShared = activeAnalysisId === 'analysis-1' && !activeBranchId
              
              return (
                <>
                  <button
                    onClick={() => onSelectAnalysis('analysis-1')}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
                      isOnShared 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Users className={`w-4 h-4 ${isOnShared ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`text-sm truncate flex-1 text-left ${isOnShared ? 'font-medium' : 'text-gray-600'}`}>
                      {sharedAnalysis.title}
                    </span>
                    {sharedAnalysis.isNew && (
                      <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-medium rounded shrink-0">
                        Update
                      </span>
                    )}
                  </button>
                  
                  {/* Divider line */}
                  <div className="border-b border-gray-200 mt-2 mb-2" />
                  
                  {/* Branches from the shared investigation (not indented) */}
                  {(sharedAnalysis.branches || []).map((branch) => (
                    <button 
                      key={branch.id}
                      onClick={() => onSelectBranch(branch.id, 'analysis-1')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        activeBranchId === branch.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <MessageCircle className={`w-4 h-4 ${activeBranchId === branch.id ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div className="flex flex-col items-start min-w-0">
                        <span className={`text-sm truncate ${activeBranchId === branch.id ? 'font-medium' : 'text-gray-600'}`}>
                          {branch.name}
                        </span>
                        <span className="text-xs text-gray-400 truncate">{branch.createdAt}</span>
                      </div>
                    </button>
                  ))}
                </>
              )
            })()}
            
            {/* Other Analyses (proactive runs - these remain as folders) */}
            {analyses.filter(a => a.id !== 'analysis-1').map((analysis) => {
              const isActiveAnalysis = activeAnalysisId === analysis.id
              const isOnSharedOfThisAnalysis = isActiveAnalysis && !activeBranchId
              const isExpanded = expandedAnalyses.has(analysis.id)
              
              return (
                <div key={analysis.id}>
                  {/* Analysis Folder */}
                  <div 
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
                      isOnSharedOfThisAnalysis 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Chevron - toggles expand/collapse */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpanded(analysis.id)
                      }}
                      className="p-0.5 -ml-0.5 hover:bg-gray-200 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className={`w-4 h-4 stroke-[2.5] ${isOnSharedOfThisAnalysis ? 'text-blue-500' : 'text-gray-500'}`} />
                      ) : (
                        <ChevronRight className={`w-4 h-4 stroke-[2.5] ${isOnSharedOfThisAnalysis ? 'text-blue-500' : 'text-gray-500'}`} />
                      )}
                    </button>
                    {/* Title - navigates to analysis */}
                    <button
                      onClick={() => onSelectAnalysis(analysis.id)}
                      className="flex-1 text-left min-w-0"
                    >
                      <span className={`text-sm truncate block ${isOnSharedOfThisAnalysis ? 'font-medium' : 'text-gray-600'}`}>
                        {analysis.title}
                      </span>
                    </button>
                    {analysis.isNew && (
                      <span className="ml-auto w-2 h-2 bg-red-500 rounded-full shrink-0" />
                    )}
                  </div>

                  {/* Branches - show each analysis's own branches when expanded */}
                  {isExpanded && (analysis.branches || []).map((branch) => (
                    <button 
                      key={branch.id}
                      onClick={() => onSelectBranch(branch.id, analysis.id)}
                      className={`w-full flex items-center gap-2 pl-9 pr-3 py-2 rounded-lg transition-colors ${
                        activeBranchId === branch.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <MessageCircle className={`w-4 h-4 ${activeBranchId === branch.id ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div className="flex flex-col items-start min-w-0">
                        <span className={`text-sm truncate ${activeBranchId === branch.id ? 'font-medium' : 'text-gray-600'}`}>
                          {branch.name}
                        </span>
                        <span className="text-xs text-gray-400 truncate">{branch.createdAt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Items */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


