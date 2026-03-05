import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Maximize2 } from 'lucide-react'

function MiniChart({ chart }) {
  const { type, data, dataKeys, xAxisKey } = chart
  const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6']

  const commonProps = {
    data,
    margin: { top: 4, right: 4, bottom: 4, left: 4 },
  }

  if (type === 'bar') {
    return (
      <BarChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey={xAxisKey} hide />
        <YAxis hide />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
        />
        {dataKeys.map((key, i) => (
          <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[3, 3, 0, 0]} />
        ))}
      </BarChart>
    )
  }

  if (type === 'area') {
    return (
      <AreaChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey={xAxisKey} hide />
        <YAxis hide />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
        />
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            fill={colors[i % colors.length]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    )
  }

  return (
    <LineChart {...commonProps}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
      <XAxis dataKey={xAxisKey} hide />
      <YAxis hide />
      <Tooltip
        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
        labelStyle={{ fontWeight: 600, marginBottom: 4 }}
      />
      {dataKeys.map((key, i) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={colors[i % colors.length]}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 3 }}
        />
      ))}
    </LineChart>
  )
}

export default function ChartPreview({ chart, onExpand }) {
  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden group relative cursor-pointer hover:border-blue-300 transition-colors" onClick={onExpand}>
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">{chart.title}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onExpand() }}
          className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Maximize2 size={12} />
          Expand
        </button>
      </div>
      <div className="h-[160px] px-1">
        <ResponsiveContainer width="100%" height="100%">
          <MiniChart chart={chart} />
        </ResponsiveContainer>
      </div>
    </div>
  )
}
