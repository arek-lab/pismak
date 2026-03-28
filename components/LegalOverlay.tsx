'use client'

import { useEffect } from 'react'
import { useLegal } from '@/lib/legal-context'
import { REGULAMIN_TYTUL, RegulaminContent } from '@/lib/legal/regulamin'
import { POLITYKA_TYTUL, PolitykaPrywatnosci } from '@/lib/legal/polityka-prywatnosci'

export default function LegalOverlay() {
  const { legalState, closeLegal } = useLegal()
  const { isOpen, type } = legalState

  // Escape key closes overlay
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLegal()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLegal])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !type) return null

  const title = type === 'regulamin' ? REGULAMIN_TYTUL : POLITYKA_TYTUL

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      onClick={closeLegal}
    >
      <div
        className="relative bg-white max-w-2xl mx-auto mt-8 mb-8 rounded-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC]">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: 'var(--font-playfair, serif)' }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={closeLegal}
            className="text-sm text-[#6B6B6B] hover:text-[#1B4332] transition-colors cursor-pointer"
          >
            ✕ Zamknij
          </button>
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-dm-sans, sans-serif)' }}
        >
          {type === 'regulamin' ? <RegulaminContent /> : <PolitykaPrywatnosci />}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-[#E8E4DC] p-4 flex justify-center">
          <button
            type="button"
            onClick={closeLegal}
            className="px-6 py-2 text-sm font-medium text-[#6B6B6B] hover:text-[#1B4332] transition-colors cursor-pointer"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  )
}
