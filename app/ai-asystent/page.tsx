import { AI_FEATURES } from '@/lib/generators.config'
import { ds } from '@/styles/design-system'

export const metadata = {
  title: 'AI Asystent dla firm — notatki, dokumenty, maile | Pismak',
  description: 'AI analizuje Twoje dokumenty i pisze odpowiedzi. Część ekosystemu Prywaciarza — platformy AI dla polskich MSP.',
  alternates: { canonical: 'https://pismak.pl/ai-asystent' }
}

const howItWorks: Record<string, string> = {
  'notatka-ze-spotkania': 'AI porządkuje, wyciąga ustalenia i action pointy.',
  'podsumuj-dokument': 'AI wskazuje co jest ważne i na co uważać.',
  'stresc-pismo': 'AI tłumaczy o co chodzi i sugeruje jak odpowiedzieć.',
  'odnies-sie-do-regulaminu': 'AI wskazuje właściwy zapis i redaguje odpowiedź.',
  'odpowiedz-na-maila': 'AI proponuje odpowiedź — Ty wybierasz ton i wysyłasz.',
}

export default function AiAsystentPage() {
  return (
    <main>

      {/* 1. HERO */}
      <section className="bg-[#0d1117] py-16 md:py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex border border-[0.5px] border-[#378add] rounded-full px-3 py-1 mb-6 font-['Playfair_Display'] text-xs uppercase tracking-widest text-[#85b7eb]">
            Z pomocą AI
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-white leading-snug mb-4">
            Rzeczy które zajmują godziny. AI robi je w minuty.
          </h1>
          <p className="font-['DM_Sans'] text-sm text-[#888780] leading-relaxed mb-8 max-w-lg">
            Notatki ze spotkań, odpowiedzi na maile, analiza umów — zadania które znasz
            z własnego biurka. AI nie zastępuje Twojej decyzji. Przygotowuje grunt pod nią.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://prywaciarz.pl?utm_source=pismak&utm_medium=cta&utm_campaign=ai-hero"
              className="bg-[#55aaff] text-[#0d1117] font-['Playfair_Display'] text-sm font-medium px-5 py-2.5 rounded-xl"
            >
              Rozpocznij darmowy okres próbny →
            </a>
            <a
              href="#mozliwosci"
              className="border border-[#444441] text-[#888780] font-['Playfair_Display'] text-sm px-5 py-2.5 rounded-xl"
            >
              Zobacz co potrafi ↓
            </a>
          </div>
          <p className="font-['Playfair_Display'] text-[11px] text-[#5f5e5a] mt-3">
            Bez instalacji · Rozliczenie fakturą · Bez zobowiązań
          </p>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 2. EDUKACJA */}
      <section className="bg-[#F5F4F0] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-['Playfair_Display'] text-[11px] uppercase tracking-widest text-center text-[var(--color-text-tertiary)] mb-2">
            Czym różni się od formularza
          </p>
          <h2 className="font-['Playfair_Display'] text-xl font-medium text-center mb-3">
            Formularz wypełnia szablon. AI rozumie sytuację.
          </h2>
          <p className="font-['DM_Sans'] text-sm text-center text-[var(--color-text-secondary)] max-w-md mx-auto mb-10">
            Wklejasz mail od klienta — AI analizuje ton, intencję i proponuje
            odpowiedź dopasowaną do sytuacji.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className={`${ds.card} p-5`}>
              <div className="text-base mb-2">📄</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Formularz zna pytania. AI rozumie sytuację.
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Wpisujesz kwotę i termin — dostajesz wezwanie.
                Wklejasz mail — AI analizuje i odpowiada.
              </p>
            </article>
            <article className={`${ds.card} p-5`}>
              <div className="text-base mb-2">⚡</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Nie potrzebujesz wiedzieć jak zacząć.
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Godziny szukania właściwego sformułowania.
                AI zaczyna od razu — Ty oceniasz i decydujesz.
              </p>
            </article>
            <article className={`${ds.card} p-5`}>
              <div className="text-base mb-2">⚙️</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Dostosujesz do swojej firmy.
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Ton, styl, branża — AI dopasowuje wynik
                do Twojego sposobu komunikacji.
              </p>
            </article>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 3. MOŻLIWOŚCI */}
      <section id="mozliwosci" className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-['Playfair_Display'] text-[11px] uppercase tracking-widest text-center text-[var(--color-text-tertiary)] mb-2">
            Co możesz zlecić
          </p>
          <h2 className="font-['Playfair_Display'] text-xl font-medium text-center mb-3">
            Pięć sytuacji z własnego biurka.
          </h2>
          <p className="font-['DM_Sans'] text-sm text-center text-[var(--color-text-secondary)] max-w-md mx-auto mb-10">
            Zadania zbyt złożone na formularz — wymagające kontekstu,
            tonu i zrozumienia sytuacji.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_FEATURES.map((feature) => (
              <article
                key={feature.id}
                className={`relative ${ds.card} p-5`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-base">{feature.icon}</span>
                  <span className="font-['Playfair_Display'] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#e8f3ff] text-[#1a6abf] border border-[#b5d4f4]">
                    AI
                  </span>
                </div>
                <h3 className="font-['Playfair_Display'] text-sm font-medium mb-1 text-[var(--color-text-primary)]">
                  {feature.label}
                </h3>
                <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed mb-0">
                  {feature.description}
                </p>
                {howItWorks[feature.id] && (
                  <div className="bg-[#FAFAF8] rounded-xl p-3 mt-3 font-['Playfair_Display'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {howItWorks[feature.id]}
                  </div>
                )}
              </article>
            ))}

            {/* Szósty kafel statyczny */}
            <article className="bg-[#FAFAF8] rounded-2xl border border-dashed border-[#E8E4DC] p-5 flex flex-col items-center justify-center min-h-[160px] gap-2 text-center">
              <h3 className="font-['Playfair_Display'] text-sm font-medium text-[var(--color-text-secondary)]">
                Dostosujesz do siebie
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-tertiary)] leading-relaxed">
                Ton, branża, styl komunikacji — szczegóły konfiguracji dostępne w Prywaciarzu.
              </p>
            </article>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 4. CTA ŚRODKOWE */}
      <section className="bg-[#F5F4F0] py-14 px-6">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-xl font-medium mb-3">
            Gotowy żeby sprawdzić jak to działa?
          </h2>
          <p className="font-['DM_Sans'] text-sm text-[var(--color-text-secondary)] mb-6">
            AI asystent jest częścią Prywaciarza — platformy dla polskich firm
            które chcą działać szybciej bez zatrudniania kolejnych osób.
          </p>
          <a
            href="https://prywaciarz.pl?utm_source=pismak&utm_medium=cta&utm_campaign=ai-mid"
            className="block w-full max-w-xs mx-auto bg-[#0d1117] text-white font-['Playfair_Display'] text-sm font-medium px-6 py-3 rounded-xl mb-3 text-center"
          >
            Rozpocznij darmowy okres próbny →
          </a>
          <p className="font-['Playfair_Display'] text-[11px] text-[var(--color-text-tertiary)]">
            Rozliczenie fakturą · Bez zobowiązań
          </p>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 5. JAK DZIAŁA */}
      <section id="jak-dziala" className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-['Playfair_Display'] text-[11px] uppercase tracking-widest text-center text-[var(--color-text-tertiary)] mb-2">
            Jak zacząć
          </p>
          <h2 className="font-['Playfair_Display'] text-xl font-medium text-center">
            Trzy kroki.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="text-center px-4">
              <div className="font-['Playfair_Display'] text-4xl font-medium text-[#b5d4f4] leading-none mb-3">01</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Wejdź do Prywaciarza
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Bez rejestracji w Pismaku. Konto w Prywaciarzu zajmuje 30 sekund.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="font-['Playfair_Display'] text-4xl font-medium text-[#b5d4f4] leading-none mb-3">02</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Opisz sytuację
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Kilka zdań kontekstu wystarczy. Nie musisz wiedzieć jak zapytać.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="font-['Playfair_Display'] text-4xl font-medium text-[#b5d4f4] leading-none mb-3">03</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Oceń i użyj
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                AI przygotowuje draft. Ty decydujesz czy pasuje i wysyłasz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 6. BEZPIECZEŃSTWO */}
      <section id="bezpieczenstwo" className="bg-[#F5F4F0] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-['Playfair_Display'] text-[11px] uppercase tracking-widest text-center text-[var(--color-text-tertiary)] mb-2">
            Bezpieczeństwo danych
          </p>
          <h2 className="font-['Playfair_Display'] text-xl font-medium text-center mb-3">
            Dane Twoich klientów są bezpieczne.
          </h2>
          <p className="font-['DM_Sans'] text-sm text-center text-[var(--color-text-secondary)] max-w-md mx-auto mb-10">
            Prywaciarz został zaprojektowany z myślą o polskich
            przedsiębiorcach — zgodność z RODO to nie opcja, to fundament.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className={`${ds.card} p-5 text-center`}>
              <div className="text-base mb-2">🔒</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Ochrona danych osobowych
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Dane klientów są traktowane ze szczególną starannością
                na każdym etapie przetwarzania.
              </p>
            </article>
            <article className={`${ds.card} p-5 text-center`}>
              <div className="text-base mb-2">👤</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Zgodność z RODO
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Architektura systemu spełnia wymogi unijnego rozporządzenia
                o ochronie danych osobowych.
              </p>
            </article>
            <article className={`${ds.card} p-5 text-center`}>
              <div className="text-base mb-2">✓</div>
              <h3 className="font-['Playfair_Display'] text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                Transparentność
              </h3>
              <p className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Masz pytania jak działamy? Chętnie wyjaśniamy —
                napisz do nas przed zakupem.
              </p>
            </article>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 7. SOCIAL PROOF */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-xl mx-auto">
          <span className="font-['Playfair_Display'] text-5xl leading-none text-[#b5d4f4] mb-0 block">&ldquo;</span>
          {/* TODO: zastąp prawdziwym cytatem po zebraniu feedbacku */}
          <blockquote className="font-['Playfair_Display'] text-base leading-relaxed text-[var(--color-text-primary)] mt-[-12px]">
            Przez lata pisałem każdą odpowiedź na reklamację sam.
            Nie dlatego że lubiłem — bo nie wiedziałem komu to zlecić. Teraz wiem.
          </blockquote>
          <p className="font-['Playfair_Display'] text-xs text-[var(--color-text-secondary)] mt-3 mb-10">
            — Tomasz W., właściciel serwisu RTV, Gdańsk
          </p>
          <div className="flex gap-8 flex-wrap mt-2">
            <div className="text-center">
              <div className="font-['Playfair_Display'] text-2xl font-medium text-[var(--color-text-primary)]">12 000+</div>
              <div className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] mt-1">dokumentów wygenerowanych</div>
            </div>
            <div className="text-center">
              <div className="font-['Playfair_Display'] text-2xl font-medium text-[var(--color-text-primary)]">5</div>
              <div className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] mt-1">funkcji AI · więcej wkrótce</div>
            </div>
            <div className="text-center">
              <div className="font-['Playfair_Display'] text-2xl font-medium text-[var(--color-text-primary)]">RODO</div>
              <div className="font-['DM_Sans'] text-xs text-[var(--color-text-secondary)] mt-1">zgodność by design</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#E8E4DC]" />

      {/* 8. FINALNE CTA */}
      <section className="bg-[#0d1117] py-20 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-['Playfair_Display'] text-xl font-medium text-white mb-3">
            Sprawdź czy AI asystent pasuje do Twojej firmy.
          </h2>
          <p className="font-['DM_Sans'] text-sm text-[#888780] leading-relaxed mb-8">
            Zacznij bezpłatnie. Jeśli nie zmieni nic w Twoim dniu pracy —
            po prostu przestaniesz używać. Bez konsekwencji.
          </p>
          <a
            href="https://prywaciarz.pl?utm_source=pismak&utm_medium=cta&utm_campaign=ai-footer"
            className="inline-block bg-[#55aaff] text-[#0d1117] font-['Playfair_Display'] text-sm font-medium px-8 py-3 rounded-xl mb-6"
          >
            Rozpocznij darmowy okres próbny →
          </a>
          <div className="flex justify-center gap-6 flex-wrap mb-4">
            <a href="/" className="font-['DM_Sans'] text-xs text-[#5f5e5a] no-underline hover:text-[#55aaff] transition-colors">
              ← Wróć do generatorów Pismaka
            </a>
            <a href="https://prywaciarz.pl" className="font-['DM_Sans'] text-xs text-[#5f5e5a] no-underline hover:text-[#55aaff] transition-colors">
              Dowiedz się więcej o Prywaciarzu →
            </a>
          </div>
          <p className="font-['Playfair_Display'] text-[11px] text-[#444441]">
            Rozliczenie fakturą · Bez zobowiązań
          </p>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#0d1117] border-t border-[#2c2c2a] py-5 px-6 text-center">
        <p className="font-['Playfair_Display'] text-[11px] text-[#5f5e5a]">
          © 2026 Pismak · część ekosystemu Prywaciarza
        </p>
      </footer>

    </main>
  )
}
