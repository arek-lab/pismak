'use client'

import { useState } from 'react'
import GeneratorShell from '@/components/generators/GeneratorShell'
import ReklamacjaForm from '@/components/generators/ReklamacjaForm'
import { reklamacjaTemplates } from '@/lib/templates/reklamacja'
import type { ReklamacjaTemplateId } from '@/lib/templates/reklamacja'

const TEMPLATES = Object.values(reklamacjaTemplates).map((t) => ({
  id: t.id,
  label: t.label,
}))

interface Props {
  generatorId: string
}

export default function ReklamacjaGeneratorClient({ generatorId }: Props) {
  const [activeTemplateId, setActiveTemplateId] = useState<ReklamacjaTemplateId>('rzeczowa')
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)

  const handleTemplateChange = (id: string) => {
    setActiveTemplateId(id as ReklamacjaTemplateId)
    setGeneratedDocument(null)
  }

  const handleNewData = () => {
    setGeneratedDocument(null)
    setFormKey((k) => k + 1)
  }

  return (
    <GeneratorShell
      generatorId={generatorId}
      templates={TEMPLATES}
      activeTemplateId={activeTemplateId}
      onTemplateChange={handleTemplateChange}
      generatedDocument={generatedDocument}
      onClear={() => setGeneratedDocument(null)}
      onNewData={handleNewData}
      actions={['copy']}
      outputMode="readonly"
      bare
    >
      <ReklamacjaForm key={formKey} activeTemplateId={activeTemplateId} onGenerate={setGeneratedDocument} />
    </GeneratorShell>
  )
}
