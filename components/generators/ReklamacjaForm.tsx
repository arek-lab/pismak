'use client'

import { useReducer, useRef, useEffect } from 'react'
import { reklamacjaTemplates } from '@/lib/templates/reklamacja'
import type { ReklamacjaTemplateId } from '@/lib/templates/reklamacja'
import type { FieldConfig } from '@/lib/templates/types'
import { pushEvent } from '@/lib/gtm'

// Shared field keys — preserved on template switch
const SHARED_KEYS = new Set(['nazwaFirmy', 'numerLubDataReklamacji', 'daneKontaktowe'])

const FIRMA_KEYS = new Set(['nazwaFirmy', 'numerLubDataReklamacji'])
const KONTAKT_KEYS = new Set(['daneKontaktowe'])

type State = Record<string, string>
type Action =
  | { type: 'SET'; key: string; value: string }
  | { type: 'KEEP_SHARED' }

function reducer(state: State, action: Action): State {
  if (action.type === 'SET') return { ...state, [action.key]: action.value }
  if (action.type === 'KEEP_SHARED') {
    return Object.fromEntries(Object.entries(state).filter(([k]) => SHARED_KEYS.has(k)))
  }
  return state
}

interface ReklamacjaFormProps {
  activeTemplateId: ReklamacjaTemplateId
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

export default function ReklamacjaForm({ activeTemplateId, onGenerate }: ReklamacjaFormProps) {
  const [fields, dispatch] = useReducer(reducer, {})
  const prevTemplateRef = useRef<ReklamacjaTemplateId>(activeTemplateId)

  useEffect(() => {
    if (prevTemplateRef.current !== activeTemplateId) {
      dispatch({ type: 'KEEP_SHARED' })
      prevTemplateRef.current = activeTemplateId
    }
  }, [activeTemplateId])

  const template = reklamacjaTemplates[activeTemplateId]

  const firmaFields = template.fields.filter((f) => FIRMA_KEYS.has(f.key))
  const specificFields = template.fields.filter((f) => !FIRMA_KEYS.has(f.key) && !KONTAKT_KEYS.has(f.key))
  const kontaktFields = template.fields.filter((f) => KONTAKT_KEYS.has(f.key))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = template.generate(fields as any)
    pushEvent('pismo_generated', { pismo_type: 'reklamacja', template: activeTemplateId })
    onGenerate(doc)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ fontFamily: 'var(--font-lato, Lato, sans-serif)' }}
    >
      {firmaFields.length > 0 && (
        <div>
          <p style={sectionHeadingStyle}>Dane firmy</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
            {firmaFields.map((field) => (
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

      {specificFields.length > 0 && (
        <div className={firmaFields.length > 0 ? sectionSeparatorClass : ''}>
          <p style={sectionHeadingStyle}>Treść odpowiedzi</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
            {specificFields.map((field) => (
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

      {kontaktFields.length > 0 && (
        <div className={sectionSeparatorClass}>
          <p style={sectionHeadingStyle}>Kontakt</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
            {kontaktFields.map((field) => (
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
        Wygeneruj odpowiedź
      </button>
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
        type={field.type}
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
