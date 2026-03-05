import { useState } from 'react'
import { CheckCircle2, ChevronRight } from 'lucide-react'

export default function ReasoningBlock({ title, status = 'completed', defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="my-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 w-full text-left group"
      >
        {status === 'completed' && (
          <CheckCircle2 size={14} className="text-gray-400 flex-shrink-0" />
        )}
        <span className="text-[15px] font-semibold text-gray-900 group-hover:text-gray-700">
          {title}
        </span>
        <ChevronRight
          size={16}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-[30px] border-l-2 border-gray-100 ml-[8px]">
          {children}
        </div>
      </div>
    </div>
  )
}
