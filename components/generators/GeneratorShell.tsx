'use client'

import { ReactNode } from 'react'
import DocumentOutput from '@/components/DocumentOutput'
import DocumentActions from '@/components/DocumentActions'
import CtaPrywaciarz from '@/components/CtaPrywaciarz'
import { ds } from '@/styles/design-system'

interface Template {
  id: string
  label: string
}

interface GeneratorShellProps {
  generatorId: string
  templates: Template[]
  activeTemplateId: string
  onTemplateChange: (id: string) => void
  children: ReactNode
  generatedDocument: string | null
  onClear: () => void
  onNewData?: () => void
  bare?: boolean
}

export default function GeneratorShell({
  generatorId,
  templates,
  activeTemplateId,
  onTemplateChange,
  children,
  generatedDocument,
  onClear,
  onNewData,
  bare = false,
}: GeneratorShellProps) {
  if (bare) {
    return (
      <div className="max-w-[680px] mx-auto overflow-x-hidden">
        {/* Tabs — underline style */}
        <div role="tablist" className="flex flex-col sm:flex-row gap-0 mb-10 border-b border-[#e5e7eb]">
          {templates.map((template) => (
            <button
              key={template.id}
              role="tab"
              className={`pb-2.5 px-5 text-sm font-medium transition-colors duration-150 cursor-pointer -mb-px border-b-2 ${
                activeTemplateId === template.id
                  ? 'text-[#55aaff] border-[#55aaff]'
                  : 'text-[#9ca3af] border-transparent hover:text-[#55aaff]'
              }`}
              onClick={() => onTemplateChange(template.id)}
              type="button"
            >
              {template.label}
            </button>
          ))}
        </div>

        <div>{children}</div>

        {generatedDocument !== null && (
          <div className={ds.generatorOutput}>
            <p className={ds.sectionDivider}>Wygenerowany dokument</p>

            <DocumentOutput content={generatedDocument} />

            <DocumentActions content={generatedDocument} pismoType={generatorId} />

            <CtaPrywaciarz generatorId={generatorId} show={true} />

            <div className="flex gap-3 justify-center">
              {onNewData && (
                <button
                  className={ds.btnGhost}
                  onClick={onNewData}
                  type="button"
                >
                  Nowe dane
                </button>
              )}
              <button
                className={ds.btnGhost}
                onClick={onClear}
                type="button"
              >
                Wygeneruj ponownie
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={ds.cardPadded}>
      {/* Tabs — switch wzorów */}
      <div role="tablist" className={ds.tabsWrapper}>
        {templates.map((template) => (
          <button
            key={template.id}
            role="tab"
            className={`${ds.tab}${activeTemplateId === template.id ? ` ${ds.tabActive}` : ''}`}
            onClick={() => onTemplateChange(template.id)}
            type="button"
          >
            {template.label}
          </button>
        ))}
      </div>

      {/* Slot na formularz konkretnego generatora */}
      <div>{children}</div>

      {/* Sekcja dokumentu — widoczna po generacji */}
      {generatedDocument !== null && (
        <div className={ds.generatorOutput}>
          <p className={ds.sectionDivider}>Wygenerowany dokument</p>

          <DocumentOutput content={generatedDocument} />

          <DocumentActions content={generatedDocument} pismoType={generatorId} />

          <CtaPrywaciarz generatorId={generatorId} show={true} />

          <button
            className={ds.btnGhost}
            onClick={onClear}
            type="button"
          >
            Wyczyść i wygeneruj ponownie
          </button>
        </div>
      )}
    </div>
  )
}
