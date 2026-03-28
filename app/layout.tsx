import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display, DM_Sans, DM_Mono, Lato } from 'next/font/google'
import './globals.css'
import { LegalProvider } from '@/lib/legal-context'
import { CookieConsentProvider } from '@/lib/cookie-consent'
import LegalOverlay from '@/components/LegalOverlay'
import LegalFooter from '@/components/LegalFooter'
import CookieBanner from '@/components/CookieBanner'

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

// container ID z Google Tag Manager
const GTM_ID = 'GTM-PENDING'

export const metadata: Metadata = {
  title: 'Pismak — darmowy generator pism firmowych',
  description: 'Generuj profesjonalne pisma firmowe w przeglądarce. Zero rejestracji, RODO-safe.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${lato.variable}`}>
      <head>
        {/* Consent Mode v2 — domyślny stan przed GTM */}
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});` }} />
        {/* GTM — script tag w <head> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        {/* GTM — noscript fallback w <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <CookieConsentProvider>
          <LegalProvider>
            <div className="min-h-screen">
              {children}
            </div>
            <footer className="bg-white border-t border-[#E8E4DC] py-4 px-6 flex justify-center gap-6">
              <LegalFooter />
            </footer>
            <LegalOverlay />
            <CookieBanner />
          </LegalProvider>
        </CookieConsentProvider>
      </body>
    </html>
  )
}
