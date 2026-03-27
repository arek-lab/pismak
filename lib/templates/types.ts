// ============================================================
// ETAP 1 — Typy danych dla generatorów pism
// ============================================================

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
