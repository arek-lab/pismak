// lib/generators.config.ts
// Rejestr wszystkich generatorów — dodaj nowy wpis tutaj, zero zmian w innych plikach

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
        {
          question: 'Czy wezwanie do zapłaty musi być pisemne?',
          answer: 'Nie ma obowiązku prawnego zachowania formy pisemnej, ale pisemne wezwanie stanowi dowód w postępowaniu sądowym i jest standardem w obrocie gospodarczym.',
        },
        {
          question: 'Ile czasu ma dłużnik na zapłatę po wezwaniu?',
          answer: 'Termin wskazujesz samodzielnie w wezwaniu. Najczęściej stosuje się 7 lub 14 dni. Po bezskutecznym upływie terminu możesz kierować sprawę do sądu.',
        },
        {
          question: 'Czy wezwanie do zapłaty przerywa bieg przedawnienia?',
          answer: 'Samo wezwanie do zapłaty nie przerywa biegu przedawnienia. Przerwanie następuje przez złożenie pozwu lub wniosku o zawezwanie do próby ugodowej.',
        },
        {
          question: 'Jakie dane muszą być w wezwaniu do zapłaty?',
          answer: 'Dane wierzyciela i dłużnika, opis zobowiązania, kwota, termin płatności i numer konta. Opcjonalnie: podstawa prawna i informacja o konsekwencjach braku zapłaty.',
        },
        {
          question: 'Czy można wysłać wezwanie e-mailem?',
          answer: 'Tak, e-mail jest dopuszczalną formą. Dla celów dowodowych warto jednak wysłać wezwanie listem poleconym za potwierdzeniem odbioru.',
        },
      ],
    },
    status: 'active',
  },

  {
    id: 'reklamacja',
    slug: 'odpowiedz-na-reklamacje',
    label: 'Odpowiedź na reklamację',
    description: 'Profesjonalna odpowiedź na reklamację klienta. Trzy wzory: rzeczowa, empatyczna, neutralna.',
    icon: '📨',
    ctaText: 'Obsługujesz reklamacje regularnie? Prywaciarz automatyzuje cały proces →',
    seo: {
      title: 'Odpowiedź na reklamację – darmowy generator online | Pismak',
      description: 'Wygeneruj profesjonalną odpowiedź na reklamację klienta w 60 sekund. Zgodnie z art. 7a ustawy o prawach konsumenta. Bez rejestracji.',
      faqItems: [
        { question: 'Ile czasu mam na odpowiedź na reklamację?', answer: 'Zgodnie z art. 7a ustawy o prawach konsumenta masz 14 dni kalendarzowych od otrzymania reklamacji. Brak odpowiedzi oznacza fikcję uznania reklamacji.' },
        { question: 'Co grozi za brak odpowiedzi na reklamację?', answer: 'Zgodnie z art. 7a ust. 2 ustawy o prawach konsumenta reklamacja jest automatycznie uznana za zasadną — fikcja uznania.' },
        { question: 'Czy odpowiedź na reklamację musi być pisemna?', answer: 'Ustawa nie wymaga formy pisemnej, ale zalecamy e-mail lub list polecony — masz wtedy dowód zachowania terminu 14 dni.' },
        { question: 'Czy mogę ujawnić dane klienta w odpowiedzi?', answer: 'Nie. Odpowiedź na reklamację może być przekazana osobom trzecim. Nie ujawniaj danych osobowych klienta — naruszałoby to RODO.' },
        { question: 'Kiedy użyć wzoru rzeczowego a kiedy empatycznego?', answer: 'Rzeczowy — gdy reklamacja jest bezzasadna i masz dowody. Empatyczny — gdy firma popełniła błąd. Neutralny — gdy zgłoszenie jest niekompletne i czekasz na dokumenty.' },
      ],
    },
    status: 'active',
  },

  {
    id: 'opinia',
    slug: 'odpowiedz-na-opinie-google',
    label: 'Odpowiedź na opinię Google',
    description: 'Profesjonalna odpowiedź na negatywną opinię w Google Maps. Trzy wzory: profesjonalna, empatyczna, neutralna.',
    icon: '⭐',
    ctaText: 'Odpowiadasz na opinie regularnie? Prywaciarz automatyzuje monitoring →',
    seo: {
      title: 'Odpowiedź na opinię Google – darmowy generator online | Pismak',
      description: 'Wygeneruj profesjonalną odpowiedź na negatywną opinię Google w 60 sekund. Zgodnie z RODO. Bez rejestracji.',
      faqItems: [
        { question: 'Czy muszę odpowiadać na opinie Google?', answer: 'Nie ma obowiązku prawnego, ale odpowiedź pokazuje innym klientom że firma reaguje i dba o relacje.' },
        { question: 'Czy mogę ujawnić dane klienta w odpowiedzi?', answer: 'Nie — odpowiedź jest publiczna i widoczna dla wszystkich. Ujawnienie danych osobowych autora opinii naruszałoby RODO.' },
        { question: 'Jak długa powinna być odpowiedź na opinię Google?', answer: 'Maksymalnie 5 zdań — Google obcina widok po ok. 200 znakach. Krótko, rzeczowo, z zaproszeniem do kontaktu.' },
        { question: 'Kiedy użyć wzoru profesjonalnego a kiedy empatycznego?', answer: 'Profesjonalny — gdy opinia jest niesprawiedliwa i masz fakty. Empatyczny — gdy firma popełniła błąd. Neutralny — gdy opinia nie ma treści lub wygląda na fałszywą.' },
        { question: 'Czy odpowiedź na opinię może zaszkodzić wizerunkowo?', answer: 'Tak — agresywna lub defensywna odpowiedź szkodzi bardziej niż sama negatywna opinia. Zawsze zachowaj spokojny, rzeczowy ton.' },
      ],
    },
    status: 'active',
  },

  // -- v2: dopisz tutaj kolejne generatory --
]

export interface AiFeatureConfig {
  id: string
  label: string
  description: string
  icon: string
  slug: string
  status: 'coming-soon'
}

export const AI_FEATURES: AiFeatureConfig[] = [
  {
    id: 'notatka-ze-spotkania',
    label: 'Notatka ze spotkania',
    description: 'Wgraj nagranie lub wklej transkrypt — AI przygotuje strukturalną notatkę.',
    icon: '🎙️',
    slug: 'ai-asystent',
    status: 'coming-soon'
  },
  {
    id: 'podsumuj-dokument',
    label: 'Podsumuj dokument',
    description: 'Wgraj PDF lub Word — AI streści kluczowe punkty w 5 zdaniach.',
    icon: '📋',
    slug: 'ai-asystent',
    status: 'coming-soon'
  },
  {
    id: 'stresc-pismo',
    label: 'Streść pismo od klienta',
    description: 'Wklej treść pisma — AI wyciągnie sedno i sugeruje odpowiedź.',
    icon: '✉️',
    slug: 'ai-asystent',
    status: 'coming-soon'
  },
  {
    id: 'odnies-sie-do-regulaminu',
    label: 'Odnieś się do regulaminu',
    description: 'Podaj regulamin i sytuację — AI wskaże właściwy paragraf i zredaguje odpowiedź.',
    icon: '📜',
    slug: 'ai-asystent',
    status: 'coming-soon'
  },
  {
    id: 'odpowiedz-na-maila',
    label: 'Odpowiedz na maila',
    description: 'Wklej maila od klienta — AI przygotuje profesjonalną odpowiedź.',
    icon: '💬',
    slug: 'ai-asystent',
    status: 'coming-soon'
  },
]
