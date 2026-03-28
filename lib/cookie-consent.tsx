'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { initConsentMode } from '@/lib/gtm'

export type ConsentState = 'undecided' | 'accepted' | 'declined'

const STORAGE_KEY = 'pismak_cookie_consent'
const VALIDITY_MS = 12 * 30 * 24 * 60 * 60 * 1000 // ~12 months

interface StoredConsent {
  state: 'accepted' | 'declined'
  timestamp: number
}

interface CookieConsentContextValue {
  consentState: ConsentState
  acceptAll: () => void
  declineAll: () => void
  resetConsent: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

function readStoredConsent(): ConsentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'undecided'
    const stored: StoredConsent = JSON.parse(raw)
    if (Date.now() - stored.timestamp > VALIDITY_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return 'undecided'
    }
    return stored.state
  } catch {
    return 'undecided'
  }
}

function saveConsent(state: 'accepted' | 'declined') {
  const stored: StoredConsent = { state, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentState, setConsentState] = useState<ConsentState>('undecided')

  useEffect(() => {
    const stored = readStoredConsent()
    setConsentState(stored)
    if (stored !== 'undecided') {
      initConsentMode(stored)
    }
  }, [])

  function acceptAll() {
    saveConsent('accepted')
    setConsentState('accepted')
    initConsentMode('accepted')
  }

  function declineAll() {
    saveConsent('declined')
    setConsentState('declined')
    initConsentMode('declined')
  }

  function resetConsent() {
    localStorage.removeItem(STORAGE_KEY)
    setConsentState('undecided')
  }

  return (
    <CookieConsentContext.Provider value={{ consentState, acceptAll, declineAll, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}
