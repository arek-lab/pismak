'use client'

import dynamic from 'next/dynamic'
import { ds } from '@/styles/design-system'

const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), {
  ssr: false,
  loading: () => (
    <button disabled className={ds.btnSecondary} type="button">
      Pobierz PDF
    </button>
  ),
})

interface DocumentActionsProps {
  content: string
  pismoType: string
}

export default function DocumentActions({ content, pismoType }: DocumentActionsProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className={`${ds.actionsRow} no-print`}>
      <button onClick={handlePrint} className={ds.btnSecondary} type="button">
        Drukuj
      </button>
      <PDFDownloadButton content={content} pismoType={pismoType} />
    </div>
  )
}
