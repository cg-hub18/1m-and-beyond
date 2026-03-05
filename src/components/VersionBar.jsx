const versions = ['T1', 'T2', 'T3']

export default function VersionBar({ activeVersion, onVersionChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-elevated">
      <div className="flex items-center justify-center gap-2 py-2 px-4">
        {versions.map((version) => (
          <button
            key={version}
            onClick={() => onVersionChange(version)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeVersion === version
                ? 'bg-action-primary text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {version}
          </button>
        ))}
      </div>
    </div>
  )
}
