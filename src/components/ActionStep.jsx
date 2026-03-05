import { FileEdit, Terminal, Search, Database, GitCompare, Shield } from 'lucide-react'

const iconMap = {
  'file-edit': FileEdit,
  'terminal': Terminal,
  'search': Search,
  'database': Database,
  'git-compare': GitCompare,
  'shield': Shield,
}

export default function ActionStep({ icon = 'search', label }) {
  const Icon = iconMap[icon] || Search

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-150 text-[13px] text-gray-600 mr-2 mb-2">
      <Icon size={14} className="text-gray-400 flex-shrink-0" />
      {label}
    </span>
  )
}
