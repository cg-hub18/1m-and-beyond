import { useState, useRef, useEffect } from 'react'
import { Share2, User, Users, PanelLeft, Flame, GitBranch, Loader2, Pencil, MessageCircle, MessagesSquare } from 'lucide-react'

export default function Header({ investigationId, title, activeCanvasTab, onCanvasTabChange, onShare, onToggleNav, onCreateBranch, isCreatingBranch, activeBranch, hasNotification, analysisTitle, onRenameBranch, isReadOnly = false, sharedIsBranch = false, onToggleSEVChat, isSEVChatOpen }) {
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
    <header className="h-16 bg-white border-b border-gray-200 shrink-0 flex items-center justify-between pl-4 pr-4">
      {/* Left - Nav Icon + Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleNav}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <PanelLeft className="w-5 h-5 text-gray-600" />
          {hasNotification && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>
        <div>
          <h1 className={`flex items-center gap-2 text-[15px] font-medium text-gray-900 leading-tight group ${isEditing ? 'mb-1' : ''}`}>
            {isOnBranch && <MessageCircle className="w-4 h-4 text-gray-900" />}
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
        </div>
      </div>

      {/* Center - Canvas Tabs (commented out for now)
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-full">
          <button
            onClick={() => onCanvasTabChange('personal')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCanvasTab === 'personal'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Personal Canvas
          </button>
          <button
            onClick={() => onCanvasTabChange('shared')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCanvasTab === 'shared'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Shared Canvas
          </button>
        </div>
      </div>
      */}

      {/* Right - Actions (hidden in read-only mode) */}
      {!isReadOnly && (
        <div className="flex items-center gap-2">
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
          {/* SEVchat button - only show on Shared Investigation (not on branches) */}
          {!isOnBranch && onToggleSEVChat && (
            <button 
              onClick={onToggleSEVChat}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isSEVChatOpen 
                  ? 'text-green-700 bg-green-100 hover:bg-green-200' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <MessagesSquare className="w-4 h-4" />
              {isSEVChatOpen ? 'Close SEVchat' : 'Open SEVchat'}
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
