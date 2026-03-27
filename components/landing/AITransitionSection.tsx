const bullets = [
  'AI wspierające codzienną pracę firmy',
  'szybsze decyzje biznesowe',
  'większa efektywność zespołu',
  'wyprzedzanie konkurencji dzięki AI',
]

export default function AITransitionSection() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 md:py-28 bg-[#f8f9fb]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#55aaff]/10 text-[#55aaff] text-xs font-medium mb-5 sm:mb-7 border border-[#55aaff]/20">
              Następny krok
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 leading-snug tracking-tight">
              Każda firma przechodzi kolejne etapy rozwoju.
            </h2>

            <p className="text-gray-500 mb-5 sm:mb-7 leading-relaxed text-sm sm:text-base">
              Na początku potrzebujesz szybkich narzędzi
              do codziennych zadań — dokumentów, odpowiedzi,
              operacyjnych decyzji.
              <br /><br />
              Z czasem kluczowa staje się efektywność zespołu,
              lepsze decyzje i przewaga nad konkurencją.
              Tu pojawia się Prywaciarz.
            </p>

            <ul className="space-y-3 mb-7 sm:mb-9">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-[#55aaff] font-bold text-base leading-none shrink-0">✔</span>
                  {b}
                </li>
              ))}
            </ul>

            <a
              href="https://maspii.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#55aaff] text-white font-medium text-sm hover:bg-[#3d99ff] transition-colors min-h-[44px]"
            >
              Zobacz jak działa Prywaciarz
              <span>→</span>
            </a>
          </div>

          {/* Right — chat UI mock */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm min-w-0">
            <div className="flex items-center gap-2 mb-4 sm:mb-5 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-[#55aaff] shrink-0" />
              <span className="text-xs font-medium text-gray-500">Prywaciarz AI</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#55aaff] text-white text-sm rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2.5 max-w-[85%] leading-relaxed">
                  Klient nie zapłacił faktury od 3 tygodni. Co robić?
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 text-sm rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2.5 max-w-[90%] leading-relaxed">
                  Rozumiem. Na podstawie historii Twojej firmy masz 3 aktywnych klientów z&nbsp;opóźnieniami. Zalecam wysłanie formalnego wezwania do zapłaty i&nbsp;ustawienie przypomnienia na 7&nbsp;dni.
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#55aaff] text-white text-sm rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2.5 max-w-[85%] leading-relaxed">
                  Wygeneruj wezwanie.
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 text-sm rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2.5 max-w-[90%] leading-relaxed">
                  Gotowe. Wezwanie do zapłaty na 4&nbsp;250&nbsp;zł — uzupełniłem dane z&nbsp;Twojego profilu. Pobierz PDF lub wyślij e-mailem.
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5">
                <span className="text-xs text-gray-400 flex-1 truncate">Napisz do Prywaciarza…</span>
                <div className="w-6 h-6 rounded-full bg-[#55aaff] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs">↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
