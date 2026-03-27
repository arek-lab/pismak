'use client'

import { useState } from 'react'
import GeneratorShell from '@/components/generators/GeneratorShell'
import WezwanieForm from '@/components/generators/WezwanieForm'
import { wezwanieTemplates } from '@/lib/templates/wezwanie'
import type { WezwanieTemplateId } from '@/lib/templates/wezwanie'

const TEMPLATES = Object.values(wezwanieTemplates).map((t) => ({
  id: t.id,
  label: t.label,
}))

interface Props {
  generatorId: string
}

export default function WezwanieGeneratorClient({ generatorId }: Props) {
  const [activeTemplateId, setActiveTemplateId] = useState<WezwanieTemplateId>('standardowe')
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)

  const handleTemplateChange = (id: string) => {
    setActiveTemplateId(id as WezwanieTemplateId)
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
      bare
    >
      <WezwanieForm key={formKey} activeTemplateId={activeTemplateId} onGenerate={setGeneratedDocument} />
    </GeneratorShell>
  )
}
