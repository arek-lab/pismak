'use client'

import { useState, useEffect } from 'react'
import { useCookieConsent } from '@/lib/cookie-consent'
import { useLegal } from '@/lib/legal-context'

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const { consentState, acceptAll, declineAll } = useCookieConsent()
  const { openLegal } = useLegal()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || consentState !== 'undecided') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E4DC] shadow-sm px-6 py-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <p className="font-['DM_Sans'] text-sm text-[#374151] max-w-xl">
          Używamy plików cookie do analizy ruchu i optymalizacji reklam Google. Możesz zaakceptować
          wszystkie lub wybrać tylko niezbędne.{' '}
          <button
            type="button"
            onClick={() => openLegal('polityka')}
            className="text-xs underline text-[#6B6B6B]"
          >
            Polityka prywatności
          </button>
        </p>
        <div className="flex flex-row-reverse sm:flex-row gap-3 shrink-0">
          <button
            type="button"
            onClick={acceptAll}
            className="bg-[#55aaff] text-white font-['DM_Sans'] text-sm px-4 py-2 rounded-xl hover:bg-[#3d99ff] transition-colors cursor-pointer"
          >
            Zgadzam się
          </button>
          <button
            type="button"
            onClick={declineAll}
            className="bg-white text-[#55aaff] border border-[#55aaff] font-['DM_Sans'] text-sm px-4 py-2 rounded-xl hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            Tylko niezbędne
          </button>
        </div>
      </div>
    </div>
  )
}
