# Pismak — PRD + Roadmap pracy z Claude Code

> Dokument pracy dla Claude Code. Czytaj go sekwencyjnie — każdy etap zaczyna się dopiero po weryfikacji poprzedniego.
>
> **Zakres MVP v1:** Jeden generator — wezwanie do zapłaty (3 wzory). Architektura zaprojektowana pod rozbudowę o kolejne generatory bez refaktoru.

---

## 1. Kontekst produktowy

**Czym jest Pismak?**
Satelitarna aplikacja webowa generująca pisma firmowe. Działa w 100% w przeglądarce — żadne dane nie trafiają na serwer. Jest to celowy wyróżnik RODO-compliance wobec MSP.

**Zakres MVP v1:** Jeden generator — wezwanie do zapłaty w 3 wzorach (standardowe, przedsądowe, uproszczone). Kolejne generatory (opinia Google, rozwiązanie umowy itd.) wchodzą w v2 bez zmian architektury.

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
│   ├── layout.tsx                        # Root layout: GTM, global meta, navbar, CTA footer
│   ├── page.tsx                          # Landing główny — na start przekierowanie lub prosta strona
│   │
│   └── wezwanie-do-zaplaty/
│       └── page.tsx                      # Landing SEO + generator (jedyna strona w MVP)
│
│   # -- v2: dodaj kolejne foldery analogicznie --
│   # ├── odpowiedz-na-opinie-google/
│   # ├── rozwiazanie-umowy/
│   # └── [kolejne-generatory]/
│
├── components/
│   ├── generators/
│   │   ├── GeneratorShell.tsx            # Wspólna powłoka dla WSZYSTKICH generatorów
│   │   │                                 # Buduj generycznie — nie hardcoduj wezwania
│   │   └── WezwanieForm.tsx              # 'use client' — formularz wezwania
│   │   # -- v2: dodaj kolejne formy analogicznie --
│   │   # └── OpinaForm.tsx
│   │   # └── RozwiązanieUmowyForm.tsx
│   │
│   ├── DocumentOutput.tsx                # Podgląd pisma — generyczny, działa dla każdego typu
│   ├── DocumentActions.tsx               # Drukuj / Pobierz PDF — generyczny
│   ├── CtaPrywaciarz.tsx                 # CTA po generacji — przyjmuje pismoType jako prop
│   ├── Faq.tsx                           # FAQ z JSON-LD — przyjmuje items jako prop
│   └── GtmEvents.tsx                     # Helpery GTM — generyczne
│
├── lib/
│   ├── templates/
│   │   ├── types.ts                      # Typy dla WSZYSTKICH generatorów (obecnych i przyszłych)
│   │   │                                 # W MVP definiuj tylko WezwanieFields — resztę jako TODO
│   │   └── wezwanie.ts                   # Logika generowania tekstu — wezwanie
│   │   # -- v2: dodaj kolejne pliki analogicznie --
│   │   # └── opinia.ts
│   │   # └── rozwiazanieUmowy.ts
│   │
│   ├── generators.config.ts              # KLUCZOWY — rejestr wszystkich generatorów (czytaj sekcję 3a)
│   ├── schema.ts                         # Helpery JSON-LD
│   └── gtm.ts                            # GTM dataLayer helpers
│
├── public/
│   └── robots.txt
│
└── next.config.ts
```

### 3a. generators.config.ts — serce rozbudowy

To jest plik który sprawia że dodanie v2 generatora to **dopisanie jednego obiektu**, nie tworzenie nowej architektury. Zbuduj go od razu w MVP, nawet jeśli ma tylko jeden wpis.

```ts
// lib/generators.config.ts

export interface GeneratorConfig {
  id: string                    // unikalny klucz, używany w URL i GTM
  slug: string                  // segment URL: /wezwanie-do-zaplaty
  label: string                 // nazwa w UI i nawigacji
  description: string           // 1 zdanie — meta description i karta na landingu
  icon: string                  // emoji lub nazwa ikony
  ctaText: string               // kontekstowy tekst CTA do Prywaciarza
  seo: {
    title: string
    description: string
    faqItems: Array<{ question: string; answer: string }>
  }
  // v2: status pozwala pokazać "wkrótce" zamiast ukrywać
  status: 'active' | 'coming-soon'
}

export const GENERATORS: GeneratorConfig[] = [
  {
    id: 'wezwanie',
    slug: 'wezwanie-do-zaplaty',
    label: 'Wezwanie do zapłaty',
    description: 'Profesjonalne wezwanie w 60 sekund. Trzy wzory: standardowe, przedsądowe, uproszczone.',
    icon: '📄',
    ctaText: 'Chcesz śledzić kto zapłacił, a kto ignoruje? Prywaciarz to potrafi →',
    seo: {
      title: 'Wezwanie do zapłaty – darmowy generator online | Pismak',
      description: 'Wygeneruj profesjonalne wezwanie do zapłaty w 60 sekund. Bez rejestracji, RODO-safe.',
      faqItems: [
        { question: 'Czy wezwanie do zapłaty musi być pisemne?', answer: '...' },
        // ... pozostałe pytania
      ]
    },
    status: 'active'
  },
  // -- v2: dopisz tutaj kolejne generatory --
  // { id: 'opinia', slug: 'odpowiedz-na-opinie-google', status: 'coming-soon', ... },
  // { id: 'umowa', slug: 'rozwiazanie-umowy', status: 'coming-soon', ... },
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

### 4.2 Architektura formularzy

W MVP jeden formularz — `WezwanieForm.tsx` — ale `GeneratorShell` musi być zaprojektowany generycznie, bo przyjmie kolejne formy w v2.

Pola wezwania:

| Wzór | Pola specyficzne |
|---|---|
| Wezwanie standardowe | nr faktury, data faktury, termin zapłaty |
| Wezwanie przedsądowe | data poprzedniego wezwania, kwota odsetek naliczonych |
| Wezwanie uproszczone | minimum — tylko kwota i termin |

Pola wspólne (zachowywane przy switchu wzoru): nazwa wierzyciela, adres, NIP, nazwa dłużnika, adres dłużnika, kwota, waluta, numer konta.

Każdy `[Nazwa]Form.tsx` musi przyjmować i emitować swój własny typ danych (zdefiniowany w `lib/templates/types.ts`).

**Zasada dla v2:** nowy generator = nowy `[Nazwa]Form.tsx` + nowy wpis w `generators.config.ts` + nowy plik `lib/templates/[nazwa].ts`. Zero zmian w istniejących komponentach.

### 4.3 Podgląd i akcje dokumentu

Po wygenerowaniu dokumentu użytkownik widzi:
1. **Podgląd** — czysty tekst w `DocumentOutput.tsx`, sformatowany jak dokument (czcionka monospace lub serif, marginesy)
2. **Drukuj** — `window.print()` z CSS `@media print` (ukrywa UI, zostawia tylko dokument)
3. **Pobierz PDF** — generowany client-side przez `@react-pdf/renderer`

PDF: czysty, prosty tekst. Bez logo, bez stopek, bez znaków wodnych. Pod dokumentem mały tag: *"Wygenerowano bezpłatnie przez Pismak.pl — narzędzie od twórców Prywaciarza"* (to jest teaser, nie watermark).

### 4.4 CTA do Prywaciarza

`CtaPrywaciarz.tsx` pojawia się **po każdej generacji dokumentu**, nie wcześniej. Nie blokuje dokumentu. Treść pochodzi z `generators.config.ts` (pole `ctaText`) — dzięki temu jest automatycznie kontekstowa dla każdego generatora bez zmian w komponencie.

MVP: *"Chcesz śledzić kto zapłacił, a kto ignoruje? Prywaciarz to potrafi →"*

---

## 5. Typy danych — zbuduj to PRZED formularzami

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

## 7. Roadmapa pracy z Claude Code — etap po etapie

> Zasada: **jeden etap = jedna sesja z Claude Code**. Weryfikuj działanie przed przejściem dalej.
> MVP = Etapy 0–5. Etap 6 to v2.

---

### ETAP 0 — Setup projektu
**Prompt startowy:**
```
Utwórz projekt Next.js 14 z TypeScript, Tailwind CSS i DaisyUI.
Skonfiguruj output: 'export' w next.config.ts dla pełnego SSG.
Zainstaluj: @react-pdf/renderer.
Stwórz strukturę folderów:

app/
  layout.tsx
  page.tsx
  wezwanie-do-zaplaty/
    page.tsx
components/
  generators/
    GeneratorShell.tsx
    WezwanieForm.tsx
  DocumentOutput.tsx
  DocumentActions.tsx
  CtaPrywaciarz.tsx
  Faq.tsx
lib/
  templates/
    types.ts
    wezwanie.ts
  generators.config.ts
  schema.ts
  gtm.ts
public/
  robots.txt

Wszystkie pliki puste z TODO — tylko struktura.
Upewnij się że `npm run build` przechodzi bez błędów.
```
**Weryfikacja:** `npm run build` → folder `out/` z plikami HTML.

---

### ETAP 1 — Rejestr generatorów + typy danych
**Prompt:**
```
Stwórz dwa pliki będące fundamentem architektury:

1. lib/generators.config.ts
Zgodnie ze schematem z sekcji 3a PRD.
Na start jeden wpis: wezwanie (status: 'active').
Dodaj zakomentowane przykłady dla opinia i rozwiazanieUmowy (status: 'coming-soon').

2. lib/templates/types.ts
Zgodnie ze schematem z sekcji 5 PRD.
Zdefiniuj: BaseGeneratorFields, WezwanieBaseFields, WezwanieStandardFields,
WezwaniePrzedSadoweFields, WezwanieUproszczoneFields, WezwanieTemplateId.
Zakomentowane TODO dla przyszłych generatorów.
```
**Weryfikacja:** `npx tsc --noEmit` bez błędów.

---

### ETAP 2 — GeneratorShell (generyczny szkielet)
**Prompt:**
```
Stwórz components/generators/GeneratorShell.tsx ('use client').

Komponent jest GENERYCZNY — nie zawiera żadnej logiki specyficznej dla wezwania.
Przyjmuje props:
  - generatorId: string
  - templates: Array<{ id: string; label: string }>
  - activeTemplateId: string
  - onTemplateChange: (id: string) => void
  - children: ReactNode          (tu wchodzi konkretny formularz)
  - generatedDocument: string | null
  - onClear: () => void

Renderuje:
  - DaisyUI tabs — jeden tab per wzór, switch bez przeładowania
  - children (slot na formularz)
  - DocumentOutput (gdy generatedDocument !== null)
  - DocumentActions (gdy generatedDocument !== null)
  - CtaPrywaciarz (gdy generatedDocument !== null)

Stan formularza NIE jest w GeneratorShell — jest w konkretnym [Nazwa]Form.
GeneratorShell tylko orkiestruje layout i widoczność sekcji.
```

---

### ETAP 3 — Generator wezwania end-to-end
**Prompt:**
```
Zbuduj pełny przepływ dla /wezwanie-do-zaplaty.
Typy i config już istnieją z Etapu 1.

1. lib/templates/wezwanie.ts
Funkcje:
  generateWezwanie(fields: WezwanieStandardFields): string
  generateWezwaniePrzedSadowe(fields: WezwaniePrzedSadoweFields): string
  generateWezwanieUproszczone(fields: WezwanieUproszczoneFields): string

Teksty pism wklej z przygotowanych wzorów [tu wklej output z sesji generowania wzorów].
Funkcje tylko podstawiają dane pod placeholdery — zero logiki AI.

2. components/generators/WezwanieForm.tsx ('use client')
  - Zarządza własnym stanem przez useReducer
  - Props: activeTemplateId: WezwanieTemplateId, onGenerate: (doc: string) => void
  - Pola wspólne zawsze widoczne
  - Pola specyficzne renderowane warunkowo na podstawie activeTemplateId
  - Przy zmianie activeTemplateId: zachowaj pola wspólne (BaseFields), reset specyficznych
  - Submit → wywołaj odpowiednią funkcję generate → przekaż wynik przez onGenerate

3. components/DocumentOutput.tsx
  Przyjmuje: content: string
  Wyświetla tekst w formacie dokumentu (font Georgia lub podobny serif, marginesy 2rem).

4. components/DocumentActions.tsx
  Przyjmuje: content: string, pismoType: string
  Przycisk "Drukuj" → window.print() z @media print ukrywającym UI
  Przycisk "Pobierz PDF" → dynamic import @react-pdf/renderer z ssr: false
  PDF: prosty tekst, na końcu tagline "Wygenerowano bezpłatnie przez Pismak.pl"

5. app/wezwanie-do-zaplaty/page.tsx (Server Component)
  Dane SEO pobierz z GENERATORS.find(g => g.id === 'wezwanie') w generators.config.ts
  metadata: title, description, canonical z config
  JSON-LD: SoftwareApplication + FAQPage z faqItems z config
  Struktura: H1 → <WezwanieGeneratorClient /> → FAQ
  WezwanieGeneratorClient to osobny 'use client' wrapper łączący GeneratorShell + WezwanieForm
```
**Weryfikacja:** Wygeneruj wezwanie → pobierz PDF → sprawdź `out/wezwanie-do-zaplaty/index.html` czy zawiera H1 i JSON-LD.

---

### ETAP 4 — CtaPrywaciarz + GTM
**Prompt:**
```
1. components/CtaPrywaciarz.tsx
  Przyjmuje: generatorId: string
  Pobiera ctaText z GENERATORS.find(g => g.id === generatorId)
  Link: https://prywaciarz.pl?utm_source=pismak&utm_medium=cta&utm_campaign={generatorId}
  Pojawia się tylko gdy przekazany prop show={true} z GeneratorShell

2. lib/gtm.ts
  export function pushEvent(event: string, params: Record<string, string>): void
  Guard: if (typeof window === 'undefined') return

3. app/layout.tsx
  GTM snippet z GTM-XXXXXXX jako placeholder
  Instrukcja w komentarzu: "zamień GTM-XXXXXXX na swój container ID"

4. Podłącz eventy:
  WezwanieForm onGenerate → pushEvent('pismo_generated', { pismo_type: 'wezwanie', template: activeTemplateId })
  DocumentActions PDF → pushEvent('pdf_downloaded', { pismo_type: generatorId })
  CtaPrywaciarz onClick → pushEvent('cta_prywaciarz_click', { pismo_type: generatorId })
```

---

### ETAP 5 — Landing główny + SEO audit + deploy
**Prompt:**
```
1. app/page.tsx — landing główny
  Na start: prosta strona z hero i kartą wezwania (jedyny aktywny generator)
  Karta z status='coming-soon' dla przyszłych generatorów — szary, "wkrótce"
  Dane kart pobieraj z GENERATORS (generators.config.ts) — nie hardcoduj
  metadata: title "Generator pism online | Pismak", JSON-LD: WebSite + Organization

2. SEO audit:
  Sprawdź czy out/wezwanie-do-zaplaty/index.html zawiera H1 i JSON-LD
  Stwórz public/robots.txt z Sitemap: https://pismak.pl/sitemap.xml
  Stwórz app/sitemap.ts — generuje URL tylko dla generatorów ze status='active'

3. Przygotuj do deployu:
  Potwierdź output: 'export' + trailingSlash: true w next.config.ts
  Sprawdź czy @react-pdf/renderer ma dynamic import z ssr: false
  Napisz DEPLOY.md z instrukcją: vercel deploy + podpięcie domeny
```
**Weryfikacja końcowa:** lista checklist z sekcji 9.

---

### ETAP 6 — v2: Kolejne generatory (po sukcesie MVP)
**Prompt (powtarzaj per generator):**
```
Dodaj generator "[Nazwa]" do istniejącej architektury.

1. Dodaj wpis do lib/generators.config.ts (zmień status z 'coming-soon' na 'active')
2. Dodaj typy do lib/templates/types.ts (odkomentuj TODO lub dodaj nowe)
3. Stwórz lib/templates/[nazwa].ts z funkcjami generate
   Teksty pism: [wklej wzory]
4. Stwórz components/generators/[Nazwa]Form.tsx analogicznie do WezwanieForm
5. Stwórz app/[slug]/page.tsx analogicznie do wezwania
6. Zaktualizuj app/sitemap.ts — nowy URL pojawi się automatycznie przez status: 'active'

Zero zmian w GeneratorShell, DocumentOutput, DocumentActions, CtaPrywaciarz, gtm.ts.
```

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

## 9. Definicja gotowości MVP v1

Przed pierwszym publicznym deployem:

- [ ] Generator wezwania działa end-to-end (formularz → tekst → PDF → print)
- [ ] Switch między 3 wzorami zachowuje pola wspólne
- [ ] `npm run build` przechodzi bez błędów i generuje statyczny HTML
- [ ] `out/wezwanie-do-zaplaty/index.html` zawiera H1 i JSON-LD (nie pusty JS shell)
- [ ] GTM zainstalowany, 3 eventy działają (weryfikacja przez GTM Preview)
- [ ] CTA do Prywaciarza pojawia się po generacji z UTM params
- [ ] PDF nie zawiera logo ani stopki poza tagline'm
- [ ] Landing główny pokazuje kartę wezwania + "wkrótce" dla przyszłych generatorów
- [ ] Sitemap zawiera tylko aktywne URL (`/wezwanie-do-zaplaty`)
- [ ] Strona działa na mobile

**Gotowość v2 (kolejny generator):**
- [ ] Nowy wpis w `generators.config.ts`
- [ ] Nowe typy w `types.ts`
- [ ] Nowy plik `lib/templates/[nazwa].ts`
- [ ] Nowy `[Nazwa]Form.tsx`
- [ ] Nowa strona `app/[slug]/page.tsx`
- [ ] Zero zmian w GeneratorShell, DocumentOutput, DocumentActions, CtaPrywaciarz