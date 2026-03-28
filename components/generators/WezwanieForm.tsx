'use client'

import { useReducer, useRef, useEffect } from 'react'
import { useLegal } from '@/lib/legal-context'
import { wezwanieTemplates } from '@/lib/templates/wezwanie'
import type { WezwanieTemplateId } from '@/lib/templates/wezwanie'
import type { FieldConfig } from '@/lib/templates/types'
import { pushEvent } from '@/lib/gtm'

// Keys from WezwanieBaseFields — preserved on template switch
const BASE_FIELD_KEYS = new Set([
  'nazwaWierzyciela',
  'nipWierzyciela',
  'adresWierzyciela',
  'nrRegonWierzyciela',
  'nazwaDluznika',
  'adresDluznika',
  'miejscowosc',
  'kwota',
  'waluta',
  'dataWystawienia',
  'nrFaktury',
  'dataFaktury',
  'kwotaLacznie',
  'nrKonta',
])

const WIERZYCIEL_KEYS = new Set(['nazwaWierzyciela', 'nipWierzyciela', 'adresWierzyciela', 'nrRegonWierzyciela'])
const DLUZNIK_KEYS = new Set(['nazwaDluznika', 'adresDluznika'])

type State = Record<string, string>
type Action =
  | { type: 'SET'; key: string; value: string }
  | { type: 'KEEP_BASE' }

function reducer(state: State, action: Action): State {
  if (action.type === 'SET') return { ...state, [action.key]: action.value }
  if (action.type === 'KEEP_BASE') {
    return Object.fromEntries(Object.entries(state).filter(([k]) => BASE_FIELD_KEYS.has(k)))
  }
  return state
}

interface WezwanieFormProps {
  activeTemplateId: WezwanieTemplateId
  onGenerate: (doc: string) => void
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-playfair, serif)',
  fontVariant: 'small-caps',
  letterSpacing: '0.12em',
  fontSize: '0.7rem',
  color: '#6b7280',
  fontWeight: 500,
  textTransform: 'uppercase',
  marginBottom: '1.25rem',
}

const sectionSeparatorClass = 'mt-10 pt-10 border-t border-[#f0f0f0]'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export default function WezwanieForm({ activeTemplateId, onGenerate }: WezwanieFormProps) {
  const { openLegal } = useLegal()
  const today = todayISO()
  const [fields, dispatch] = useReducer(reducer, {
    waluta: 'PLN',
    dataWystawienia: today,
    dataFaktury: today,
  })
  const prevTemplateRef = useRef<WezwanieTemplateId>(activeTemplateId)

  // When template changes: preserve base fields, clear template-specific
  useEffect(() => {
    if (prevTemplateRef.current !== activeTemplateId) {
      dispatch({ type: 'KEEP_BASE' })
      prevTemplateRef.current = activeTemplateId
    }
  }, [activeTemplateId])

  const template = wezwanieTemplates[activeTemplateId]

  const wierzycielFields = template.fields.filter((f) => WIERZYCIEL_KEYS.has(f.key))
  const dluznikFields = template.fields.filter((f) => DLUZNIK_KEYS.has(f.key))
  const szczegolyFields = template.fields.filter((f) => !WIERZYCIEL_KEYS.has(f.key) && !DLUZNIK_KEYS.has(f.key))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = template.generate(fields as any)
    pushEvent('pismo_generated', { pismo_type: 'wezwanie', template: activeTemplateId })
    onGenerate(doc)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ fontFamily: 'var(--font-lato, Lato, sans-serif)' }}
    >
      {wierzycielFields.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Dane wierzyciela</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
            {wierzycielFields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={fields[field.key] ?? ''}
                onChange={(v) => dispatch({ type: 'SET', key: field.key, value: v })}
              />
            ))}
          </div>
        </div>
      )}

      {dluznikFields.length > 0 && (
        <div className={wierzycielFields.length > 0 ? sectionSeparatorClass : ''}>
          <p style={sectionHeadingStyle}>Dane dłużnika</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
            {dluznikFields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={fields[field.key] ?? ''}
                onChange={(v) => dispatch({ type: 'SET', key: field.key, value: v })}
              />
            ))}
          </div>
        </div>
      )}

      {szczegolyFields.length > 0 && (
        <div className={(wierzycielFields.length > 0 || dluznikFields.length > 0) ? sectionSeparatorClass : ''}>
          <p style={sectionHeadingStyle}>Szczegóły</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
            {szczegolyFields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={fields[field.key] ?? ''}
                onChange={(v) => dispatch({ type: 'SET', key: field.key, value: v })}
              />
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full mt-12 py-3 px-6 bg-[#55aaff] text-white text-sm font-medium tracking-wide hover:bg-[#3d99ff] transition-colors duration-200 rounded-[2px] block text-center"
      >
        Wygeneruj wezwanie
      </button>
      <p className="text-xs text-[#6B6B6B] mt-2 text-center font-['DM_Sans']">
        Generując dokument akceptujesz{' '}
        <button
          type="button"
          onClick={() => openLegal('regulamin')}
          className="underline hover:text-[#1B4332] transition-colors cursor-pointer"
        >
          regulamin serwisu
        </button>.
      </p>
    </form>
  )
}

const inputClass =
  'w-full bg-transparent border-0 border-b border-b-[1.5px] border-[#e5e7eb] focus:border-[#374151] outline-none px-0 py-2 text-[0.875rem] text-[#374151] placeholder:text-[#d1d5db] transition-[border-color] duration-200'

const labelClass = 'block text-[0.75rem] font-medium text-[#4b5563] uppercase tracking-wider mb-2'

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig
  value: string
  onChange: (v: string) => void
}) {
  const isFullWidth = field.type === 'textarea'
  const wrapperClass = isFullWidth ? 'md:col-span-2' : ''

  const label = (
    <label className={labelClass}>
      {field.label}
      {field.required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )

  const helpText = field.helpText ? (
    <p className="text-xs text-[#9ca3af] mt-1.5">{field.helpText}</p>
  ) : null

  if (field.key === 'waluta') {
    return (
      <div className={wrapperClass}>
        {label}
        <select
          className={`${inputClass} cursor-pointer`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        >
          <option value="PLN">PLN – złoty</option>
          <option value="EUR">EUR – euro</option>
          <option value="USD">USD – dolar</option>
        </select>
        {helpText}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className={wrapperClass}>
        {label}
        <textarea
          className={`${inputClass} resize-none`}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
        {helpText}
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      {label}
      <input
        type={field.type === 'number' ? 'text' : field.type}
        inputMode={field.type === 'number' ? 'decimal' : undefined}
        className={inputClass}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      />
      {helpText}
    </div>
  )
}
