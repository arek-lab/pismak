// ============================================================
// WZORY: Wezwanie do zapłaty (Wzor1, Wzor2, Wzor3)
// Źródło: docs/wzory.md
// ============================================================

import type {
  FieldConfig,
  WezwanieStandardFields,
  WezwaniePrzedSadoweFields,
  WezwanieUproszczoneFields,
} from './types'

// ─── SHARED FIELD CONFIGS ────────────────────────────────────

const sharedFields = {
  nazwaWierzyciela: {
    key: 'nazwaWierzyciela',
    label: 'Nazwa wierzyciela',
    type: 'text' as const,
    placeholder: 'np. Firma XYZ sp. z o.o.',
    required: true,
    helpText: 'Pełna nazwa firmy lub imię i nazwisko wierzyciela',
  },
  nipWierzyciela: {
    key: 'nipWierzyciela',
    label: 'NIP wierzyciela',
    type: 'text' as const,
    placeholder: 'np. 123-456-78-90',
    required: true,
  },
  adresWierzyciela: {
    key: 'adresWierzyciela',
    label: 'Adres wierzyciela',
    type: 'text' as const,
    placeholder: 'np. ul. Przykładowa 1, 00-001 Warszawa',
    required: true,
  },
  nazwaDluznika: {
    key: 'nazwaDluznika',
    label: 'Nazwa dłużnika',
    type: 'text' as const,
    placeholder: 'np. Kontrahent ABC S.A.',
    required: true,
    helpText: 'Pełna nazwa firmy lub imię i nazwisko dłużnika',
  },
  adresDluznika: {
    key: 'adresDluznika',
    label: 'Adres dłużnika',
    type: 'text' as const,
    placeholder: 'np. ul. Dłużnicka 5, 00-002 Kraków',
    required: true,
  },
  miejscowosc: {
    key: 'miejscowosc',
    label: 'Miejscowość wystawienia',
    type: 'text' as const,
    placeholder: 'np. Warszawa',
    required: true,
  },
  dataWystawienia: {
    key: 'dataWystawienia',
    label: 'Data wystawienia',
    type: 'date' as const,
    required: true,
  },
  nrFaktury: {
    key: 'nrFaktury',
    label: 'Numer faktury',
    type: 'text' as const,
    placeholder: 'np. FV/2026/01/123',
    required: true,
  },
  dataFaktury: {
    key: 'dataFaktury',
    label: 'Data faktury',
    type: 'date' as const,
    required: true,
  },
  kwota: {
    key: 'kwota',
    label: 'Kwota należności głównej',
    type: 'number' as const,
    placeholder: 'np. 1500.00',
    required: true,
    helpText: 'Kwota z faktury bez odsetek',
  },
  waluta: {
    key: 'waluta',
    label: 'Waluta',
    type: 'text' as const,
    placeholder: 'PLN',
    required: true,
  },
  terminZaplaty: {
    key: 'terminZaplaty',
    label: 'Termin zapłaty (dni)',
    type: 'number' as const,
    placeholder: 'np. 7',
    required: true,
    helpText: 'Liczba dni od doręczenia wezwania',
  },
  kwotaLacznie: {
    key: 'kwotaLacznie',
    label: 'Łączna kwota do zapłaty',
    type: 'number' as const,
    placeholder: 'np. 1553.79',
    required: true,
    helpText: 'Należność główna + naliczone odsetki',
  },
  nrKonta: {
    key: 'nrKonta',
    label: 'Numer konta bankowego',
    type: 'text' as const,
    placeholder: 'np. 12 3456 7890 1234 5678 9012 3456',
    required: true,
  },
} satisfies Record<string, FieldConfig>

// ─── TEMPLATES ───────────────────────────────────────────────

export const wezwanieTemplates = {
  standardowe: {
    id: 'standardowe',
    label: 'Standardowe wezwanie do zapłaty',
    description: 'Pierwsze wezwanie do zapłaty w pełnej formie — z zestawieniem należności i pouczeniem prawnym.',
    fields: [
      sharedFields.nazwaWierzyciela,
      sharedFields.nipWierzyciela,
      sharedFields.adresWierzyciela,
      sharedFields.nazwaDluznika,
      sharedFields.adresDluznika,
      sharedFields.miejscowosc,
      sharedFields.dataWystawienia,
      sharedFields.nrFaktury,
      sharedFields.dataFaktury,
      sharedFields.kwota,
      sharedFields.waluta,
      sharedFields.terminZaplaty,
      {
        key: 'kwotaOdsetekDoDnia',
        label: 'Odsetki do dnia wystawienia wezwania',
        type: 'number' as const,
        placeholder: 'np. 53.79',
        required: true,
        helpText: 'Odsetki ustawowe za opóźnienie (9,25% rocznie) naliczone do dziś',
      } satisfies FieldConfig,
      sharedFields.kwotaLacznie,
      sharedFields.nrKonta,
    ] as FieldConfig[],
    generate: (f: WezwanieStandardFields): string => `**WEZWANIE DO ZAPŁATY**

Dokument wygenerowany na podstawie art. 455 KC i art. 481 KC

## I. Dane stron

| **Wierzyciel:** | **${f.nazwaWierzyciela}** |
|---|---|
| **Adres:** | ${f.adresWierzyciela} |
| **NIP:** | ${f.nipWierzyciela} |

| **Dłużnik:** | **${f.nazwaDluznika}** |
|---|---|
| **Adres:** | ${f.adresDluznika} |

| **Miejscowość i data:** | ${f.miejscowosc}, dnia ${f.dataWystawienia} r. |
|---|---|

## II. Wezwanie do zapłaty

Działając w imieniu **${f.nazwaWierzyciela}**, niniejszym wzywamy Państwa do niezwłocznego uregulowania zaległej należności wynikającej z faktury VAT nr **${f.nrFaktury}** z dnia **${f.dataFaktury}** r.

Pomimo upływu terminu płatności, należność w kwocie **${f.kwota} ${f.waluta}** nie została dotychczas uregulowana. Wzywamy Państwa do jej zapłaty w terminie **${f.terminZaplaty}** dni od dnia doręczenia niniejszego pisma, zgodnie z art. 455 Kodeksu cywilnego.

## III. Zestawienie należności

| **Pozycja** | **Kwota (${f.waluta})** |
|---|---|
| Należność główna (faktura ${f.nrFaktury}) | ${f.kwota} |
| Odsetki ustawowe za opóźnienie (art. 481 KC, 9,25% rocznie) do dnia wystawienia wezwania | ${f.kwotaOdsetekDoDnia} |
| **ŁĄCZNA KWOTA DO ZAPŁATY** | **${f.kwotaLacznie}** |

## IV. Dane do przelewu

| Proszę dokonać przelewu na następujący rachunek bankowy: Numer konta: **${f.nrKonta}** Odbiorca: **${f.nazwaWierzyciela}** Tytuł przelewu: Zapłata faktury ${f.nrFaktury} — wezwanie do zapłaty |
|---|

## V. Konsekwencje braku zapłaty

Informujemy, że w przypadku bezskutecznego upływu wyznaczonego terminu zapłaty, wierzyciel **skieruje sprawę na drogę postępowania sądowego** bez dodatkowego uprzedzenia. W takim przypadku dłużnik zobowiązany będzie do pokrycia — oprócz należności głównej i narastających odsetek — **kosztów postępowania sądowego oraz kosztów zastępstwa procesowego.**

Odsetki ustawowe za opóźnienie naliczane są na podstawie **art. 481 § 2 Kodeksu cywilnego** w wysokości **9,25% rocznie** (stopa referencyjna NBP 3,75% + 5,5 pkt proc., stan na marzec 2026 r.) i będą naliczane aż do dnia faktycznej zapłaty.

| _____________________________ podpis osoby uprawnionej / pieczęć firmowa (opcjonalnie) |  |
|---|---|

> **Podstawa prawna:** art. 455 KC (wymagalność świadczenia), art. 481 KC (odsetki za opóźnienie). Odsetki wyliczone wg stopy obowiązującej od 5 marca 2026 r. Wzór ma charakter informacyjny i nie stanowi porady prawnej.`,
  },

  przedsadowe: {
    id: 'przedsadowe',
    label: 'Ostateczne przedsądowe wezwanie do zapłaty',
    description: 'Ostateczne wezwanie przed skierowaniem sprawy do sądu — zawiera odwołanie do poprzedniej korespondencji i możliwość ugody.',
    fields: [
      sharedFields.nazwaWierzyciela,
      sharedFields.nipWierzyciela,
      sharedFields.adresWierzyciela,
      sharedFields.nazwaDluznika,
      sharedFields.adresDluznika,
      sharedFields.miejscowosc,
      sharedFields.dataWystawienia,
      {
        key: 'dataPopprzedniegoWezwania',
        label: 'Data poprzedniego wezwania',
        type: 'date' as const,
        required: true,
        helpText: 'Data pierwszego (standardowego) wezwania do zapłaty',
      } satisfies FieldConfig,
      sharedFields.nrFaktury,
      sharedFields.dataFaktury,
      sharedFields.kwota,
      sharedFields.waluta,
      {
        key: 'terminOstateczny',
        label: 'Ostateczny termin zapłaty (dni)',
        type: 'number' as const,
        placeholder: 'np. 7',
        required: true,
        helpText: 'Liczba dni od doręczenia ostatecznego wezwania',
      } satisfies FieldConfig,
      {
        key: 'kwotaOdsetek',
        label: 'Odsetki naliczone na dzień poprzedniego wezwania',
        type: 'number' as const,
        placeholder: 'np. 53.79',
        required: true,
        helpText: 'Odsetki ustawowe za opóźnienie naliczone na dzień wysłania pierwszego wezwania',
      } satisfies FieldConfig,
      sharedFields.kwotaLacznie,
      sharedFields.nrKonta,
      {
        key: 'informacjaOUgodzie',
        label: 'Informacja o możliwości ugody',
        type: 'textarea' as const,
        placeholder: 'np. Wierzyciel jest skłonny rozważyć zawarcie ugody i rozłożenie płatności na raty. Prosimy o kontakt w terminie 3 dni od otrzymania niniejszego pisma.',
        required: true,
        helpText: 'Treść propozycji ugodowej lub oświadczenie o gotowości do negocjacji',
      } satisfies FieldConfig,
    ] as FieldConfig[],
    generate: (f: WezwaniePrzedSadoweFields): string => `**OSTATECZNE PRZEDSĄDOWE WEZWANIE DO ZAPŁATY**

Wysyłane na podstawie art. 455 i art. 481 KC — ostateczna szansa ugodowego zakończenia sprawy

> ⚠ **WAŻNE:** Niniejsze pismo stanowi ostateczne wezwanie przed skierowaniem sprawy do sądu. Brak zapłaty w wyznaczonym terminie skutkować będzie wszczęciem postępowania sądowego.

## I. Dane stron

| **Wierzyciel:** | **${f.nazwaWierzyciela}** |
|---|---|
| **Adres:** | ${f.adresWierzyciela} |
| **NIP:** | ${f.nipWierzyciela} |

| **Dłużnik:** | **${f.nazwaDluznika}** |
|---|---|
| **Adres:** | ${f.adresDluznika} |

| **Miejscowość i data:** | ${f.miejscowosc}, dnia ${f.dataWystawienia} r. |
|---|---|

## II. Przebieg dotychczasowej korespondencji

Pismem z dnia **${f.dataPopprzedniegoWezwania}** r. wzywaliśmy Państwa do zapłaty należności wynikającej z faktury VAT nr **${f.nrFaktury}** z dnia **${f.dataFaktury}** r. Pomimo upływu wyznaczonego terminu oraz dotychczasowych wezwań, należność nie została uregulowana.

W związku z powyższym, działając na podstawie **art. 455 Kodeksu cywilnego**, wzywamy Państwa po raz ostatni do zapłaty całości zaległej należności wraz z naliczonymi odsetkami w nieprzekraczalnym terminie **${f.terminOstateczny} dni** od dnia doręczenia niniejszego pisma.

## III. Zestawienie należności

| **Pozycja** | **Kwota (${f.waluta})** |
|---|---|
| Należność główna (faktura ${f.nrFaktury}) | ${f.kwota} |
| Odsetki ustawowe za opóźnienie (art. 481 KC, 9,25% rocznie) naliczone na dzień poprzedniego wezwania | ${f.kwotaOdsetek} |
| Dalsze odsetki narastające do dnia zapłaty | (naliczane bieżąco) |
| **MINIMALNA KWOTA DO ZAPŁATY** | **${f.kwotaLacznie}** |

## IV. Dane do przelewu

| Numer konta: **${f.nrKonta}** / Odbiorca: **${f.nazwaWierzyciela}** / Tytuł: Ostateczna zapłata faktury ${f.nrFaktury} |
|---|

## V. Możliwość ugodowego zakończenia sprawy

${f.informacjaOUgodzie}

## VI. Konsekwencje braku zapłaty

W przypadku bezskutecznego upływu powyższego terminu, sprawa zostanie **bezzwłocznie skierowana do właściwego sądu**. Wierzyciel będzie żądał zasądzenia: należności głównej, odsetek ustawowych za opóźnienie (**art. 481 KC**) naliczanych aż do dnia zapłaty — aktualnie **9,25% rocznie** — oraz zwrotu kosztów postępowania sądowego i zastępstwa procesowego.

Łączne koszty sądowe (wpis + zastępstwo procesowe) mogą znacznie przewyższyć wartość sporu. Ugodowe zakończenie sprawy leży w obopólnym interesie.

| _____________________________ podpis osoby uprawnionej / pieczęć firmowa (opcjonalnie) |  |
|---|---|

> **Podstawa prawna:** art. 455 KC, art. 481 KC, art. 98 KPC (koszty procesu). Odsetki 9,25% rocznie — stan na 5 marca 2026 r. (stopa ref. NBP 3,75% + 5,5 pp). Wzór ma charakter informacyjny i nie stanowi porady prawnej.`,
  },

  uproszczone: {
    id: 'uproszczone',
    label: 'Uproszczone wezwanie do zapłaty',
    description: 'Krótkie, jednostronicowe wezwanie — idealne gdy liczy się czas i prostota przekazu.',
    fields: [
      sharedFields.nazwaWierzyciela,
      sharedFields.nipWierzyciela,
      sharedFields.adresWierzyciela,
      sharedFields.nazwaDluznika,
      sharedFields.adresDluznika,
      sharedFields.miejscowosc,
      sharedFields.dataWystawienia,
      sharedFields.nrFaktury,
      sharedFields.dataFaktury,
      sharedFields.kwota,
      sharedFields.waluta,
      sharedFields.terminZaplaty,
      {
        key: 'kwotaOdsetekDoDnia',
        label: 'Odsetki do dnia wystawienia wezwania',
        type: 'number' as const,
        placeholder: 'np. 53.79',
        required: true,
        helpText: 'Odsetki ustawowe za opóźnienie (9,25% rocznie) naliczone do dziś',
      } satisfies FieldConfig,
      sharedFields.kwotaLacznie,
      sharedFields.nrKonta,
    ] as FieldConfig[],
    generate: (f: WezwanieUproszczoneFields): string => `**WEZWANIE DO ZAPŁATY**

Uproszczone — art. 455 KC

| **Wystawca:** | **${f.nazwaWierzyciela}** / NIP: ${f.nipWierzyciela} |
|---|---|
| **Adres:** | ${f.adresWierzyciela} |
| **Data:** | ${f.miejscowosc}, ${f.dataWystawienia} r. |

| **Adresat:** | **${f.nazwaDluznika}** |
|---|---|
| **Adres:** | ${f.adresDluznika} |

| Wzywamy do zapłaty kwoty **${f.kwotaLacznie} ${f.waluta}** (należność główna: ${f.kwota} ${f.waluta} z faktury nr ${f.nrFaktury} z dnia ${f.dataFaktury} r. + odsetki ustawowe za opóźnienie wg art. 481 KC: ${f.kwotaOdsetekDoDnia} ${f.waluta}). Termin zapłaty: **${f.terminZaplaty} dni** od doręczenia niniejszego pisma. |
|---|

Przelew na konto: **${f.nrKonta}** / odbiorca: **${f.nazwaWierzyciela}**

Tytuł przelewu: **Zapłata faktury ${f.nrFaktury}**

Brak zapłaty w terminie spowoduje skierowanie sprawy na drogę sądową i obowiązek pokrycia kosztów postępowania.

| _____________________________ podpis osoby uprawnionej / pieczęć firmowa (opcjonalnie) |  |
|---|---|

> **Podstawa:** art. 455 KC, art. 481 KC. Odsetki 9,25% rocznie (od 5 marca 2026 r.). Wzór informacyjny, nie stanowi porady prawnej.`,
  },
} as const

export type WezwanieTemplateId = keyof typeof wezwanieTemplates
