import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-4 sm:py-10 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Pismak" width={22} height={22} />
          <span className="text-sm font-semibold" style={{ color: '#55aaff' }}>
            Pismak
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 text-sm text-gray-500">
          {/* <Link
            href="/wezwanie-do-zaplaty"
            className="hover:text-gray-900 transition-colors min-h-[44px] flex items-center"
          >
            Wezwanie do zapłaty
          </Link> */}
          <a
            href="https://maspii.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors min-h-[44px] flex items-center"
          >
            Prywaciarz
          </a>
        </div>

        <p className="text-xs text-gray-400 text-center md:text-right max-w-[260px]">
          Pismak działa w 100% lokalnie — dane nie są zapisywane ani wysyłane na serwer.
        </p>
      </div>
    </footer>
  )
}
