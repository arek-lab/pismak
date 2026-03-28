'use client'

import { useLegal } from '@/lib/legal-context'
import { useCookieConsent } from '@/lib/cookie-consent'

export default function LegalFooter() {
  const { openLegal } = useLegal()
  const { resetConsent } = useCookieConsent()

  return (
    <>
      <span className="text-xs text-[#6B6B6B]">© 2026 Pismak</span>
      <button
        type="button"
        onClick={() => openLegal('regulamin')}
        className="text-xs text-[#6B6B6B] underline hover:text-[#1B4332] transition-colors cursor-pointer"
      >
        Regulamin
      </button>
      <button
        type="button"
        onClick={() => openLegal('polityka')}
        className="text-xs text-[#6B6B6B] underline hover:text-[#1B4332] transition-colors cursor-pointer"
      >
        Polityka prywatności
      </button>
      <button
        type="button"
        onClick={resetConsent}
        className="text-xs text-[#6B6B6B] underline hover:text-[#1B4332] transition-colors cursor-pointer"
      >
        Ustawienia cookies
      </button>
    </>
  )
}
