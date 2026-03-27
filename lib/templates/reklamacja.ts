// ============================================================
// WZORY: Odpowiedź na reklamację (rzeczowa, empatyczna, neutralna)
// ============================================================

import type {
  FieldConfig,
  ReklamacjaRzeczowaFields,
  ReklamacjaEmpatycznaFields,
  ReklamacjaNeutralnaFields,
} from './types'

// ─── SHARED FIELD CONFIGS ────────────────────────────────────

const sharedFields = {
  nazwaFirmy: {
    key: 'nazwaFirmy',
    label: 'Nazwa firmy',
    type: 'text' as const,
    placeholder: 'np. Firma XYZ sp. z o.o.',
    required: true,
    helpText: 'Pełna nazwa firmy odpowiadającej na reklamację',
  },
  numerLubDataReklamacji: {
    key: 'numerLubDataReklamacji',
    label: 'Numer lub data reklamacji',
    type: 'text' as const,
    placeholder: 'np. 123/2026 z dnia 15 marca 2026 r.',
    required: true,
    helpText: 'Numer reklamacji i/lub data jej złożenia przez klienta',
  },
  daneKontaktowe: {
    key: 'daneKontaktowe',
    label: 'Dane kontaktowe',
    type: 'text' as const,
    placeholder: 'np. reklamacje@firma.pl lub tel. 22 123 45 67',
    required: true,
    helpText: 'Adres e-mail lub telefon do działu obsługi reklamacji',
  },
} satisfies Record<string, FieldConfig>

// ─── TEMPLATES ───────────────────────────────────────────────

export const reklamacjaTemplates = {
  rzeczowa: {
    id: 'rzeczowa',
    label: 'Odpowiedź rzeczowa (odmowna)',
    description: 'Merytoryczna odmowa reklamacji z uzasadnieniem prawnym lub regulaminowym.',
    fields: [
      sharedFields.nazwaFirmy,
      sharedFields.numerLubDataReklamacji,
      {
        key: 'opisStanowiskaFirmy',
        label: 'Opis stanowiska firmy',
        type: 'textarea' as const,
        placeholder: 'np. produkt był użytkowany niezgodnie z instrukcją obsługi, co spowodowało uszkodzenie mechaniczne nieobjęte gwarancją',
        required: true,
        helpText: 'Wyjaśnienie, dlaczego reklamacja nie może zostać uwzględniona',
      } satisfies FieldConfig,
      {
        key: 'podstawaPrawnaLubRegulaminowa',
        label: 'Podstawa prawna lub regulaminowa',
        type: 'text' as const,
        placeholder: 'np. § 5 ust. 3 Regulaminu Gwarancji lub art. 556³ KC',
        required: true,
        helpText: 'Przepis prawa lub zapis regulaminu będący podstawą odmowy',
      } satisfies FieldConfig,
      sharedFields.daneKontaktowe,
    ] as FieldConfig[],
    generate: (f: ReklamacjaRzeczowaFields): string =>
      `Szanowna Pani / Szanowny Panie,

dziękujemy za kontakt z ${f.nazwaFirmy} i złożenie reklamacji nr / z dnia ${f.numerLubDataReklamacji}.

Po szczegółowym przeanalizowaniu zgłoszenia informujemy, że: ${f.opisStanowiskaFirmy}

Z tego względu, zgodnie z ${f.podstawaPrawnaLubRegulaminowa}, reklamacja nie może zostać uwzględniona.

Rozumiemy, że decyzja ta może być niesatysfakcjonująca. Jeśli mają Państwo dodatkowe informacje lub dokumenty, które mogłyby zmienić nasze stanowisko, prosimy o kontakt pod adresem ${f.daneKontaktowe}.

Z poważaniem,
Zespół ${f.nazwaFirmy}`,
  },

  empatyczna: {
    id: 'empatyczna',
    label: 'Odpowiedź empatyczna (uznanie reklamacji)',
    description: 'Odpowiedź z przeprosinami i propozycją rekompensaty — gdy firma popełniła błąd.',
    fields: [
      sharedFields.nazwaFirmy,
      sharedFields.numerLubDataReklamacji,
      {
        key: 'przeprosinyKontekst',
        label: 'Kontekst przeprosin',
        type: 'textarea' as const,
        placeholder: 'np. opóźnienie w realizacji zamówienia i niedogodności, które Państwu to sprawiło',
        required: true,
        helpText: 'Opis sytuacji, za którą firma przeprasza',
      } satisfies FieldConfig,
      {
        key: 'podjeteLubPlanowaneDzialania',
        label: 'Podjęte lub planowane działania',
        type: 'textarea' as const,
        placeholder: 'np. zamówienie zostało już wysłane priorytetowym kurierem i dotrze do Państwa w ciągu 24 godzin',
        required: true,
        helpText: 'Co firma zrobiła lub zrobi, aby rozwiązać problem',
      } satisfies FieldConfig,
      {
        key: 'formaITerminRekompensaty',
        label: 'Forma i termin rekompensaty',
        type: 'textarea' as const,
        placeholder: 'np. kupon rabatowy 20% na kolejne zakupy, ważny 30 dni, zostanie przesłany na adres e-mail w ciągu 24 godzin',
        required: true,
        helpText: 'Konkretna forma rekompensaty i termin jej realizacji',
      } satisfies FieldConfig,
      sharedFields.daneKontaktowe,
    ] as FieldConfig[],
    generate: (f: ReklamacjaEmpatycznaFields): string =>
      `Szanowna Pani / Szanowny Panie,

w imieniu ${f.nazwaFirmy} dziękujemy za zgłoszenie reklamacji nr / z dnia ${f.numerLubDataReklamacji}.

Przepraszamy za ${f.przeprosinyKontekst}. Nie spełniliśmy oczekiwanego przez Państwa standardu i bierzemy za to odpowiedzialność.

W odpowiedzi na zgłoszenie: ${f.podjeteLubPlanowaneDzialania}

Jako wyraz naszych przeprosin oferujemy: ${f.formaITerminRekompensaty}

Liczymy, że to działanie przywróci Państwa zaufanie. W razie pytań prosimy o kontakt: ${f.daneKontaktowe}

Z poważaniem,
Zespół ${f.nazwaFirmy}`,
  },

  neutralna: {
    id: 'neutralna',
    label: 'Odpowiedź neutralna (żądanie uzupełnienia)',
    description: 'Potwierdzenie przyjęcia reklamacji z prośbą o brakujące dokumenty lub informacje.',
    fields: [
      sharedFields.nazwaFirmy,
      sharedFields.numerLubDataReklamacji,
      {
        key: 'informacjaCzegoPotrzebujeFirma',
        label: 'Czego potrzebuje firma',
        type: 'textarea' as const,
        placeholder: 'np. kopii paragonu lub faktury zakupu, zdjęć uszkodzonego produktu oraz opisu okoliczności powstania wady',
        required: true,
        helpText: 'Lista brakujących dokumentów lub informacji wymaganych do rozpatrzenia reklamacji',
      } satisfies FieldConfig,
      sharedFields.daneKontaktowe,
      {
        key: 'terminOdpowiedziMerytorycznej',
        label: 'Termin odpowiedzi merytorycznej',
        type: 'text' as const,
        placeholder: 'np. 14 dni',
        required: true,
        helpText: 'Termin udzielenia odpowiedzi merytorycznej od otrzymania kompletnego zgłoszenia (art. 7a ustawy o prawach konsumenta)',
      } satisfies FieldConfig,
    ] as FieldConfig[],
    generate: (f: ReklamacjaNeutralnaFields): string =>
      `Szanowna Pani / Szanowny Panie,

potwierdzamy otrzymanie reklamacji nr / z dnia ${f.numerLubDataReklamacji}. Dziękujemy za kontakt z ${f.nazwaFirmy}.

Aby rozpatrzyć zgłoszenie rzetelnie, potrzebujemy: ${f.informacjaCzegoPotrzebujeFirma}

Prosimy o przesłanie brakujących informacji na adres ${f.daneKontaktowe}. Odpowiedzi merytorycznej udzielimy w terminie do ${f.terminOdpowiedziMerytorycznej} od dnia otrzymania kompletnego zgłoszenia (zgodnie z art. 7a ustawy o prawach konsumenta).

Z poważaniem,
Zespół ${f.nazwaFirmy}`,
  },
} as const

export type ReklamacjaTemplateId = keyof typeof reklamacjaTemplates
