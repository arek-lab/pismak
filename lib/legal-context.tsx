'use client'

import { createContext, useContext, useState } from 'react'

type LegalType = 'regulamin' | 'polityka'

interface LegalState {
  isOpen: boolean
  type: LegalType | null
}

interface LegalContextValue {
  legalState: LegalState
  openLegal: (type: LegalType) => void
  closeLegal: () => void
}

const LegalContext = createContext<LegalContextValue | null>(null)

export function LegalProvider({ children }: { children: React.ReactNode }) {
  const [legalState, setLegalState] = useState<LegalState>({ isOpen: false, type: null })

  function openLegal(type: LegalType) {
    setLegalState({ isOpen: true, type })
  }

  function closeLegal() {
    setLegalState({ isOpen: false, type: null })
  }

  return (
    <LegalContext.Provider value={{ legalState, openLegal, closeLegal }}>
      {children}
    </LegalContext.Provider>
  )
}

export function useLegal(): LegalContextValue {
  const ctx = useContext(LegalContext)
  if (!ctx) throw new Error('useLegal must be used within LegalProvider')
  return ctx
}
