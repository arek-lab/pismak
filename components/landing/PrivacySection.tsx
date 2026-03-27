const bullets = [
  'dane nie opuszczają przeglądarki',
  'brak konta i logowania',
  'zero przechowywania informacji',
  'pełna kontrola nad dokumentami',
]

export default function PrivacySection() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Prywatność bez kompromisów
        </h2>

        <p className="text-gray-500 mb-5 sm:mb-7 leading-relaxed">
          W przeciwieństwie do większości narzędzi online,
          Pismak nie wysyła danych na żaden serwer.
          Całe generowanie dokumentów odbywa się lokalnie
          na Twoim komputerze.
        </p>

        <ul className="space-y-3 mb-6 sm:mb-8">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="text-[#55aaff] font-bold text-base leading-none shrink-0">✔</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="inline-block px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">
          Możesz odłączyć internet — generator nadal działa.
        </div>
      </div>
    </section>
  )
}
