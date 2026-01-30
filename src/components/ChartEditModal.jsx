import { X, ExternalLink, Clock, RefreshCw, Bookmark, Calendar, ChevronDown, Search, Pencil, Eye, Copy, Plus, AlertTriangle, Database } from 'lucide-react'

export default function ChartEditModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  const timeRanges = ['30M', '1H', '3H', '6H', '12H', '1D', '3D', '7D', '14D', '30D']

  const queryConfig = `{
  "purposes": [],
  "end": "now",
  "start": "-1 week",
  "filterMode": "DEFAULT",
  "metrik_view_params": {
    "synced_crosshair_color": "#777",
    "columns_skip_formatting": [],
    "zoom_type": "x",`

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 md:inset-10 lg:inset-16 bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-base font-medium text-gray-900">{title}</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Open in Canvas
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              Update widget
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area - Everything below header scrolls */}
        <div className="flex-1 overflow-auto">
          {/* Time Range Bar */}
          <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
            {/* Left icons */}
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Clock className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Bookmark className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Date range picker */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">3 hours ago</span>
              <span className="text-gray-400">—</span>
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">now</span>
            </div>

            {/* Time range buttons */}
            <div className="flex items-center gap-1">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    range === '3H' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Timezone */}
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
              EST
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Refresh */}
            <button className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Content with Sidebar */}
          <div className="flex">
            {/* Left Sidebar - Queries List */}
            <div className="w-64 border-r border-gray-200 p-4 bg-[#f0f2f5] shrink-0">
              {/* All Queries Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">All Queries</span>
                  <div className="flex items-center gap-2 text-xs">
                    <button className="text-blue-600 hover:underline">Include All</button>
                    <span className="text-gray-400">·</span>
                    <button className="text-blue-600 hover:underline">Exclude All</button>
                  </div>
                </div>
                
                {/* Query Items */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-1.5 px-2 bg-gray-50 rounded group">
                    <span className="text-sm text-gray-700 truncate">(DS1) rollout_trac...</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 rounded"><Pencil className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Copy className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Eye className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><X className="w-3 h-3 text-gray-500" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded group">
                    <span className="text-sm text-gray-700 truncate">(DS2) rollout_tra...</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 rounded"><Pencil className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Copy className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Eye className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><X className="w-3 h-3 text-gray-500" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Formulas Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">All Formulas</span>
                  <div className="flex items-center gap-2 text-xs">
                    <button className="text-blue-600 hover:underline">Include All</button>
                    <span className="text-gray-400">·</span>
                    <button className="text-blue-600 hover:underline">Exclude All</button>
                  </div>
                </div>
                
                {/* Formula Items */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded group">
                    <span className="text-sm text-gray-700 truncate">(F1) (DS2 / (DS1 + DS...</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 rounded"><Pencil className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Eye className="w-3 h-3 text-gray-500" /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><X className="w-3 h-3 text-gray-500" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6">
              {/* Query Details Section */}
              <div className="space-y-4">
                {/* Query Header */}
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">(DS1) Scuba</span>
                  <span className="text-sm text-gray-500">rollout_tracker_intern</span>
                </div>

                {/* Search Input Row */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                    <span className="text-sm text-gray-700">rollout_tracker_intern</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">Advanced search</button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <Plus className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    <Pencil className="w-4 h-4" />
                    Edit in Scuba
                  </button>
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                    Open in Scuba
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>

                {/* Query Config */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Query Config</h4>
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 font-mono text-sm text-gray-600 whitespace-pre overflow-x-auto">
                    {queryConfig}
                  </div>
                </div>

                {/* Transform and Reduce */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">?</span>
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Transform</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">?</span>
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Reduce</span>
                  </div>
                </div>

                {/* Options Row */}
                <div className="flex items-center gap-6 py-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Use Presenters</span>
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow" />
                    </div>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Custom Entity Key Format</span>
                    <input 
                      type="text" 
                      className="w-40 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Test Host</span>
                    <input 
                      type="text" 
                      className="w-40 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Toolbar - Full Width */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-b border-gray-200 bg-[#f8f9fa] shrink-0 whitespace-nowrap">
            {/* Left Actions */}
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                <Plus className="w-4 h-4" />
                New Query
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                <Plus className="w-4 h-4" />
                Formula
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                <Plus className="w-4 h-4" />
                Landline
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                <ExternalLink className="w-4 h-4" />
                Import
              </button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                Historical Comparison
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                Percentile Bands
              </button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <span className="text-sm text-gray-600 px-2">View as</span>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Time Series
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                Run (⌘↩)
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
                Save Queries
              </button>
            </div>
          </div>

          {/* Chart Section - Below Toolbar */}
          <div className="p-6 bg-white">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              {/* Wireframe Placeholder Graph */}
              <div className="flex">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between text-xs text-gray-300 pr-3 h-48">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                
                {/* Chart area */}
                <div className="flex-1">
                  <div className="h-48 relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-t border-gray-200 w-full" />
                      ))}
                    </div>
                    
                    {/* Placeholder line chart path */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <path
                        d="M 0 140 Q 50 130, 100 120 T 200 100 T 300 80 T 400 60 T 500 70 T 600 50 T 700 40 T 800 55 T 900 45 T 1000 60 T 1100 50 T 1200 65"
                        fill="none"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  
                  {/* X-axis labels placeholder */}
                  <div className="flex justify-between mt-2 text-xs text-gray-300">
                    <span>00:00</span>
                    <span>04:00</span>
                    <span>08:00</span>
                    <span>12:00</span>
                    <span>16:00</span>
                    <span>20:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
