import Link from 'next/link'
import { GENERATORS, AI_FEATURES } from '@/lib/generators.config'

export default function GeneratorsSection() {
  return (
    <section id="generatory" className="py-12 px-4 sm:py-16 sm:px-6 md:py-24 bg-[#f8f9fb]">
      <div className="max-w-5xl mx-auto">

        {/* SEKCJA 1 — Generatory pism */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Generatory pism
          </h2>
          <p className="text-gray-500 text-base">
            Gotowe do użycia — bez konta, bez AI promptów.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {GENERATORS.map((g) =>
            g.status === 'active' ? (
              <Link
                key={g.id}
                href={`/${g.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 hover:border-[#55aaff] hover:shadow-[0_8px_30px_rgba(85,170,255,0.12)] transition-all duration-200 flex flex-col"
              >
                <div className="text-4xl mb-4 sm:mb-5">{g.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {g.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4 sm:mb-6">
                  {g.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#55aaff] group-hover:gap-2 transition-all duration-150">
                  Otwórz generator
                  <span>→</span>
                </span>
              </Link>
            ) : (
              <div
                key={g.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 opacity-50 cursor-not-allowed flex flex-col"
              >
                <div className="text-4xl mb-4 sm:mb-5 grayscale">{g.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900 leading-snug">
                    {g.label}
                  </h3>
                  <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    Wkrótce
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{g.description}</p>
              </div>
            ),
          )}
        </div>

        {/* SEKCJA 2 — AI Features */}
        <div className="text-center mt-16 sm:mt-20 mb-8 sm:mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Z pomocą AI
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Zadania zbyt złożone na formularz — AI przetwarza Twoje dane bez wysyłania ich na zewnętrzne serwery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {AI_FEATURES.map((f) => (
            <Link
              key={f.id}
              href={`/${f.slug}`}
              className="relative group bg-[#f8fbff] rounded-2xl border border-[#dbeafe] p-5 sm:p-7 hover:border-[#55aaff] hover:shadow-[0_8px_30px_rgba(85,170,255,0.12)] transition-all duration-200 flex flex-col"
            >
              <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider bg-[#55aaff]/10 text-[#55aaff] px-2 py-0.5 rounded-full">
                AI
              </span>
              <div className="text-4xl mb-4 sm:mb-5">{f.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                {f.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4 sm:mb-6">
                {f.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[#55aaff] group-hover:gap-2 transition-all duration-150">
                Wypróbuj
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
