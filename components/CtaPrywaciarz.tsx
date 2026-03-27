'use client'

import { GENERATORS } from '@/lib/generators.config'
import { pushEvent } from '@/lib/gtm'
import { ds } from '@/styles/design-system'

interface CtaPrywacierzProps {
  generatorId: string
  show: boolean
}

export default function CtaPrywaciarz({ generatorId, show }: CtaPrywacierzProps) {
  if (!show) return null

  const config = GENERATORS.find((g) => g.id === generatorId)
  if (!config) return null

  const href = `https://prywaciarz.pl?utm_source=pismak&utm_medium=cta&utm_campaign=${generatorId}`

  const handleClick = () => {
    pushEvent('cta_prywaciarz_click', { source: 'post_generation', pismo_type: generatorId })
  }

  return (
    <div className={`${ds.ctaBox} no-print`}>
      <p className={ds.ctaBoxLabel}>Następny krok</p>
      <p className={ds.ctaBoxHeading}>{config.ctaText}</p>
      <p className={ds.ctaBoxBody}>Prywaciarz automatyzuje to, co robisz ręcznie.</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={ds.ctaBoxBtn}
        onClick={handleClick}
      >
        Sprawdź Prywaciarza
        <span>→</span>
      </a>
    </div>
  )
}
