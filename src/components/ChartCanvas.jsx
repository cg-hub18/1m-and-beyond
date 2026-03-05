import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceLine } from 'recharts'
import { X } from 'lucide-react'

function FullChart({ chart }) {
  const { type, data, dataKeys, xAxisKey, referenceLine } = chart
  const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6']

  const sharedAxisProps = {
    tick: { fontSize: 12, fill: '#6b7280' },
    axisLine: { stroke: '#e5e7eb' },
    tickLine: { stroke: '#e5e7eb' },
  }

  const tooltipProps = {
    contentStyle: {
      fontSize: 13,
      borderRadius: 10,
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      padding: '8px 12px',
    },
    labelStyle: { fontWeight: 600, marginBottom: 4 },
  }

  const referenceLineEl = referenceLine ? (
    <ReferenceLine
      x={referenceLine.x}
      stroke="#ef4444"
      strokeDasharray="4 4"
      label={{ value: referenceLine.label, position: 'top', fontSize: 11, fill: '#ef4444', fontWeight: 600 }}
    />
  ) : null

  if (type === 'bar') {
    return (
      <BarChart data={data} margin={{ top: 20, right: 24, bottom: 20, left: 24 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey={xAxisKey} {...sharedAxisProps} />
        <YAxis {...sharedAxisProps} />
        <Tooltip {...tooltipProps} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {referenceLineEl}
        {dataKeys.map((key, i) => (
          <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    )
  }

  if (type === 'area') {
    return (
      <AreaChart data={data} margin={{ top: 20, right: 24, bottom: 20, left: 24 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey={xAxisKey} {...sharedAxisProps} />
        <YAxis {...sharedAxisProps} />
        <Tooltip {...tooltipProps} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {referenceLineEl}
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            fill={colors[i % colors.length]}
            fillOpacity={0.12}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    )
  }

  return (
    <LineChart data={data} margin={{ top: 20, right: 24, bottom: 20, left: 24 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
      <XAxis dataKey={xAxisKey} {...sharedAxisProps} />
      <YAxis {...sharedAxisProps} />
      <Tooltip {...tooltipProps} />
      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
      {referenceLineEl}
      {dataKeys.map((key, i) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={colors[i % colors.length]}
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#fff', strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      ))}
    </LineChart>
  )
}

export default function ChartCanvas({ chart, onClose }) {
  return (
    <div className="h-full flex flex-col bg-white animate-canvas-enter">
      <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900">{chart.title}</h2>
          {chart.subtitle && (
            <p className="text-[12px] text-gray-500 mt-0.5">{chart.subtitle}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 p-5 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <FullChart chart={chart} />
        </ResponsiveContainer>
      </div>
    </div>
  )
}
