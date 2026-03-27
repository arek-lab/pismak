'use client'

import { useState } from 'react'
import GeneratorShell from '@/components/generators/GeneratorShell'
import OpiniaForm from '@/components/generators/OpiniaForm'
import { opiniaTemplates } from '@/lib/templates/opinia'
import type { OpiniaTemplateId } from '@/lib/templates/opinia'

const TEMPLATES = Object.values(opiniaTemplates).map((t) => ({
  id: t.id,
  label: t.label,
}))

interface Props {
  generatorId: string
}

export default function OpiniaGeneratorClient({ generatorId }: Props) {
  const [activeTemplateId, setActiveTemplateId] = useState<OpiniaTemplateId>('profesjonalna')
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)

  const handleTemplateChange = (id: string) => {
    setActiveTemplateId(id as OpiniaTemplateId)
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
      outputMode="editable"
      bare
    >
      <OpiniaForm key={formKey} activeTemplateId={activeTemplateId} onGenerate={setGeneratedDocument} />
    </GeneratorShell>
  )
}
