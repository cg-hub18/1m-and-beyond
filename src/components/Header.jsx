import { useState, useRef, useEffect } from 'react'
import { Share2, PanelLeft, Flame, Loader2, Pencil, MessageCircle } from 'lucide-react'

export default function Header({ investigationId, title, activeCanvasTab, onCanvasTabChange, onShare, onToggleNav, onCreateBranch, isCreatingBranch, activeBranch, hasNotification, analysisTitle, onRenameBranch, isReadOnly = false, sharedIsBranch = false }) {
  const isOnBranch = !!activeBranch || sharedIsBranch
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const inputRef = useRef(null)

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleStartEditing = () => {
    setEditedName(activeBranch?.name || '')
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedName.trim() && onRenameBranch) {
      onRenameBranch(activeBranch.id, editedName.trim())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <header className={`${isOnBranch ? 'h-auto pt-3 pb-0' : 'h-16'} bg-white border-b border-gray-200 shrink-0 flex items-center justify-between pl-6 pr-4`}>
      {/* Left - Nav Icon + Title */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className={`flex items-center gap-2 text-[15px] font-medium text-gray-900 leading-tight group ${isEditing ? 'mb-1' : ''}`}>
            {isOnBranch ? (
              // If in read-only mode or no activeBranch, just show the title
              isReadOnly || !activeBranch ? (
                <span>{analysisTitle || 'Branch'}</span>
              ) : isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-100 px-1.5 py-0 rounded text-[15px] font-medium text-gray-900 outline-none focus:ring-1 focus:ring-blue-500 h-[22px]"
                />
              ) : (
                <>
                  <span>{activeBranch.name}</span>
                  <button
                    onClick={handleStartEditing}
                    className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </>
              )
            ) : (
              analysisTitle || 'Shared Investigation'
            )}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            {!isOnBranch && (
              <>
                <span>Opsmate Analysis on Dec 18, 2025, 8:42 AM</span>
                <span>•</span>
              </>
            )}
            <span className="text-blue-600 font-medium">OM48164</span>
            <span>•</span>
            <span>Regression:</span>
            <a 
              href="https://www.internalfb.com/sevmanager/view/553136" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-xs font-medium transition-colors"
            >
              <Flame className="w-3 h-3" />
              S590877
            </a>
          </div>
          {isOnBranch && (
            <div className="flex gap-6 mt-2 -mb-[1px]">
              <button
                onClick={() => onCanvasTabChange('shared')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeCanvasTab === 'shared'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Shared
              </button>
              <button
                onClick={() => onCanvasTabChange('personal')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeCanvasTab === 'personal'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Personal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right - Actions (hidden in read-only mode) */}
      {!isReadOnly && (
        <div className="flex items-center gap-2">
          {!isOnBranch && (
            <button 
              onClick={onCreateBranch}
              disabled={isCreatingBranch}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isCreatingBranch ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4" />
              )}
              {isCreatingBranch ? 'Creating...' : 'New Opsmate Chat'}
            </button>
          )}
          <button 
            onClick={onShare}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      )}
    </header>
  )
}
