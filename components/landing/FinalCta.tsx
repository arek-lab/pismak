export default function FinalCta() {
  return (
    <section className="py-14 px-4 sm:py-20 sm:px-6 md:py-32 bg-gray-950 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#55aaff] text-sm font-medium tracking-widest uppercase mb-4 sm:mb-6">
          Ekosystem
        </p>
        <h2
          className="font-bold text-white mb-4 sm:mb-5 leading-tight tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}
        >
          Najpierw porządek w dokumentach.
          <br />
          Potem przewaga dzięki AI.
        </h2>
        <p className="text-gray-400 mb-7 sm:mb-10 text-base sm:text-lg leading-relaxed">
          Pismak rozwiązuje pojedyncze zadania.
          <br />
          Prywaciarz pomaga rozwijać firmę każdego dnia.
        </p>
        <a
          href="https://maspii.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#55aaff] text-white font-semibold text-base hover:bg-[#3d99ff] transition-colors shadow-lg shadow-[#55aaff]/25 min-h-[44px]"
        >
          Uruchom Prywaciarza
          <span>→</span>
        </a>
      </div>
    </section>
  )
}
