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

  // -- v2: dopisz tutaj kolejne generatory --
]
