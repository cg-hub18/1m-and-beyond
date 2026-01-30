import { useState } from 'react'
import { ChevronDown, ChevronRight, MoreHorizontal, Copy, MessageSquare, Trash2, MessagesSquare } from 'lucide-react'
import Badge from './Badge'
import HypothesisContent from './HypothesisContent'
import RootCauseContent from './RootCauseContent'
import MitigationContent from './MitigationContent'
import AlertContent from './AlertContent'
import ChartContent from './ChartContent'
import SummaryContent from './SummaryContent'

const OpsmateLogo = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_opsmate)">
      <path d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="black"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.86447 11.7354C9.03415 12.215 9.49135 12.5587 10.0292 12.5589C10.567 12.5587 11.0242 12.215 11.1939 11.7354H11.8059C11.6195 12.5442 10.8948 13.1471 10.0292 13.1471C9.16391 13.1471 8.43921 12.5442 8.25244 11.7354H8.86447ZM10.0289 12.5589H10.0295C10.0294 12.5589 10.0293 12.5589 10.0292 12.5589C10.0291 12.5589 10.029 12.5589 10.0289 12.5589Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.77947 7.35303C8.63212 7.35303 9.32359 8.0445 9.32359 8.89715C9.32359 9.74979 8.63212 10.4413 7.77947 10.4413C6.92682 10.4413 6.23535 9.74979 6.23535 8.89715C6.23535 8.0445 6.92682 7.35303 7.77947 7.35303ZM7.77947 7.94126C7.25153 7.94126 6.82359 8.3692 6.82359 8.89715C6.82359 9.42509 7.25153 9.85303 7.77947 9.85303C8.30741 9.85303 8.73535 9.42509 8.73535 8.89715C8.73535 8.3692 8.30741 7.94126 7.77947 7.94126Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2206 7.35303C13.0733 7.35303 13.7647 8.0445 13.7647 8.89715C13.7647 9.74979 13.0733 10.4413 12.2206 10.4413C11.368 10.4413 10.6765 9.74979 10.6765 8.89715C10.6765 8.0445 11.368 7.35303 12.2206 7.35303ZM12.2206 7.94126C11.6927 7.94126 11.2647 8.3692 11.2647 8.89715C11.2647 9.42509 11.6927 9.85303 12.2206 9.85303C12.7486 9.85303 13.1765 9.42509 13.1765 8.89715C13.1765 8.3692 12.7486 7.94126 12.2206 7.94126Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.5295 3.11768C11.8219 3.11768 12.059 3.35473 12.059 3.64709V6.11679C12.2622 6.10503 12.4581 6.0915 12.6472 6.07709V3.68062L13.8525 3.93709C14.7313 4.12415 15.3848 4.84032 15.5083 5.70915C15.5451 5.70209 15.5798 5.69503 15.6128 5.68856C15.746 5.66179 15.8466 5.63973 15.9131 5.62444C15.9463 5.61679 15.971 5.61091 15.9869 5.60709C15.9948 5.60532 16.0007 5.60385 16.0042 5.60297C16.006 5.60268 16.0072 5.60209 16.0078 5.60209H16.008C16.2442 5.5415 16.4845 5.68385 16.5451 5.91973H16.5445C16.6051 6.15588 16.4628 6.39621 16.2269 6.45679C16.2216 6.45826 16.2045 6.46238 16.1948 6.46474C16.1751 6.46944 16.1469 6.47621 16.1098 6.48473C16.036 6.5015 15.9275 6.52532 15.786 6.55385C15.703 6.57032 15.6086 6.58856 15.503 6.60797C15.5201 6.7165 15.5293 6.82797 15.5293 6.94121V13.2941C15.5293 14.4544 14.596 15.3971 13.439 15.4118H11.7057C11.5716 15.5903 11.3581 15.7059 11.1175 15.7059H8.88219C8.64161 15.7059 8.42808 15.5903 8.29396 15.4118H6.56069C5.40364 15.3974 4.47043 14.4547 4.47043 13.2944V6.9415C4.47043 6.82797 4.47955 6.71679 4.49661 6.60826C4.39102 6.58885 4.29658 6.57091 4.21364 6.55415C4.0722 6.52591 3.96396 6.50209 3.88984 6.48503C3.85278 6.4765 3.82452 6.46973 3.80481 6.46503C3.79511 6.46268 3.77805 6.45856 3.77275 6.45709C3.53687 6.3965 3.39455 6.15591 3.45511 5.92003C3.51569 5.68415 3.75628 5.54182 3.99217 5.60238H3.99249C3.99308 5.60241 3.99425 5.60297 3.99599 5.60326C3.99952 5.60415 4.00543 5.60532 4.01337 5.60738C4.02925 5.61121 4.05396 5.61709 4.08719 5.62473C4.15337 5.64003 4.25425 5.66209 4.38749 5.68885C4.42043 5.69562 4.45511 5.70238 4.49187 5.70944C4.6154 4.84062 5.26893 4.12444 6.14775 3.93738L7.35308 3.68091V6.07738C7.5422 6.09179 7.73808 6.10532 7.94131 6.11709V3.64709C7.94131 3.35473 8.17837 3.11768 8.47072 3.11768H11.5295ZM14.5543 6.76062C13.4845 6.91003 11.9348 7.05885 10.0004 7.05885C8.06599 7.05885 6.51599 6.91032 5.44658 6.76062C5.42011 6.75679 5.39393 6.75326 5.36805 6.74944C5.35805 6.81179 5.35308 6.87591 5.35308 6.94121V13.2941C5.35308 13.9765 5.90602 14.5294 6.58837 14.5294H8.29425C8.42837 14.3509 8.6419 14.2353 8.88249 14.2353H11.1178C11.3584 14.2353 11.5719 14.3509 11.706 14.5294H13.4119C14.0943 14.5294 14.6472 13.9765 14.6472 13.2941H14.6478V6.94121C14.6478 6.87591 14.6425 6.81209 14.6328 6.74944C14.6069 6.75326 14.5807 6.75679 14.5543 6.76062ZM9.20602 3.94121C9.05984 3.94121 8.94131 4.05973 8.94131 4.20591V4.35003C8.94131 4.87356 9.17396 5.37032 9.57628 5.70562L9.83072 5.91768C9.87984 5.95856 9.94014 5.97915 10.0001 5.97915C10.0601 5.97915 10.1204 5.95856 10.1695 5.91768L10.424 5.70562C10.8263 5.37032 11.059 4.87385 11.059 4.35003V4.20591C11.059 4.05973 10.9404 3.94121 10.7943 3.94121H9.20602Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_opsmate">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

export default function SectionCard({ section, isExpanded, onToggle, onMitigate, isSharedView = false, isReadOnly = false, onAskOpsmate, onRemove, onCopy, onReferenceInSEVChat }) {
  const [showMarkDropdown, setShowMarkDropdown] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [markedAs, setMarkedAs] = useState(null)

  const handleRemove = () => {
    onRemove?.(section)
  }

  const handleReferenceInSEVChat = () => {
    onReferenceInSEVChat?.(section)
    setShowMoreMenu(false)
  }

  const handleMarkAs = (status) => {
    setMarkedAs(status)
    setShowMarkDropdown(false)
  }

  const handleCopy = () => {
    const sectionData = {
      type: 'opsmate-widget',
      section: {
        ...section,
        id: undefined,
      }
    }
    navigator.clipboard.writeText(JSON.stringify(sectionData))
    setShowMoreMenu(false)
    onCopy?.(section)
  }

  const handleAskOpsmateFromMenu = () => {
    onAskOpsmate?.(section)
    setShowMoreMenu(false)
  }

  const handleRemoveFromMenu = () => {
    onRemove?.(section)
    setShowMoreMenu(false)
  }

  const renderContent = () => {
    if (!section.content) return null
    
    switch (section.type) {
      case 'hypothesis':
        return <HypothesisContent content={section.content} />
      case 'root-cause':
        return <RootCauseContent content={section.content} />
      case 'mitigation':
        return <MitigationContent content={section.content} onMitigate={onMitigate} />
      case 'alert':
        return <AlertContent content={section.content} />
      case 'chart':
        return <ChartContent content={section.content} />
      case 'summary':
        return <SummaryContent content={section.content} />
      default:
        return null
    }
  }

  const showPriority = ['hypothesis', 'root-cause', 'mitigation'].includes(section.type)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggle}
            className="p-0.5 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">{section.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">Created by</span>
              <div className="flex items-center gap-1.5">
                {section.avatar ? (
                  <img 
                    src={section.avatar} 
                    alt={section.createdBy} 
                    className="w-4 h-4 rounded-full object-cover"
                  />
                ) : (
                  <OpsmateLogo />
                )}
                <span className="text-xs text-gray-700">{section.createdBy}</span>
              </div>
              {showPriority && section.priority && (
                <>
                  <span className="text-gray-300">•</span>
                  <Badge variant={section.priority.toLowerCase()}>{section.priority}</Badge>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions - Hide in read-only mode */}
        {!isReadOnly && (
          <div className="flex items-center gap-2">
            {/* Mark as Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowMarkDropdown(!showMarkDropdown)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  markedAs === 'validated' 
                    ? 'text-green-700 bg-green-50 hover:bg-green-100' 
                    : markedAs === 'invalidated'
                    ? 'text-pink-700 bg-pink-50 hover:bg-pink-100'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {markedAs && (
                  <img 
                    src="/profile.jpg" 
                    alt="User" 
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                {markedAs === 'validated' ? 'Validated' : markedAs === 'invalidated' ? 'Invalidated' : 'Mark as'}
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {showMarkDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowMarkDropdown(false)} 
                  />
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-40 py-1">
                    <button
                      onClick={() => handleMarkAs('validated')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                        markedAs === 'validated' ? 'border-green-500 bg-green-500' : 'border-gray-300'
                      }`}>
                        {markedAs === 'validated' && (
                          <span className="w-1 h-1 bg-white rounded-full" />
                        )}
                      </span>
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded">Validated</span>
                    </button>
                    <button
                      onClick={() => handleMarkAs('invalidated')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                        markedAs === 'invalidated' ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
                      }`}>
                        {markedAs === 'invalidated' && (
                          <span className="w-1 h-1 bg-white rounded-full" />
                        )}
                      </span>
                      <span className="text-xs font-medium text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">Invalidated</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Ask Opsmate Button */}
            {!isSharedView && (
              <button 
                onClick={() => onAskOpsmate?.(section)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Ask Opsmate
              </button>
            )}


            {/* Remove Button - Only on shared view for non-base widgets */}
            {isSharedView && !['hypothesis', 'root-cause', 'mitigation'].includes(section.type) && (
              <button 
                onClick={handleRemove}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Remove
              </button>
            )}

            {/* More Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>

              {showMoreMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowMoreMenu(false)} 
                  />
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-40 py-1">
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Copy</span>
                    </button>
                    {isSharedView ? (
                      <button
                        onClick={handleReferenceInSEVChat}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <MessagesSquare className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Quote in SEVchat</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleAskOpsmateFromMenu}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Ask Opsmate</span>
                      </button>
                    )}
                    {!isSharedView && (
                      <button
                        onClick={handleRemoveFromMenu}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-600">Remove</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {isExpanded && section.content && (
        <div className="px-5 py-4">
          {renderContent()}
        </div>
      )}
    </div>
  )
}
