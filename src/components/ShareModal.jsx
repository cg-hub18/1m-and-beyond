import { useState, useMemo } from 'react'
import { X, Check } from 'lucide-react'

export default function ShareModal({ 
  isOpen, 
  onClose, 
  activeBranchId, 
  activeAnalysisId, 
  currentSections = [],
  currentTitle = '',
  currentBranchName = ''
}) {
  const [copied, setCopied] = useState(false)

  // Generate shareable link with encoded sections data
  const shareableLink = useMemo(() => {
    try {
      const sectionsToShare = currentSections.map(s => ({
        id: s.id,
        type: s.type,
        title: s.title,
        createdBy: s.createdBy,
        priority: s.priority,
        isExpanded: s.isExpanded,
        content: s.content,
      }))

      const shareData = {
        sections: sectionsToShare,
        title: activeBranchId ? currentBranchName : currentTitle,
        isBranch: !!activeBranchId
      }

      const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)))
      const shareId = activeBranchId || activeAnalysisId || 'main'
      return `${window.location.origin}${window.location.pathname}?shared=${shareId}&data=${encoded}`
    } catch {
      const shareId = activeBranchId || activeAnalysisId || 'main'
      return `${window.location.origin}${window.location.pathname}?shared=${shareId}`
    }
  }, [currentSections, activeBranchId, activeAnalysisId, currentTitle, currentBranchName])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl animate-fade-in pointer-events-auto mx-4">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Share Investigation Canvas</h2>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              When you share, others will be able to see the Canvas in read-only mode but not your conversation with Opsmate. Only share{' '}
              <a href="#" className="text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>DSS3</a>
              {' '}or{' '}
              <a href="#" className="text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>DSS4</a>
              {' '}information with those who need it.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors -mt-1 -mr-1"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shareable Link
          </label>
          <input
            type="text"
            readOnly
            value={shareableLink}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 truncate"
          />

          <button
            onClick={handleCopyLink}
            className={`w-full mt-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Link Copied!
              </>
            ) : (
              'Copy Link'
            )}
          </button>
        </div>
        </div>
      </div>
    </>
  )
}
