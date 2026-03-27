// ============================================================
// WZORY: Odpowiedź na opinię Google (profesjonalna, empatyczna, neutralna)
// ============================================================

import type {
  FieldConfig,
  OpinaaProfesjonalnaFields,
  OpiniaEmpatycznaFields,
  OpinaaNeutralnaFields,
} from './types'

// ─── SHARED FIELD CONFIGS ────────────────────────────────────

const sharedFields = {
  nazwaFirmy: {
    key: 'nazwaFirmy',
    label: 'Nazwa firmy',
    type: 'text' as const,
    placeholder: 'np. Firma XYZ sp. z o.o.',
    required: true,
    helpText: 'Pełna nazwa firmy odpowiadającej na opinię',
  },
  daneKontaktowe: {
    key: 'daneKontaktowe',
    label: 'Dane kontaktowe',
    type: 'text' as const,
    placeholder: 'np. kontakt@firma.pl lub tel. 22 123 45 67',
    required: true,
    helpText: 'Adres e-mail lub telefon do bezpośredniego kontaktu',
  },
} satisfies Record<string, FieldConfig>

// ─── TEMPLATES ───────────────────────────────────────────────

export const opiniaTemplates = {
  profesjonalna: {
    id: 'profesjonalna',
    label: 'Odpowiedź profesjonalna',
    description: 'Rzeczowa odpowiedź z odniesieniem do sytuacji i propozycją rozwiązania.',
    fields: [
      sharedFields.nazwaFirmy,
      {
        key: 'opisSytuacji',
        label: 'Opis sytuacji',
        type: 'textarea' as const,
        placeholder: 'np. opóźnienie dostawy wynikające z awarii systemu logistycznego',
        required: true,
        helpText: 'Krótki opis zdarzenia będącego przedmiotem opinii',
      } satisfies FieldConfig,
      {
        key: 'propozycjaRozwiazania',
        label: 'Propozycja rozwiązania (opcjonalnie)',
        type: 'textarea' as const,
        placeholder: 'np. oferujemy zwrot kosztów dostawy lub rabat na kolejne zamówienie',
        required: false,
        helpText: 'Jeśli podana — pojawi się w tekście; jeśli pusta — fragment zniknie',
      } satisfies FieldConfig,
      sharedFields.daneKontaktowe,
    ] as FieldConfig[],
    generate: (f: OpinaaProfesjonalnaFields): string =>
      `Dziękujemy za opinię. Jako ${f.nazwaFirmy} sprawdziliśmy tę sprawę.
Przedmiotowa sytuacja: ${f.opisSytuacji}${f.propozycjaRozwiazania ? ` ${f.propozycjaRozwiazania}` : ''}
Zależy nam na wyjaśnieniu każdej wątpliwości — zapraszamy
do bezpośredniego kontaktu: ${f.daneKontaktowe}.`,
  },

  empatyczna: {
    id: 'empatyczna',
    label: 'Odpowiedź empatyczna',
    description: 'Odpowiedź z przeprosinami, działaniami naprawczymi i ofertą rekompensaty.',
    fields: [
      sharedFields.nazwaFirmy,
      {
        key: 'przeprosinyKontekst',
        label: 'Kontekst przeprosin',
        type: 'textarea' as const,
        placeholder: 'np. klient otrzymał uszkodzony produkt i długo czekał na odpowiedź',
        required: true,
        helpText: 'Opis sytuacji, która nie powinna była mieć miejsca',
      } satisfies FieldConfig,
      {
        key: 'działaniaNaprawcze',
        label: 'Działania naprawcze',
        type: 'textarea' as const,
        placeholder: 'np. wymieniliśmy produkt i wprowadziliśmy dodatkową kontrolę jakości',
        required: true,
        helpText: 'Co firma podjęła lub podejmuje, aby naprawić sytuację',
      } satisfies FieldConfig,
      {
        key: 'ofertaRekompensaty',
        label: 'Oferta rekompensaty (opcjonalnie)',
        type: 'textarea' as const,
        placeholder: 'np. kupon rabatowy 15% na kolejne zakupy',
        required: false,
        helpText: 'Jeśli podana — pojawi się w tekście; jeśli pusta — fragment zniknie',
      } satisfies FieldConfig,
      sharedFields.daneKontaktowe,
    ] as FieldConfig[],
    generate: (f: OpiniaEmpatycznaFields): string =>
      `Przepraszamy — rozumiemy Pana/Pani rozczarowanie.
W ${f.nazwaFirmy} nie powinno dojść do sytuacji, w której ${f.przeprosinyKontekst}
Działania naprawcze: ${f.działaniaNaprawcze}${f.ofertaRekompensaty ? ` ${f.ofertaRekompensaty}` : ''}
Prosimy o kontakt pod ${f.daneKontaktowe} — chcemy to naprawić.`,
  },

  neutralna: {
    id: 'neutralna',
    label: 'Odpowiedź neutralna',
    description: 'Standardowa odpowiedź na opinię bez treści — zaproszenie do kontaktu.',
    fields: [
      sharedFields.nazwaFirmy,
      sharedFields.daneKontaktowe,
    ] as FieldConfig[],
    generate: (f: OpinaaNeutralnaFields): string =>
      `Dziękujemy za ocenę. Nie możemy odnieść się do szczegółów,
ponieważ opinia nie zawiera treści. Zespół ${f.nazwaFirmy}
pozostaje do dyspozycji pod ${f.daneKontaktowe} —
każda uwaga jest dla nas ważna.`,
  },
} as const

export type OpiniaTemplateId = keyof typeof opiniaTemplates
