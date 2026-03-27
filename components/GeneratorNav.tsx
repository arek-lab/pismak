import Image from 'next/image'
import Link from 'next/link'

export default function GeneratorNav() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Pismak" width={22} height={22} />
          <span className="font-semibold text-sm" style={{ color: '#55aaff' }}>
            Pismak
          </span>
        </Link>
        <span className="text-gray-300 text-sm">/</span>
        <span className="text-sm text-gray-500">Generator</span>
      </div>
    </header>
  )
}
