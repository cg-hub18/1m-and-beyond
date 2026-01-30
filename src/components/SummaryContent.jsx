export default function SummaryContent({ content }) {
  return (
    <div className="space-y-3">
      <h4 className="text-base font-semibold text-gray-900">{content.title}</h4>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{content.description}</p>
    </div>
  )
}

