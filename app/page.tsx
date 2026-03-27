import type { Metadata } from 'next'
import { websiteSchema, organizationSchema } from '@/lib/schema'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import GeneratorsSection from '@/components/landing/GeneratorsSection'
import PrivacySection from '@/components/landing/PrivacySection'
import PismakFeatures from '@/components/landing/PismakFeatures'
import AITransitionSection from '@/components/landing/AITransitionSection'
import FinalCta from '@/components/landing/FinalCta'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Generator pism online | Pismak',
  description:
    'Darmowe generatory pism firmowych online. Bez rejestracji. Dane pozostają w przeglądarce.',
  alternates: { canonical: 'https://pismak.pl' },
}

export default function HomePage() {
  const websiteLD = websiteSchema({ url: 'https://pismak.pl', name: 'Pismak' })
  const orgLD = organizationSchema({
    name: 'Pismak',
    url: 'https://pismak.pl',
    description:
      'Bezpłatne generatory pism firmowych działające w przeglądarce. Projekt twórców Prywaciarza.',
  })

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <Hero />
        <GeneratorsSection />
        <PrivacySection />
        <PismakFeatures />
        <AITransitionSection />
        <FinalCta />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLD) }}
      />
    </>
  )
}
