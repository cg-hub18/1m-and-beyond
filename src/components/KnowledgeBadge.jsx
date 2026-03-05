import { useState } from 'react'
import { Zap, ChevronRight } from 'lucide-react'

export default function KnowledgeBadge({ sources = [] }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!sources.length) return null

  return (
    <div className="my-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[13px] text-amber-700 hover:bg-amber-100 transition-colors"
      >
        <Zap size={13} className="text-amber-500" />
        <span className="font-medium">Knowledge recalled({sources.length})</span>
        <ChevronRight
          size={13}
          className={`text-amber-400 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-4 space-y-1">
          {sources.map((source, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {source}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
