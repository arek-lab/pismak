const features = [
  {
    icon: '⚡',
    title: 'Natychmiastowe dokumenty',
    desc: 'Dokument gotowy w 60 sekund — bez czekania, bez kolejki.',
  },
  {
    icon: '🔒',
    title: 'Dane zostają u Ciebie',
    desc: 'Wszystko działa lokalnie w przeglądarce. Zero serwera, zero chmury.',
  },
  {
    icon: '📄',
    title: 'Profesjonalne wzory',
    desc: 'Szablony pism firmowych weryfikowane merytorycznie.',
  },
  {
    icon: '🚫',
    title: 'Zero rejestracji',
    desc: 'Otwierasz, wypełniasz, pobierasz. Żadnych kont, żadnych danych.',
  },
]

export default function PismakFeatures() {
  return (
    <section id="jak-dziala" className="py-12 px-4 sm:py-16 sm:px-6 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Dlaczego to działa
          </h2>
          <p className="text-gray-500 text-base">Prosto. Szybko. Bezpiecznie.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#f8f9fb] rounded-2xl border border-gray-100 p-4 sm:p-6"
            >
              <div className="text-2xl mb-3 sm:mb-4">{f.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
