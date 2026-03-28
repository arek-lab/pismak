\# Pismak — PRD + Roadmap pracy z Claude Code

> Dokument pracy dla Claude Code. Czytaj go sekwencyjnie — każdy etap zaczyna się dopiero po weryfikacji poprzedniego.
>
> **Stan aktualny (v1.3):** Trzy aktywne generatory — wezwanie do zapłaty, odpowiedź na reklamację, odpowiedź na opinię Google. Landing główny z kaflami generatorów i kaflami AI Features. Osobna strona /ai-asystent jako landing dla funkcji AI (placeholder z pełną treścią). Architektura zaprojektowana pod rozbudowę bez refaktoru.

---

## 1. Kontekst produktowy

**Czym jest Pismak?**
Satelitarna aplikacja webowa generująca pisma firmowe. Działa w 100% w przeglądarce — żadne dane nie trafiają na serwer. Jest to celowy wyróżnik RODO-compliance wobec MSP.

**Stan aktualny — zrealizowane generatory:**
- Wezwanie do zapłaty (3 wzory: standardowe, przedsądowe, uproszczone) — PDF + drukuj
- Odpowiedź na reklamację (3 wzory: rzeczowa, empatyczna, neutralna) — PDF + kopiuj
- Odpowiedź na opinię Google (3 wzory: profesjonalna, empatyczna, neutralna) — edytowalny textarea + kopiuj

**Zrealizowane strony:**
- `/` — landing główny z dwiema sekcjami kafli: generatory + AI Features
- `/wezwanie-do-zaplaty`, `/odpowiedz-na-reklamacje`, `/odpowiedz-na-opinie-google` — generatory
- `/ai-asystent` — landing dla funkcji AI, prowadzący do Prywaciarza

**Cel biznesowy:**
Pismak nie monetyzuje bezpośrednio. Jest lejkiem SEO do [Prywaciarza](https://prywaciarz.pl) — platformy AI dla MSP, która już istnieje. Każda interakcja z Pismakiem powinna prowadzić do trialu Prywaciarza.

**Docelowy użytkownik:**
Właściciel lub manager w polskim MSP, który szuka gotowego pisma w Google ("wezwanie do zapłaty wzór", "jak odpowiedzieć na złą opinię Google") i potrzebuje go tu i teraz, bez rejestracji.

---

## 2. Stack techniczny

| Warstwa | Wybór | Uzasadnienie |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG out-of-the-box, najlepsze wsparcie Claude Code |
| Język | TypeScript | Typowanie formularzy krytyczne przy wielu wzorach |
| Styling | Tailwind CSS + DaisyUI | Szybki UI, komponenty gotowe |
| PDF | `react-pdf` / `@react-pdf/renderer` | Client-side, zero backendu |
| Print | CSS `@media print` | Natywny, zero zależności |
| Analityka | Google Tag Manager | Elastyczność dla GA4 + eventów konwersji |
| Hosting | Vercel (free tier) | Zero kosztów dla SSG |
| Rendering | `output: 'export'` (pełny SSG) | Zero serwera, pełne SEO |

**Krytyczna konfiguracja — `next.config.ts`:**
```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
}
export default nextConfig
```

---

## 3. Struktura projektu

```
pismak/
├── app/
│   ├── layout.tsx                              # Root layout: GTM, global meta, navbar
│   ├── page.tsx                                # Landing główny — dwie sekcje kafli
│   ├── sitemap.ts                              # Auto-generowany sitemap z generators.config
│   │
│   ├── wezwanie-do-zaplaty/
│   │   └── page.tsx                            # ✅ AKTYWNY — SEO + generator
│   ├── odpowiedz-na-reklamacje/
│   │   └── page.tsx                            # ✅ AKTYWNY — SEO + generator
│   ├── odpowiedz-na-opinie-google/
│   │   └── page.tsx                            # ✅ AKTYWNY — SEO + generator
│   └── ai-asystent/
│       └── page.tsx                            # ✅ AKTYWNY — landing AI Features → Prywaciarz
│
│   # -- v3: kolejne generatory --
│   # ├── rozwiazanie-umowy-za-porozumieniem/
│   # └── [kolejne]/
│
├── components/
│   ├── generators/
│   │   ├── GeneratorShell.tsx                  # Generyczny — obsługuje wszystkie generatory
│   │   ├── WezwanieForm.tsx                    # ✅ formularz wezwania
│   │   ├── WezwanieGeneratorClient.tsx         # ✅ client wrapper
│   │   ├── ReklamacjaForm.tsx                  # ✅ formularz reklamacji
│   │   ├── ReklamacjaGeneratorClient.tsx       # ✅ client wrapper
│   │   ├── OpiniaForm.tsx                      # ✅ formularz opinii
│   │   └── OpiniaGeneratorClient.tsx           # ✅ client wrapper
│   │
│   ├── DocumentOutput.tsx                      # Podgląd — tryb readonly i editable
│   ├── DocumentActions.tsx                     # Akcje: pdf | drukuj | kopiuj (konfigurowalne)
│   ├── PDFDownloadButton.tsx                   # Dynamic import @react-pdf/renderer
│   ├── CtaPrywaciarz.tsx                       # CTA po generacji — kontekstowy z config
│   ├── Faq.tsx                                 # FAQ z JSON-LD
│   └── GtmEvents.tsx                           # GTM helpers
│
├── lib/
│   ├── templates/
│   │   ├── types.ts                            # Typy wszystkich generatorów
│   │   ├── wezwanie.ts                         # ✅ generowanie tekstu
│   │   ├── reklamacja.ts                       # ✅ generowanie tekstu
│   │   └── opinia.ts                           # ✅ generowanie tekstu
│   │
│   ├── generators.config.ts                    # Rejestr generatorów + AI Features
│   ├── schema.ts                               # JSON-LD helpers
│   └── gtm.ts                                  # GTM dataLayer helpers
│
├── styles/
│   └── design-system.ts                        # Centralne klasy Tailwind (ds.*)
│
├── public/
│   ├── fonts/                                  # Lato TTF dla @react-pdf/renderer
│   └── robots.txt
│
└── next.config.js                              # output: 'export', trailingSlash, images unoptimized
```

### 3a. generators.config.ts — serce rozbudowy

Dwa rejestry w jednym pliku:

**`GENERATORS`** — aktywne generatory formularzy. Każdy wpis = jedna strona z generatorem. Nowy generator = nowy obiekt, zero zmian w komponentach.

**`AI_FEATURES`** — kafle prowadzące do `/ai-asystent`. Zawsze `status: 'coming-soon'` — nie prowadzą do osobnych stron generatorów, tylko do landingu AI.

```ts
// lib/generators.config.ts

export interface GeneratorConfig {
  id: string
  slug: string
  label: string
  description: string
  icon: string
  ctaText: string
  seo: {
    title: string
    description: string
    faqItems: Array<{ question: string; answer: string }>
  }
  status: 'active' | 'coming-soon'
}

export interface AiFeatureConfig {
  id: string
  label: string
  description: string
  icon: string
  slug: string                  // zawsze 'ai-asystent'
  status: 'coming-soon'
}

// ── Aktywne generatory ────────────────────────────────────────────
export const GENERATORS: GeneratorConfig[] = [
  { id: 'wezwanie',   slug: 'wezwanie-do-zaplaty',         status: 'active', ... },
  { id: 'reklamacja', slug: 'odpowiedz-na-reklamacje',      status: 'active', ... },
  { id: 'opinia',     slug: 'odpowiedz-na-opinie-google',   status: 'active', ... },
  // v3: { id: 'umowa', slug: 'rozwiazanie-umowy', status: 'coming-soon', ... },
]

// ── Kafle AI Features → /ai-asystent ─────────────────────────────
export const AI_FEATURES: AiFeatureConfig[] = [
  { id: 'notatka-ze-spotkania',    label: 'Notatka ze spotkania',      slug: 'ai-asystent', status: 'coming-soon', ... },
  { id: 'podsumuj-dokument',       label: 'Podsumuj dokument',         slug: 'ai-asystent', status: 'coming-soon', ... },
  { id: 'stresc-pismo',            label: 'Streść pismo od klienta',   slug: 'ai-asystent', status: 'coming-soon', ... },
  { id: 'odnies-sie-do-regulaminu',label: 'Odnieś się do regulaminu',  slug: 'ai-asystent', status: 'coming-soon', ... },
  { id: 'odpowiedz-na-maila',      label: 'Odpowiedz na maila',        slug: 'ai-asystent', status: 'coming-soon', ... },
]
```

---

## 4. Kluczowe założenia UX — przekaż Claude Code przed budową komponentów

### 4.1 Switch wzorów bez utraty danych

To jest najważniejsza funkcjonalność różnicująca Pismaka od konkurencji. Użytkownik wypełnia pola (nazwa firmy, kwota itd.) i może przełączyć się na inny wzór tego samego pisma — **dane wspólne zostają zachowane**.

Mechanizm:
- Każdy generator ma kilka wzorów (np. wezwanie standardowe / przedsądowe / uproszczone)
- Dane przechowywane w `useReducer` lub `zustand` na poziomie `GeneratorShell`
- Pola wspólne (np. `nazwaFirmy`, `adres`, `kwota`) mapowane między wzorami
- Pola specyficzne dla wzoru renderowane warunkowo
- Przy switchu: zachowaj wspólne, wyczyść specyficzne

### 4.2 Architektura formularzy — stan aktualny

Trzy zrealizowane generatory z różnymi konfiguracjami akcji:

| Generator | Wzory | Akcje dokumentu | Output |
|---|---|---|---|
| Wezwanie do zapłaty | standardowe, przedsądowe, uproszczone | PDF | readonly |
| Odpowiedź na reklamację | rzeczowa, empatyczna, neutralna | PDF + kopiuj | readonly |
| Odpowiedź na opinię Google | profesjonalna, empatyczna, neutralna | kopiuj | **editable** |

Opinia Google ma `outputMode='editable'` — użytkownik może edytować tekst przed skopiowaniem (textarea zamiast podglądu). To świadoma decyzja UX — odpowiedź wpisuje się ręcznie w Google.

### 4.3 Podgląd i akcje dokumentu

`DocumentActions` przyjmuje prop `actions: Array<'print' | 'pdf' | 'copy'>` — renderuje tylko przekazane akcje. Konfiguracja per generator w `[Nazwa]GeneratorClient.tsx`.

`DocumentOutput` przyjmuje prop `mode: 'readonly' | 'editable'` — w trybie editable renderuje textarea z tym samym fontem co readonly.

PDF generowany przez `PDFDownloadButton.tsx` z dynamic import (`ssr: false`). Font Lato TTF w `public/fonts/` — jedyna opcja z pełnymi polskimi znakami w `@react-pdf/renderer`.

### 4.4 CTA do Prywaciarza

`CtaPrywaciarz.tsx` pojawia się **po każdej generacji dokumentu**, nie wcześniej. Nie blokuje dokumentu. Treść pochodzi z `generators.config.ts` (pole `ctaText`) — dzięki temu jest automatycznie kontekstowa dla każdego generatora bez zmian w komponencie.

MVP: *"Chcesz śledzić kto zapłacił, a kto ignoruje? Prywaciarz to potrafi →"*

---

## 4b. Feature: Landing AI Asystent + kafle na stronie głównej

### Koncepcja

Druga kategoria kafli na landingu (`/`) obok generatorów formularzy. Komunikuje funkcje wymagające modelu AI — zbyt złożone na formularz, ale dostępne w Prywaciarzu. Kafle nie prowadzą do osobnych generatorów — prowadzą do `/ai-asystent`.

### Architektura

```
app/page.tsx
  ├── Sekcja 1: GENERATORS (kafle aktywnych generatorów)
  │   └── map(GENERATORS) → karta generatora → link do /[slug]
  │
  └── Sekcja 2: AI FEATURES (kafle z badge "AI")
      └── map(AI_FEATURES) → karta AI → link do /ai-asystent
          Badge: "AI" w kolorze #55aaff
          Tło karty: subtelnie inne niż generatory (#F8FBFF)

app/ai-asystent/page.tsx
  └── Pełna strona landingowa (Server Component)
      Sekcje: hero → edukacja → możliwości → CTA → jak działa → bezpieczeństwo → social proof → finalne CTA
      Cel: konwersja na darmowy okres próbny Prywaciarza
```

### Zasady landingu /ai-asystent

- **Server Component** — bez `'use client'`, pełne SSG, SEO
- Importuje `AI_FEATURES` z `generators.config.ts` — sekcja możliwości renderowana dynamicznie
- Czcionki i styl spójne z Pismakiem (Playfair Display + DM Sans)
- Sekcje jasne naprzemiennie: `#FFFFFF` / `#F5F4F0`
- Sekcje ciemne (`#0d1117`): hero, finalne CTA, footer
- Karty zgodne z `ds` z `design-system.ts`
- **Wszystkie CTA prowadzą do Prywaciarza** z UTM params:
  - hero: `utm_campaign=ai-asystent-hero`
  - środek: `utm_campaign=ai-asystent-mid`
  - finalne: `utm_campaign=ai-asystent-footer`

### Treści kluczowe

**Komunikacja:** nie sprzedajemy AI jako technologii — pokazujemy sytuacje z biurka przedsiębiorcy które AI rozwiązuje.

**CTA:** "Rozpocznij darmowy okres próbny →" (bez podawania terminu, bez wzmianki o karcie kredytowej)

**Pod CTA:** "Rozliczenie fakturą · Bez zobowiązań"

**Bezpieczeństwo:** ogólna komunikacja RODO i ochrony danych — bez szczegółów technicznych architektury (Prywaciarz działa inaczej niż Pismak).

### Metadata /ai-asystent

```ts
export const metadata = {
  title: 'AI Asystent dla firm — notatki, dokumenty, maile | Pismak',
  description: 'AI analizuje Twoje dokumenty i pisze odpowiedzi. Część ekosystemu Prywaciarza — platformy AI dla polskich MSP.',
  alternates: { canonical: 'https://pismak.pl/ai-asystent' }
}
```

### Dodanie nowego kafla AI

1. Dopisz obiekt do `AI_FEATURES` w `generators.config.ts`
2. Dodaj treść "Jak to działa" do obiektu lookup w `ai-asystent/page.tsx`
3. Kafel pojawia się automatycznie na landingu i na stronie /ai-asystent

Zero zmian w innych komponentach.

---

Poproś Claude Code o wygenerowanie `lib/templates/types.ts` jako **pierwszy krok** przed jakimkolwiek formularzem.

W MVP definiujesz tylko typy dla wezwania. Resztę zostawiasz jako zakomentowane TODO — żeby Claude Code nie próbował ich implementować, ale żebyś widział gdzie to wejdzie w v2.

```ts
// lib/templates/types.ts

// ─── WSPÓLNY INTERFEJS DLA WSZYSTKICH GENERATORÓW ───────────────────────────
// Każdy generator implementuje ten interfejs — GeneratorShell go używa generycznie

export interface BaseGeneratorFields {
  [key: string]: string | boolean | undefined
}

// ─── WEZWANIE DO ZAPŁATY ─────────────────────────────────────────────────────

export interface WezwanieBaseFields extends BaseGeneratorFields {
  // shared fields — zachowywane przy switchu wzoru
  nazwaWierzyciela: string
  adresWierzyciela: string
  nipWierzyciela: string
  nazwaDluznika: string
  adresDluznika: string
  kwota: string
  waluta: 'PLN' | 'EUR' | 'USD'
  numerKonta: string
  miejscowosc: string
  dataWystawienia: string
}

export interface WezwanieStandardFields extends WezwanieBaseFields {
  nrFaktury: string
  dataFaktury: string
  terminZaplaty: string          // liczba dni
}

export interface WezwaniePrzedSadoweFields extends WezwanieBaseFields {
  dataPoprzedniegoWezwania: string
  kwotaOdsetek: string
  terminOstateczny: string       // liczba dni
}

export interface WezwanieUproszczoneFields extends WezwanieBaseFields {
  terminZaplaty: string
}

export type WezwanieFields =
  | WezwanieStandardFields
  | WezwaniePrzedSadoweFields
  | WezwanieUproszczoneFields

export type WezwanieTemplateId = 'standardowe' | 'przedsadowe' | 'uproszczone'

// ─── V2: KOLEJNE GENERATORY (TODO) ───────────────────────────────────────────
// export interface OpinaBaseFields extends BaseGeneratorFields { ... }
// export interface RozwiazanieUmowyBaseFields extends BaseGeneratorFields { ... }
```

---

## 6. SEO — wymagania dla każdej strony generatora

Każdy `app/[slug]/page.tsx` musi zawierać:

### 6.1 Metadata (Next.js `generateMetadata`)
```ts
export const metadata: Metadata = {
  title: 'Wezwanie do zapłaty – darmowy generator online | Pismak',
  description: 'Wygeneruj profesjonalne wezwanie do zapłaty w 60 sekund. Działa w przeglądarce, bez rejestracji, RODO-safe. Bezpłatnie.',
  alternates: { canonical: 'https://pismak.pl/wezwanie-do-zaplaty' }
}
```

### 6.2 JSON-LD Schema (przez `lib/schema.ts`)
Dwa schematy per strona:
- `SoftwareApplication` — dla strony z generatorem
- `FAQPage` — 3–5 pytań specyficznych dla wzoru (tarcza przed AIO)

### 6.3 Struktura H1/treść (powyżej folderu)
```
H1: Generator wezwania do zapłaty — bezpłatny, online
[formularz — above the fold]
[krótki akapit SEO, 2–3 zdania]
[FAQ]
```

Formularz musi być **przed** treścią SEO — użytkownik przyszedł po narzędzie, nie po artykuł.

### 6.4 GTM eventy do zmierzenia konwersji
```ts
// Po wygenerowaniu dokumentu
dataLayer.push({ event: 'pismo_generated', pismo_type: 'wezwanie', template: 'standardowe' })

// Po kliknięciu CTA
dataLayer.push({ event: 'cta_prywaciarz_click', source: 'post_generation', pismo_type: 'wezwanie' })

// Po pobraniu PDF
dataLayer.push({ event: 'pdf_downloaded', pismo_type: 'wezwanie' })
```

---

## 7. Roadmapa — stan aktualny i kolejne kroki

> Etapy 0–5 zrealizowane. Projekt wdrożony na Netlify. Poniżej tylko etapy do zrealizowania.

### ✅ ZREALIZOWANE

- Etap 0: Setup projektu (Next.js, Tailwind, DaisyUI, SSG)
- Etap 1: Typy danych + generators.config.ts
- Etap 2: GeneratorShell (generyczny)
- Etap 3: Generator wezwania end-to-end
- Etap 4: CtaPrywaciarz + GTM
- Etap 5: Landing główny + SEO + deploy (Netlify)
- v2a: Generator odpowiedzi na reklamację
- v2b: Generator odpowiedzi na opinię Google
- Landing /ai-asystent z pełną treścią
- Kafle AI Features na landingu głównym
- Design system (styles/design-system.ts)

---

### ETAP NASTĘPNY — v3: Kolejne generatory

**Prompt (powtarzaj per generator):**
```
Dodaj generator "[Nazwa]" do istniejącej architektury.
Wzoruj się na ReklamacjaForm i ReklamacjaGeneratorClient.

1. Dodaj wpis do lib/generators.config.ts (status: 'active')
2. Dodaj typy do lib/templates/types.ts
3. Stwórz lib/templates/[nazwa].ts z funkcjami generate
   Teksty pism: [wklej wzory]
4. Stwórz components/generators/[Nazwa]Form.tsx
5. Stwórz components/generators/[Nazwa]GeneratorClient.tsx
   Określ actions: ['pdf'] lub ['copy'] lub ['pdf', 'copy']
   Określ outputMode: 'readonly' lub 'editable'
6. Stwórz app/[slug]/page.tsx (Server Component)
   Dane SEO z generators.config.ts
7. Sitemap zaktualizuje się automatycznie

Zero zmian w: GeneratorShell, DocumentOutput, DocumentActions,
PDFDownloadButton, CtaPrywaciarz, gtm.ts, design-system.ts
```

**Kandydaci do v3:**
- Rozwiązanie umowy za porozumieniem stron (KP art. 30 §1 pkt 1) — PDF
- Oferta handlowa — PDF + kopiuj
- Notatka służbowa — kopiuj

---

### ETAP PRZYSZŁY — rozbudowa /ai-asystent

Gdy Prywaciarz uruchomi poszczególne funkcje AI:
1. Zmień `status` kafla z `'coming-soon'` na `'active'` w `AI_FEATURES`
2. Zmień `slug` z `'ai-asystent'` na docelowy URL funkcji w Prywaciarzu
3. Opcjonalnie: stwórz dedykowaną podstronę zamiast kierować na /ai-asystent

Nie wymaga zmian w landingu głównym — kafle aktualizują się automatycznie.

---

## 8. Rzeczy których Claude Code NIE powinien robić

Przekazuj te ograniczenia w każdym prompcie jeśli Claude zaczyna iść w złą stronę:

- **Nie twórz backendu / API routes** — wszystko client-side
- **Nie używaj bazy danych ani localStorage** do przechowywania danych użytkownika
- **Nie dodawaj rejestracji ani logowania** — zero friction jest założeniem
- **Nie generuj PDF server-side** — tylko `@react-pdf/renderer` client-side
- **Nie używaj `getServerSideProps`** — projekt jest pełnym SSG
- **Nie dodawaj zewnętrznych API do generowania treści** — szablony są hard-coded w `lib/templates/`

---

## 9. Definicja gotowości — stan aktualny i v3

### ✅ Zrealizowane (v1 + v2)

- [x] Generator wezwania działa end-to-end (formularz → tekst → PDF)
- [x] Generator reklamacji działa end-to-end (formularz → tekst → PDF + kopiuj)
- [x] Generator opinii Google działa end-to-end (formularz → edytowalny tekst → kopiuj)
- [x] Switch między wzorami zachowuje pola wspólne we wszystkich generatorach
- [x] `npm run build` przechodzi bez błędów
- [x] GTM zainstalowany, eventy działają
- [x] CTA do Prywaciarza po każdej generacji z UTM params
- [x] Landing główny z dwiema sekcjami kafli (generatory + AI Features)
- [x] Strona /ai-asystent z pełną treścią landingową
- [x] Sitemap zawiera tylko aktywne URL
- [x] Wdrożony na Netlify
- [x] Design system (styles/design-system.ts)

### Gotowość v3 (kolejny generator)

- [ ] Nowy wpis w `generators.config.ts` (status: 'active')
- [ ] Nowe typy w `types.ts`
- [ ] Nowy plik `lib/templates/[nazwa].ts` z gotowymi wzorami
- [ ] Nowy `[Nazwa]Form.tsx` i `[Nazwa]GeneratorClient.tsx`
- [ ] Nowa strona `app/[slug]/page.tsx`
- [ ] Weryfikacja: formularz → dokument → akcje działają
- [ ] Zero zmian w GeneratorShell, DocumentOutput, DocumentActions, CtaPrywaciarz