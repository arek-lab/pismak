export default function Hero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-16 sm:px-6 md:pt-40 md:pb-28 text-center bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#55aaff]/10 text-[#55aaff] text-xs font-medium mb-6 sm:mb-8 border border-[#55aaff]/20">
          ✦ Bez rejestracji. Bez AI promptów.
        </div>

        <h1
          className="font-bold tracking-tight text-gray-900 leading-[1.1] mb-4 sm:mb-6"
          style={{ fontSize: 'clamp(1.75rem, 8vw, 3.75rem)' }}
        >
          Profesjonalne pisma firmowe{' '}
          <span className="text-[#55aaff]">w&nbsp;60&nbsp;sekund</span>
        </h1>

        <p
          className="text-gray-500 max-w-xl mx-auto mb-7 sm:mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
        >
          Bez rejestracji. Bez AI promptów.
          <br />
          Po prostu wybierz dokument i wygeneruj.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#generatory"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition-colors shadow-sm min-h-[44px]"
          >
            Generuj dokument
          </a>
          <a
            href="https://maspii.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-7 py-3.5 rounded-full border border-gray-200 text-gray-700 font-medium text-sm hover:border-[#55aaff] hover:text-[#55aaff] transition-colors min-h-[44px]"
          >
            Zobacz AI dla firmy
            <span className="opacity-60">→</span>
          </a>
        </div>

        <div className="mt-7 sm:mt-8 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-gray-400">🔒</span>
            <span>Twoje dane nigdy nie trafiają na serwer.</span>
          </div>
          <p className="text-xs text-gray-400">
            Pismak działa w 100% lokalnie w przeglądarce.
          </p>
          <p className="text-xs text-gray-400 italic">
            Sprawdź sam — wyłącz Wi-Fi i dalej możesz generować pisma.
          </p>
        </div>
      </div>
    </section>
  )
}
