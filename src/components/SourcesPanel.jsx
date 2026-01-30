import { X, FileText, Flame } from 'lucide-react'

export default function SourcesPanel({ isOpen, onClose }) {
  const citedSources = [
    {
      id: 'cited-1',
      type: 'runbook',
      title: 'Adaptive Runbook',
      reference: 'R1085252',
      quotes: [
        'Etiam et malesuada metus. In risus sem, convallis sit amet diam sit amet, semper dictum tellus.',
        'Mauris malesuada aliquet facilisis. Proin condimentum ligula ac nibh auctor mattis.',
      ],
    },
    {
      id: 'cited-2',
      type: 'runbook',
      title: 'Adaptive Runbook',
      reference: 'R1085252',
      quotes: [
        'Curabitur quis magna maximus elit euismod volutpat.',
        'Phasellus semper venenatis magna non ornare. Nulla lobortis elit in varius convallis. Donec finibus tellus id nulla dictum aliquam.',
      ],
    },
  ]

  const otherSources = [
    { id: 'other-1', type: 'sev', title: 'SEV', reference: 'S515819' },
    { id: 'other-2', type: 'sev', title: 'SEV', reference: 'S495815' },
    { id: 'other-3', type: 'sev', title: 'SEV', reference: 'S675916' },
    { id: 'other-4', type: 'runbook', title: 'Runbook', reference: 'R1085551' },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'sev':
        return <Flame className="w-4 h-4 text-gray-400" />
      case 'runbook':
        return <FileText className="w-4 h-4 text-gray-400" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div 
      className={`bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-[380px] opacity-100' : 'w-0 opacity-0 border-l-0'
      }`}
    >
      <div className="min-w-[380px] flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Sources</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Cited Sources */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Cited sources</h3>
            <p className="text-sm text-gray-500 mb-4">{citedSources.length} Sources</p>
            
            <div className="space-y-6">
              {citedSources.map((source) => (
                <div key={source.id} className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{source.title}</p>
                    <div className="flex items-center gap-1.5">
                      {getIcon(source.type)}
                      <a 
                        href="#" 
                        className="text-sm text-blue-600 hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        {source.reference}
                      </a>
                    </div>
                  </div>
                  
                  {source.quotes && (
                    <div className="space-y-3">
                      {source.quotes.map((quote, index) => (
                        <blockquote 
                          key={index}
                          className="pl-3 border-l-2 border-gray-300 text-sm text-gray-600 leading-relaxed"
                        >
                          {quote}
                        </blockquote>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Other Sources */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Other sources</h3>
            <p className="text-sm text-gray-500 mb-4">{otherSources.length} Sources</p>
            
            <div className="space-y-4">
              {otherSources.map((source) => (
                <div key={source.id}>
                  <p className="text-sm font-semibold text-gray-900">{source.title}</p>
                  <div className="flex items-center gap-1.5">
                    {getIcon(source.type)}
                    <a 
                      href="#" 
                      className="text-sm text-blue-600 hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      {source.reference}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

