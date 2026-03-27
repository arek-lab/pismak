interface FaqItem {
  question: string
  answer: string
}

interface FaqProps {
  items: FaqItem[]
}

export default function Faq({ items }: FaqProps) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4 text-[#1A1A1A]">Najczęściej zadawane pytania</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details key={i} className="bg-[#FAFAF8] border border-[#E8E4DC] rounded-xl group">
            <summary className="flex items-center justify-between px-5 py-4 font-medium text-[#1A1A1A] cursor-pointer list-none">
              {item.question}
              <span className="text-[#6B6B6B] ml-3 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-4">
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
