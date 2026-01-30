import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Send, X, FileText, CornerDownRight, Lightbulb, Target, Shield, AlertTriangle, BarChart3 } from 'lucide-react'

// Get icon based on widget type
const getWidgetIcon = (type) => {
  switch (type) {
    case 'hypothesis': return Lightbulb
    case 'root-cause': return Target
    case 'mitigation': return Shield
    case 'alert': return AlertTriangle
    case 'chart': return BarChart3
    default: return FileText
  }
}

const getWidgetColor = (type) => {
  switch (type) {
    case 'hypothesis': return 'text-amber-500 bg-amber-50'
    case 'root-cause': return 'text-purple-500 bg-purple-50'
    case 'mitigation': return 'text-green-500 bg-green-50'
    case 'alert': return 'text-red-500 bg-red-50'
    case 'chart': return 'text-blue-500 bg-blue-50'
    default: return 'text-gray-500 bg-gray-50'
  }
}

const participants = [
  { id: 'user', name: 'You', avatar: '/profile.jpg', color: 'bg-blue-500' },
  { id: 'sev-manager', name: 'SEV Manager', avatar: null, initials: '🔥', color: 'bg-red-500', isBot: true },
  { id: 'jamie', name: 'Jamie Gomez', avatar: null, initials: 'JG', color: 'bg-purple-500' },
  { id: 'alex', name: 'Alex Chen', avatar: null, initials: 'AC', color: 'bg-green-500' },
  { id: 'sarah', name: 'Sarah Kim', avatar: null, initials: 'SK', color: 'bg-orange-500' },
]

const SEVChat = forwardRef(function SEVChat({ isOpen, onClose }, ref) {
  const [message, setMessage] = useState('')
  const [quotedSection, setQuotedSection] = useState(null)
  const inputRef = useRef(null)
  const sevManagerMessage = `This is a group thread for discussing SEV2 S553136 "Taylor Swift - Life of a Showgirl - Only In Polish". All comments, photos etc in this thread will be visible via SEVManager's UI for this SEV. The SEV URL is available in the chat description.

here is a list of SEV Manager Bot commands:
🐮 #status_update - Adds a status update comment to the SEV
🤔 #help - List all supported commands
⏳ #add_to_timeline - Add an event to the timeline of the associated SEV
📞 #robodial - Robodials the provided oncall, name, unixname, or diff author
🔎 #canvasdoc - Adds a query to the investigation document
📝 #sev_report - List the missing required fields of the SEV Report
🤖 #sevmate - Runs auto root cause analysis
📝 #sev_summarize - Generates a summary of the SEV and sends it as a private message to you only`

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: participants[1], // SEV Manager
      content: sevManagerMessage,
      timestamp: '8:42 AM',
    },
    {
      id: 2,
      sender: participants[2], // Jamie
      content: "Hey team, looking into this now. Seems like a localization issue with the content feed.",
      timestamp: '8:45 AM',
    },
    {
      id: 3,
      sender: participants[3], // Alex
      content: "I can confirm - seeing users in multiple regions only getting Polish audio/subtitles. Let me check the CDN configs.",
      timestamp: '8:47 AM',
    },
    {
      id: 4,
      sender: participants[4], // Sarah
      content: "I'll check if there were any recent content publishing changes that could have caused this.",
      timestamp: '8:48 AM',
    },
  ])
  const chatContainerRef = useRef(null)

  // Expose addReference method to parent - now sets quote instead of sending
  useImperativeHandle(ref, () => ({
    addReference: (section) => {
      setQuotedSection(section)
      // Focus the input after setting quote
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }))

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!message.trim() && !quotedSection) return

    const newMessage = {
      id: Date.now(),
      sender: participants[0],
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      // Include quoted section if present
      quotedSection: quotedSection ? {
        title: quotedSection.title,
        type: quotedSection.type,
      } : null,
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    setQuotedSection(null)

    // Simulate a response after a short delay
    setTimeout(() => {
      const responders = [participants[2], participants[3], participants[4]] // Jamie, Alex, Sarah (not SEV Manager)
      const randomResponder = responders[Math.floor(Math.random() * responders.length)]
      const responses = quotedSection ? [
        "Thanks for sharing that! Let me take a look.",
        "Good find, this could be relevant.",
        "Interesting, I'll review this.",
        "Got it, adding this to my notes.",
      ] : [
        "Good point, let me check on that.",
        "I'll take a look at this.",
        "Thanks for the update!",
        "Agreed, let's coordinate on this.",
        "I'm seeing the same thing on my end.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: randomResponder,
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      }])
    }, 1500 + Math.random() * 2000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
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
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-green-50">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {participants.filter(p => !p.isBot && p.id !== 'user').map((p) => (
                <div 
                  key={p.id}
                  className={`w-7 h-7 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-medium ring-2 ring-white`}
                >
                  {p.initials}
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">SEVchat</h2>
              <p className="text-xs text-gray-500">{participants.length} participants</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Participants Bar */}
        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            <span className="font-medium">In this chat:</span>
            {participants.filter(p => !p.isBot).map((p, i, arr) => (
              <span key={p.id}>
                {p.name}{i < arr.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((msg) => {
            const isOwnMessage = msg.sender.id === 'user'
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div 
                  className={`w-8 h-8 rounded-full ${msg.sender.color} flex items-center justify-center text-white text-xs font-medium shrink-0`}
                >
                  {msg.sender.avatar ? (
                    <img src={msg.sender.avatar} alt={msg.sender.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : msg.sender.isBot ? (
                    <span className="text-base">{msg.sender.initials}</span>
                  ) : (
                    msg.sender.initials || msg.sender.name.charAt(0)
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-700">{msg.sender.name}</span>
                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  </div>
                  {msg.isReference ? (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">Referenced from Canvas</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {/* Show quoted section preview card if present */}
                      {msg.quotedSection && (() => {
                        const WidgetIcon = getWidgetIcon(msg.quotedSection.type)
                        const colorClass = getWidgetColor(msg.quotedSection.type)
                        return (
                          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm max-w-[220px]">
                            <div className="flex items-start gap-2.5">
                              <div className={`p-1.5 rounded-lg ${colorClass}`}>
                                <WidgetIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400 mb-0.5">From Canvas</p>
                                <p className="text-sm font-medium text-gray-800 truncate">{msg.quotedSection.title}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                      {msg.content && (
                        <div 
                          className={`px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                            isOwnMessage 
                              ? 'bg-blue-500 text-white rounded-br-md' 
                              : 'bg-gray-100 text-gray-800 rounded-bl-md'
                          }`}
                        >
                          {msg.content}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Input */}
        <div className="border-t border-gray-100">
          {/* Quote Preview */}
          {quotedSection && (() => {
            const WidgetIcon = getWidgetIcon(quotedSection.type)
            const colorClass = getWidgetColor(quotedSection.type)
            return (
              <div className="px-4 pt-3 pb-0">
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <div className={`p-1.5 rounded-lg ${colorClass}`}>
                      <WidgetIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-0.5">Quoting from Canvas</p>
                      <p className="text-sm font-medium text-gray-800">{quotedSection.title}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setQuotedSection(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors ml-2"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            )
          })()}
          <div className="p-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={quotedSection ? "Add a comment..." : "Type a message..."}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!message.trim() && !quotedSection}
                className="p-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default SEVChat
