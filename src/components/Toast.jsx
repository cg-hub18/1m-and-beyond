import { useEffect } from 'react'
import { X, CheckCircle } from 'lucide-react'

export default function Toast({ isOpen, onClose, title, message, duration = 4000 }) {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-start gap-3 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[320px] max-w-[400px] overflow-hidden">
        {/* Green left border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-lg" />
        
        {/* Check icon */}
        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-0.5">{message}</p>
        </div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

