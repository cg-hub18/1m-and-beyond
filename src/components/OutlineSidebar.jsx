import { List } from 'lucide-react'

const SHORT_LABELS = {
  'hypothesis': 'Executive Summary',
  'root-cause': 'Incident Timeline',
  'key-findings': 'Key Findings',
  'root-cause-detail': 'Root Cause',
  'next-steps-detail': 'Next Steps',
}

function getShortLabel(section) {
  if (SHORT_LABELS[section.id]) return SHORT_LABELS[section.id]
  if (section.type === 'hypothesis-card') {
    const match = section.title.match(/^(Hypothesis \d+)/)
    return match ? match[1] : section.title
  }
  return section.title
}

export default function OutlineSidebar({ sections, activeSectionId, onScrollToSection }) {
  const execSummary = sections.find(s => s.type === 'hypothesis')
  const rest = sections.filter(s => s.type !== 'hypothesis')

  return (
    <div className="w-44 bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
      <div className="px-3 pt-3 pb-1.5 flex items-center gap-1.5">
        <List className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Outline</span>
      </div>

      <nav className="px-1.5 pb-2">
        {execSummary && (
          <SidebarItem
            label={getShortLabel(execSummary)}
            isActive={activeSectionId === execSummary.id}
            onClick={() => onScrollToSection(execSummary.id)}
          />
        )}

        {rest.length > 0 && (
          <>
            <div className="mx-2 my-1.5 h-px bg-gray-100" />
            {rest.map(section => (
              <SidebarItem
                key={section.id}
                label={getShortLabel(section)}
                isActive={activeSectionId === section.id}
                onClick={() => onScrollToSection(section.id)}
              />
            ))}
          </>
        )}
      </nav>
    </div>
  )
}

function SidebarItem({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors truncate ${
        isActive
          ? 'bg-blue-50 text-blue-700 font-medium'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  )
}
