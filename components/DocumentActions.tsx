'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ds } from '@/styles/design-system'

const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), {
  ssr: false,
  loading: () => (
    <button disabled className="border border-[#55aaff] text-[#55aaff] px-6 py-3 rounded-xl font-medium hover:bg-[#55aaff]/10 transition-colors" type="button">
      Pobierz PDF
    </button>
  ),
})

interface DocumentActionsProps {
  content: string
  pismoType: string
  actions?: Array<'print' | 'pdf' | 'copy'>
}

export default function DocumentActions({ content, pismoType, actions }: DocumentActionsProps) {
  const [copied, setCopied] = useState(false)
  const activeActions = actions ?? ['print', 'pdf']

  const handlePrint = () => {
    window.print()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`${ds.actionsRow} no-print`}>
      {activeActions.includes('print') && (
        <button onClick={handlePrint} className={ds.btnSecondary} type="button">
          Drukuj
        </button>
      )}
      {activeActions.includes('pdf') && (
        <PDFDownloadButton content={content} pismoType={pismoType} />
      )}
      {activeActions.includes('copy') && (
        <button onClick={handleCopy} className="border border-[#55aaff] text-[#55aaff] px-6 py-3 rounded-xl font-medium hover:bg-[#55aaff]/10 transition-colors" type="button">
          {copied ? 'Skopiowano ✓' : 'Skopiuj tekst'}
        </button>
      )}
    </div>
  )
}
