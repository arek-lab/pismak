import type { Metadata } from 'next'
import { GENERATORS } from '@/lib/generators.config'
import { softwareApplicationSchema, faqSchema } from '@/lib/schema'
import OpiniaGeneratorClient from '@/components/generators/OpiniaGeneratorClient'
import Faq from '@/components/Faq'
import GeneratorNav from '@/components/GeneratorNav'
import { ds } from '@/styles/design-system'

const config = GENERATORS.find((g) => g.id === 'opinia')!

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  alternates: {
    canonical: 'https://pismak.pl/odpowiedz-na-opinie-google',
  },
}

export default function OdpowiedzNaOpinieGooglePage() {
  const softwareAppLD = softwareApplicationSchema({
    name: config.label,
    url: 'https://pismak.pl/odpowiedz-na-opinie-google',
    description: config.seo.description,
  })
  const faqLD = faqSchema(config.seo.faqItems)

  return (
    <>
      <GeneratorNav />
      <div className="min-h-screen bg-white">
        <main className={ds.container}>
          <h1 className={`${ds.pageTitle} text-center`}>
            Generator odpowiedzi na opinię Google
          </h1>
          <p className={ds.pageLead}>
            Wypełnij pola i wygeneruj profesjonalną odpowiedź w 60 sekund. Trzy wzory: profesjonalna,
            empatyczna, neutralna. Zgodnie z RODO. Bez rejestracji — żadne dane nie trafiają na serwer.
          </p>

          <OpiniaGeneratorClient generatorId="opinia" />

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
