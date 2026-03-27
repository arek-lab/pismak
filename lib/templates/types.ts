// ============================================================
// ETAP 1 — Typy danych dla generatorów pism
// ============================================================

// ─── WSPÓLNA BAZA ────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseGeneratorFields {}

// ─── KONFIGURACJA PÓL FORMULARZA ─────────────────────────────

export interface FieldConfig {
  key: string
  label: string
  type: 'text' | 'date' | 'number' | 'textarea' | 'checkbox'
  placeholder?: string
  required: boolean
  helpText?: string
}

// ─── 1. WEZWANIE DO ZAPŁATY ──────────────────────────────────

export interface WezwanieBaseFields {
  nazwaWierzyciela: string
  nipWierzyciela: string
  adresWierzyciela: string
  nrRegonWierzyciela?: string
  nazwaDluznika: string
  adresDluznika: string
  miejscowosc: string
  kwota: string
  waluta: 'PLN' | 'EUR' | 'USD'
  dataWystawienia: string
  nrFaktury: string
  dataFaktury: string
  kwotaLacznie: string
  nrKonta: string
}

export interface WezwanieStandardFields extends WezwanieBaseFields {
  terminZaplaty: string
  kwotaOdsetekDoDnia: string
}

export interface WezwaniePrzedSadoweFields extends WezwanieBaseFields {
  dataPopprzedniegoWezwania: string
  kwotaOdsetek: string
  terminOstateczny: string
  informacjaOUgodzie: string
}

export interface WezwanieUproszczoneFields extends WezwanieBaseFields {
  terminZaplaty: string
  kwotaOdsetekDoDnia: string
}

export type WezwanieFields =
  | WezwanieStandardFields
  | WezwaniePrzedSadoweFields
  | WezwanieUproszczoneFields

export type WezwanieTemplateId = 'standardowe' | 'przedsadowe' | 'uproszczone'

// ─── 2. ODPOWIEDŹ NA REKLAMACJĘ ───────────────────────────────

export interface ReklamacjaBaseFields extends BaseGeneratorFields {
  // shared fields
  nazwaFirmy: string
  numerLubDataReklamacji: string
  daneKontaktowe: string
}

export interface ReklamacjaRzeczowaFields extends ReklamacjaBaseFields {
  opisStanowiskaFirmy: string
  podstawaPrawnaLubRegulaminowa: string
}

export interface ReklamacjaEmpatycznaFields extends ReklamacjaBaseFields {
  przeprosinyKontekst: string
  podjeteLubPlanowaneDzialania: string
  formaITerminRekompensaty: string
}

export interface ReklamacjaNeutralnaFields extends ReklamacjaBaseFields {
  informacjaCzegoPotrzebujeFirma: string
  terminOdpowiedziMerytorycznej: string
}

export type ReklamacjaFields =
  | ReklamacjaRzeczowaFields
  | ReklamacjaEmpatycznaFields
  | ReklamacjaNeutralnaFields

export type ReklamacjaTemplateId = 'rzeczowa' | 'empatyczna' | 'neutralna'

// ─── 3. ODPOWIEDŹ NA OPINIĘ GOOGLE ───────────────────────────

export interface OpiniaBaseFields extends BaseGeneratorFields {
  // shared fields
  nazwaFirmy: string
  daneKontaktowe: string
}

export interface OpinaaProfesjonalnaFields extends OpiniaBaseFields {
  opisSytuacji: string
  propozycjaRozwiazania?: string
}

export interface OpiniaEmpatycznaFields extends OpiniaBaseFields {
  przeprosinyKontekst: string
  działaniaNaprawcze: string
  ofertaRekompensaty?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OpinaaNeutralnaFields extends OpiniaBaseFields {}

export type OpiniaFields =
  | OpinaaProfesjonalnaFields
  | OpiniaEmpatycznaFields
  | OpinaaNeutralnaFields

export type OpiniaTemplateId = 'profesjonalna' | 'empatyczna' | 'neutralna'
