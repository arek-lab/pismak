'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" onClick={close}>
          <Image src="/logo.png" alt="Pismak logo" width={28} height={28} />
          <span className="text-lg font-semibold tracking-tight" style={{ color: '#55aaff' }}>
            Pismak
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#generatory"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Generatory
          </a>
          <a
            href="#jak-dziala"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Jak działa
          </a>
          <a
            href="https://maskpii.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 rounded-full bg-[#55aaff] text-white font-medium hover:bg-[#3d99ff] transition-colors"
          >
            Prywaciarz
          </a>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            <a
              href="#generatory"
              onClick={close}
              className="flex items-center min-h-[44px] py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b border-gray-100 transition-colors"
            >
              Generatory
            </a>
            <a
              href="#jak-dziala"
              onClick={close}
              className="flex items-center min-h-[44px] py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b border-gray-100 transition-colors"
            >
              Jak działa
            </a>
            <div className="py-3">
              <a
                href="https://maspii.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-[#55aaff] text-white font-medium text-sm hover:bg-[#3d99ff] transition-colors"
              >
                Prywaciarz →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
