import type { Metadata } from 'next'
import { GENERATORS } from '@/lib/generators.config'
import { softwareApplicationSchema, faqSchema } from '@/lib/schema'
import ReklamacjaGeneratorClient from '@/components/generators/ReklamacjaGeneratorClient'
import Faq from '@/components/Faq'
import GeneratorNav from '@/components/GeneratorNav'
import { ds } from '@/styles/design-system'

const config = GENERATORS.find((g) => g.id === 'reklamacja')!

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  alternates: {
    canonical: 'https://pismak.pl/odpowiedz-na-reklamacje',
  },
}

export default function OdpowiedzNaReklamacjePage() {
  const softwareAppLD = softwareApplicationSchema({
    name: config.label,
    url: 'https://pismak.pl/odpowiedz-na-reklamacje',
    description: config.seo.description,
  })
  const faqLD = faqSchema(config.seo.faqItems)

  return (
    <>
      <GeneratorNav />
      <div className="min-h-screen bg-white">
        <main className={ds.container}>
          <h1 className={`${ds.pageTitle} text-center`}>
            Generator odpowiedzi na reklamację
          </h1>
          <p className={ds.pageLead}>
            Wypełnij pola i wygeneruj profesjonalną odpowiedź w 60 sekund. Trzy wzory: rzeczowa,
            empatyczna, neutralna. Zgodnie z art. 7a ustawy o prawach konsumenta. Bez rejestracji —
            żadne dane nie trafiają na serwer.
          </p>

          <ReklamacjaGeneratorClient generatorId="reklamacja" />

          <Faq items={config.seo.faqItems} />
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />
    </>
  )
}
