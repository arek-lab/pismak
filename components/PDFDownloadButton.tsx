'use client'

import { useState } from 'react'
import { pushEvent } from '@/lib/gtm'

interface PDFDownloadButtonProps {
  content: string
  pismoType: string
}

export default function PDFDownloadButton({ content, pismoType }: PDFDownloadButtonProps) {
  const [generating, setGenerating] = useState(false)

  const handlePDF = async () => {
    setGenerating(true)
    try {
      const [{ pdf }, { PismakPDFDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/PismakPDFDocument'),
      ])

      const element = <PismakPDFDocument content={content} pismoType={pismoType} />
      const blob = await pdf(element as Parameters<typeof pdf>[0]).toBlob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${pismoType}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      pushEvent('pdf_downloaded', { pismo_type: pismoType })
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('Nie udało się wygenerować PDF. Spróbuj użyć przycisku Drukuj.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      onClick={handlePDF}
      disabled={generating}
      className="border border-[#55aaff] text-[#55aaff] px-6 py-3 rounded-xl font-medium hover:bg-[#55aaff]/10 transition-colors"
      type="button"
    >
      {generating ? 'Generuję PDF…' : 'Pobierz PDF'}
    </button>
  )
}
