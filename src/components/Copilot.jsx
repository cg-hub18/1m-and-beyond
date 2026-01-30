import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { FileText, Clock, Paperclip, ArrowUp, List, CornerDownRight, X } from 'lucide-react'

function OpsmateLogo({ className }) {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0206 15.0256C10.3164 15.8619 11.1136 16.4613 12.0513 16.4615C12.9891 16.4613 13.7863 15.8619 14.0821 15.0256H15.1493C14.8242 16.4359 13.5606 17.4872 12.0514 17.4872C10.5427 17.4872 9.27906 16.4359 8.95341 15.0256H10.0206ZM12.0508 16.4615H12.0519C12.0517 16.4615 12.0515 16.4615 12.0513 16.4615C12.0512 16.4615 12.051 16.4615 12.0508 16.4615Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.12879 7.38461C9.61545 7.38462 10.8211 8.59026 10.8211 10.0769C10.8211 11.5636 9.61545 12.7692 8.12879 12.7692C6.64213 12.7692 5.43649 11.5636 5.43649 10.0769C5.43649 8.59026 6.64213 7.38461 8.12879 7.38461ZM8.12879 8.41026C7.20828 8.41026 6.46213 9.15641 6.46213 10.0769C6.46213 10.9974 7.20828 11.7436 8.12879 11.7436C9.0493 11.7436 9.79546 10.9974 9.79546 10.0769C9.79546 9.15641 9.0493 8.41026 8.12879 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.8724 7.38461C17.359 7.38462 18.5647 8.59026 18.5647 10.0769C18.5647 11.5636 17.359 12.7692 15.8724 12.7692C14.3857 12.7692 13.1801 11.5636 13.1801 10.0769C13.1801 8.59026 14.3857 7.38461 15.8724 7.38461ZM15.8724 8.41026C14.9519 8.41026 14.2057 9.15641 14.2057 10.0769C14.2057 10.9974 14.9519 11.7436 15.8724 11.7436C16.7929 11.7436 17.5391 10.9974 17.5391 10.0769C17.5391 9.15641 16.7929 8.41026 15.8724 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6673 0C15.177 6.43207e-06 15.5903 0.413337 15.5903 0.923077V5.22922C15.9447 5.2087 16.2862 5.18513 16.616 5.16001V0.98152L18.7175 1.42874C20.2498 1.75489 21.3893 3.00361 21.6047 4.51848C21.6688 4.50617 21.7293 4.49385 21.7867 4.48257C22.019 4.43591 22.1944 4.39746 22.3103 4.37079C22.3683 4.35746 22.4114 4.34716 22.439 4.34049C22.4529 4.33742 22.4631 4.33487 22.4693 4.33333C22.4724 4.33282 22.4744 4.33178 22.4755 4.33178H22.476C22.8877 4.22614 23.3067 4.47435 23.4123 4.88562H23.4113C23.517 5.29741 23.2688 5.71642 22.8575 5.82206C22.8483 5.82463 22.8185 5.83178 22.8016 5.83589C22.7673 5.84409 22.718 5.85592 22.6534 5.87079C22.5247 5.90002 22.3354 5.94154 22.0888 5.99129C21.9442 6.02 21.7795 6.05179 21.5954 6.08564C21.6252 6.27487 21.6411 6.46923 21.6411 6.66667V17.7436C21.6411 19.7667 20.0139 21.4103 17.9965 21.4359H14.9744C14.7406 21.7472 14.3683 21.9487 13.9488 21.9487H10.0514C9.63189 21.9487 9.25958 21.7472 9.02573 21.4359H6.00364C3.98621 21.4108 2.35906 19.7672 2.35906 17.7441V6.66717C2.35906 6.46922 2.37494 6.27536 2.40469 6.08614C2.22058 6.05229 2.05596 6.02102 1.91135 5.99179C1.66469 5.94256 1.47597 5.90104 1.34674 5.87129C1.28213 5.85642 1.23287 5.84459 1.19851 5.83639C1.18158 5.83228 1.15184 5.82513 1.14262 5.82257C0.731345 5.71692 0.483149 5.29744 0.58878 4.88617C0.694421 4.47489 1.1139 4.2267 1.52518 4.33233H1.52573C1.52676 4.33235 1.5288 4.33332 1.53184 4.33383C1.53799 4.33537 1.54829 4.33746 1.56214 4.34105C1.58983 4.34771 1.63291 4.35796 1.69084 4.37129C1.80623 4.39796 1.98213 4.43641 2.21443 4.48307C2.27187 4.49487 2.33237 4.50667 2.39647 4.51898C2.61186 3.00411 3.75134 1.75539 5.28364 1.42924L7.3852 0.982071V5.16051C7.71494 5.18563 8.05649 5.20925 8.41085 5.22977V0.923077C8.41085 0.413333 8.82418 0 9.33392 0H14.6673ZM19.9411 6.35181C18.076 6.61233 15.3739 6.87179 12.0011 6.87179C8.62827 6.87179 5.9257 6.61284 4.06109 6.35181C4.01493 6.34515 3.96929 6.339 3.92417 6.33233C3.90673 6.44104 3.89803 6.55283 3.89803 6.66667V17.7436C3.89803 18.9333 4.86213 19.8974 6.05187 19.8974H9.02623C9.26008 19.5862 9.63239 19.3846 10.0519 19.3846H13.9493C14.3688 19.3846 14.7411 19.5862 14.9749 19.8974H17.9493C19.139 19.8974 20.1032 18.9333 20.1032 17.7436H20.1042V6.66667C20.1042 6.55283 20.0949 6.44155 20.078 6.33233C20.0329 6.339 19.9872 6.34515 19.9411 6.35181ZM10.616 1.4359C10.3611 1.4359 10.1544 1.64256 10.1544 1.89744V2.14874C10.1544 3.06155 10.5601 3.92771 11.2616 4.51232L11.7052 4.88206C11.7909 4.95333 11.896 4.98923 12.0006 4.98923C12.1052 4.98923 12.2103 4.95334 12.296 4.88206L12.7396 4.51232C13.4411 3.92771 13.8467 3.06206 13.8467 2.14874V1.89744C13.8467 1.64257 13.6401 1.4359 13.3852 1.4359H10.616Z" fill="currentColor"/>
    </svg>
  )
}

const Copilot = forwardRef(function Copilot({ onOpenSources, onOpenSteps, onAddSection, onViewSharedCanvas }, ref) {
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('runbook')
  const [isThinking, setIsThinking] = useState(false)
  const [referencedSection, setReferencedSection] = useState(null)
  const chatContainerRef = useRef(null)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'initial',
      type: 'assistant',
      content: "Hi! I'm Opsmate. I can help you investigate this SEV, find relevant data, and explore potential solutions.",
      followUp: 'What would you like to explore?',
      quickActions: [
        { id: 'summarize', label: 'Summarize SEV' },
        { id: 'datasets', label: 'Find relevant datasets' },
        { id: 'recovery', label: 'Find recovery metric' },
        { id: 'similar', label: 'Find similar SEVs' },
      ],
    },
  ])
  const [stepCount, setStepCount] = useState(3) // Start with some initial steps
  const MAX_STEPS = 19 // Must match allSteps array length in StepsPanel
  
  // Generate random steps between min and max (inclusive)
  const getRandomSteps = (min = 1, max = 4) => Math.floor(Math.random() * (max - min + 1)) + min

  const tabs = [
    { id: 'runbook', label: 'Runbook', icon: FileText },
    { id: 'sev', label: 'SEV', icon: Clock },
  ]

  // Scroll to bottom when new messages are added or when thinking starts
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatMessages, isThinking])

  const triggerMitigation = async () => {
    // Start thinking
    setIsThinking(true)

    // Simulate mitigation running for 3.5 seconds
    await new Promise(resolve => setTimeout(resolve, 3500))

    // Stop thinking
    setIsThinking(false)

    // Update step count with random steps
    const steps = getRandomSteps(1, 3)
    setStepCount(prev => Math.min(prev + steps, MAX_STEPS))

    // Add new message to chat
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: steps,
      },
      content: "Mitigation has been initiated successfully. I've set up enhanced monitoring and alerting for all critical dependencies. You'll receive notifications if any anomalies are detected. The changes are now live and being tracked.",
      quickActions: [
        { id: 'status', label: 'Check mitigation status' },
        { id: 'rollback', label: 'Rollback changes' },
      ],
    }

    setChatMessages(prev => [...prev, newMessage])
  }

  const triggerPromotion = async (sectionTitle) => {
    // Add new message to chat acknowledging promotion
    const steps = getRandomSteps(1, 2)
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: steps,
      },
      content: `Promotion to shared canvas is done. The "${sectionTitle}" widget is now visible to all team members on the shared canvas.`,
      quickActions: [
        { id: 'view-shared', label: 'View shared canvas' },
      ],
    }

    setChatMessages(prev => [...prev, newMessage])
    setStepCount(prev => Math.min(prev + steps, MAX_STEPS))
  }

  const setReference = (section) => {
    setReferencedSection(section)
  }

  const clearReference = () => {
    setReferencedSection(null)
  }

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    triggerMitigation,
    triggerPromotion,
    setReference
  }))

  const handleSendMessage = async () => {
    if (!message.trim() && !referencedSection) return

    const userMessage = message.trim()
    const referenced = referencedSection

    // Clear input and reference
    setMessage('')
    setReferencedSection(null)

    // Add user message to chat
    const userChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userMessage || 'What can you tell me about this?',
      reference: referenced ? referenced.title : null,
    }
    setChatMessages(prev => [...prev, userChatMessage])

    // Start thinking
    setIsThinking(true)

    // Simulate thinking
    await new Promise(resolve => setTimeout(resolve, 7000))

    // Stop thinking
    setIsThinking(false)

    // Add Opsmate response
    const responseSteps = getRandomSteps(1, 3)
    const opsmateResponse = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: responseSteps,
      },
      content: referenced 
        ? `I see you're asking about "${referenced.title}". What would you like me to do with this?`
        : `I understand. How would you like me to help with this?`,
      inlineActions: [
        { id: 're-run', label: 'Re-run analysis' },
        { id: 'more-context', label: 'Get more context' },
        { id: 'explain', label: 'Explain in detail' },
        { id: 'compare', label: 'Compare with similar' },
      ],
    }

    setChatMessages(prev => [...prev, opsmateResponse])
    setStepCount(prev => Math.min(prev + responseSteps, MAX_STEPS))
  }

  const handleQuickAction = async (actionId, actionLabel) => {
    // Handle view shared canvas action immediately
    if (actionId === 'view-shared') {
      onViewSharedCanvas?.()
      return
    }

    // Handle summarize SEV action
    if (actionId === 'summarize') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 5000))
      setIsThinking(false)

      const summarySteps = getRandomSteps(2, 4)
      const summaryMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: summarySteps,
        },
        content: `Taylor Swift is a Superstar Creator and one of the most famous living popstars. Taylor Swift currently has 79M followers on Facebook, 280M followers on Instagram, and 61M followers on YouTube.

Her recent posts have had some challenges with unconnected distribution. Because of this, and because Taylor Swift's team will post her content simultaneously to multiple platforms, the Creator Forensics team filed T234502850 to proactively monitor the distribution of her announcement for her latest "Life of a Showgirl" album.`,
        quickActions: [
          { id: 'add-to-canvas', label: 'Add to Canvas' },
        ],
      }

      setChatMessages(prev => [...prev, summaryMessage])
      setStepCount(prev => Math.min(prev + summarySteps, MAX_STEPS))
      return
    }

    // Handle find relevant datasets action
    if (actionId === 'datasets') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 6000))
      setIsThinking(false)

      const datasetsSteps = getRandomSteps(3, 5)
      const datasetsMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: datasetsSteps,
        },
        richContent: {
          type: 'datasets',
          intro: 'I found 3 relevant datasets for this SEV investigation:',
          datasets: [
            {
              name: 'non_kfs_overload_test_metrics_raw',
              confidence: 0.85,
              reasoning: 'This dataset is directly related to overload testing and was discovered through both the SEV owner\'s oncall relationships (keanu oncall) and the service connection (overload_protection/test_determinator). Given the SEV is about "Demand shift test with multifeed shrink test", this dataset is highly relevant for investigating overload and demand shift scenarios.',
            },
            {
              name: 'kfs_metrics',
              confidence: 0.65,
              reasoning: 'Found through semantic search for "overload test metrics keanu". This dataset tracks KFS (Kernel Feature Store) metrics which are commonly used for monitoring system performance during load tests and demand shifts. The connection to overload testing makes it relevant for this SEV investigation.',
            },
            {
              name: 'keanu_monitor_service_metrics',
              confidence: 0.60,
              reasoning: 'Discovered through the SEV owner\'s oncall ownership (keanu oncall). This dataset monitors the keanu service metrics, which is directly related to the SEV owner\'s area of responsibility and likely contains relevant monitoring data for the demand shift test scenario.',
            },
          ],
        },
        quickActions: [
          { id: 'add-datasets-to-canvas', label: 'Add to Canvas' },
        ],
      }

      setChatMessages(prev => [...prev, datasetsMessage])
      setStepCount(prev => Math.min(prev + datasetsSteps, MAX_STEPS))
      return
    }

    // Handle add datasets to canvas action
    if (actionId === 'add-datasets-to-canvas') {
      const datasetsSection = {
        id: `datasets-${Date.now()}`,
        type: 'summary',
        title: 'Relevant Datasets',
        createdBy: 'Opsmate',
        isExpanded: true,
        content: {
          title: 'Datasets for SEV Investigation',
          description: `1. non_kfs_overload_test_metrics_raw (Confidence: 0.85)
Directly related to overload testing, discovered through SEV owner's oncall relationships.

2. kfs_metrics (Confidence: 0.65)
Tracks KFS metrics for monitoring system performance during load tests.

3. keanu_monitor_service_metrics (Confidence: 0.60)
Monitors keanu service metrics related to SEV owner's area of responsibility.`,
        },
      }

      onAddSection(datasetsSection)

      const confirmSteps = getRandomSteps(1, 2)
      const confirmMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: confirmSteps,
        },
        content: "I've added the relevant datasets to your canvas.",
        quickActions: [
          { id: 'recovery', label: 'Find recovery metric' },
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, confirmMessage])
      setStepCount(prev => Math.min(prev + confirmSteps, MAX_STEPS))
      return
    }

    // Handle add to canvas action
    if (actionId === 'add-to-canvas') {
      // Create a summary section for the canvas
      const summarySection = {
        id: `summary-${Date.now()}`,
        type: 'summary',
        title: 'SEV Summary',
        createdBy: 'Opsmate',
        isExpanded: true,
        content: {
          title: 'Taylor Swift - Life of a Showgirl Distribution Issue',
          description: `Taylor Swift is a Superstar Creator with 79M followers on Facebook, 280M followers on Instagram, and 61M followers on YouTube. Her recent posts have had challenges with unconnected distribution. The Creator Forensics team filed T234502850 to monitor her "Life of a Showgirl" album announcement.`,
        },
      }

      onAddSection(summarySection)

      const canvasSteps = getRandomSteps(1, 2)
      const confirmMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: canvasSteps,
        },
        content: "I've added the SEV summary to your canvas.",
        quickActions: [
          { id: 'datasets', label: 'Find relevant datasets' },
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, confirmMessage])
      setStepCount(prev => Math.min(prev + canvasSteps, MAX_STEPS))
      return
    }

    // Handle find recovery metric action
    if (actionId === 'recovery') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 4000))
      setIsThinking(false)

      // Create new alert section for recovery metric
      const newSection = {
        id: `alert-${Date.now()}`,
        type: 'alert',
        title: 'Alert',
        createdBy: 'Jamie Gomez',
        avatar: '/profile.jpg',
        isExpanded: true,
        content: {
          title: 'Recovery Metric: Error rate for API gateway',
          description: 'Around 9:48, a regression began trending upward. The alert "Success rate for Auth Service" was identified as the key signal, steadily rising before crossing the threshold and entering the violation zone by 10:00.',
        },
      }

      // Add the section to canvas
      const recoverySteps = getRandomSteps(2, 4)
      onAddSection(newSection)
      setStepCount(prev => Math.min(prev + recoverySteps, MAX_STEPS))

      const confirmMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: recoverySteps,
        },
        content: "I've identified the key recovery metric and added it to your canvas. This alert shows the error rate trend that correlates with the incident timeline.",
        quickActions: [
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, confirmMessage])
      return
    }

    // Start thinking
    setIsThinking(true)

    // Simulate thinking for 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4000))

    // Stop thinking
    setIsThinking(false)

    // Create new alert section
    const newSection = {
      id: `alert-${Date.now()}`,
      type: 'alert',
      title: 'Alert',
      createdBy: 'Jamie Gomez',
      avatar: '/profile.jpg',
      isExpanded: true,
      content: {
        title: 'Error rate for API gateway',
        description: 'Around 9:48, a regression began trending upward. The alert "Success rate for Auth Service" was identified as the key signal, steadily rising before crossing the threshold and entering the violation zone by 10:00.',
      },
    }

    // Add the section to canvas
    onAddSection(newSection)

    // Update step count with random steps
    const actionSteps = getRandomSteps(2, 4)
    setStepCount(prev => Math.min(prev + actionSteps, MAX_STEPS))

    // Add new message to chat
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: actionSteps,
      },
      tabs: ['Runbook'],
      content: "I've completed the analysis and detected a high-confidence crash in the payment service. I've added an alert to your canvas so you can review the findings and take next steps.",
      quickActions: [
        { id: 'datasets', label: 'Find relevant datasets' },
      ],
    }

    setChatMessages(prev => [...prev, newMessage])
  }

  return (
    <div className="w-[380px] bg-white border-l border-gray-200 flex flex-col">
      {/* Chat Content */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Initial Header - Scrolls with content */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <OpsmateLogo className="w-6 h-6 text-gray-900" />
              <span className="font-semibold text-gray-900">Opsmate</span>
            </div>
            <button 
              onClick={() => onOpenSteps(stepCount)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <List className="w-4 h-4" />
              <span>{stepCount} steps</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <tab.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{tab.label}</span>
              </button>
            ))}
            
            {/* More Button */}
            <button
              onClick={onOpenSources}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">More</span>
            </button>
          </div>
        </div>
        {chatMessages.map((msg, msgIndex) => (
          <div key={msg.id} className="animate-fade-in" style={{ opacity: 0, animationDelay: '0.1s' }}>
            {/* User Message */}
            {msg.type === 'user' && (
              <div className="flex flex-col items-end">
                {msg.reference && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <CornerDownRight className="w-3 h-3" />
                    <span>Re: "{msg.reference}"</span>
                  </div>
                )}
                <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            )}

            {/* Assistant Message */}
            {msg.type === 'assistant' && (
              <>
                {/* Message Header (for follow-up messages) */}
                {msg.header && (
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <OpsmateLogo className="w-5 h-5 text-gray-900" />
                      <span className="text-sm font-medium text-gray-900">{msg.header.title}</span>
                    </div>
                    <button 
                      onClick={() => onOpenSteps(msg.header.steps)}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>{msg.header.steps} steps</span>
                    </button>
                  </div>
                )}

                {/* Tabs for follow-up messages */}
                {msg.tabs && (
                  <div className="flex gap-2 mb-3">
                    {msg.tabs.map((tab) => (
                      <div
                        key={tab}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white shadow-sm"
                      >
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">{tab}</span>
                      </div>
                    ))}
                    {/* More button */}
                    <button
                      onClick={onOpenSources}
                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-900">More</span>
                    </button>
                  </div>
                )}

                {msg.content && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {msg.content}
                  </p>
                )}

                {/* Rich Content - Datasets */}
                {msg.richContent?.type === 'datasets' && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {msg.richContent.intro}
                    </p>
                    <div className="space-y-6">
                      {msg.richContent.datasets.map((dataset, idx) => (
                        <div key={idx}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            {idx + 1}. <span className="text-blue-600">{dataset.name}</span>
                          </p>
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold">Confidence score:</span> {dataset.confidence}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">Reasoning:</span> {dataset.reasoning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {msg.followUp && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {msg.followUp}
                  </p>
                )}

                {/* Inline Actions */}
                {msg.inlineActions && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {msg.inlineActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id, action.label)}
                        disabled={isThinking}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Actions */}
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-2">
                    {msg.quickActions.map((action, index) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id, action.label)}
                        disabled={isThinking}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* Thinking State */}
        {isThinking && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <OpsmateLogo className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Opsmate</span>
            </div>
            <div className="relative overflow-hidden">
              <span className="text-sm text-gray-400 shimmer-text">Opsmate thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors overflow-hidden">
          {/* Referenced Section */}
          {referencedSection && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2 text-gray-600">
                <CornerDownRight className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium truncate">"{referencedSection.title}"</span>
              </div>
              <button 
                onClick={clearReference}
                className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
          
          {/* Input Row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim() && !referencedSection}
              className={`p-2 rounded-full transition-colors ${
                message.trim() || referencedSection
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          Do not submit any <a href="#" className="underline hover:text-gray-500">User Data</a> into Opsmate
        </p>
      </div>
    </div>
  )
})

export default Copilot

