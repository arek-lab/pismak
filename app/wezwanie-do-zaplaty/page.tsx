import type { Metadata } from 'next'
import { GENERATORS } from '@/lib/generators.config'
import { softwareApplicationSchema, faqSchema } from '@/lib/schema'
import WezwanieGeneratorClient from '@/components/generators/WezwanieGeneratorClient'
import Faq from '@/components/Faq'
import GeneratorNav from '@/components/GeneratorNav'
import { ds } from '@/styles/design-system'

const config = GENERATORS.find((g) => g.id === 'wezwanie')!

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  alternates: {
    canonical: 'https://pismak.pl/wezwanie-do-zaplaty',
  },
}

export default function WezwanieDoZaplatyPage() {
  const softwareAppLD = softwareApplicationSchema({
    name: config.label,
    url: 'https://pismak.pl/wezwanie-do-zaplaty',
    description: config.seo.description,
  })
  const faqLD = faqSchema(config.seo.faqItems)

  return (
    <>
      <GeneratorNav />
      <div className="min-h-screen bg-white">
        <main className={ds.container}>
          <h1 className={`${ds.pageTitle} text-center`}>
            Generator wezwań do zapłaty
          </h1>
          <p className={ds.pageLead}>
            Wypełnij pola i wygeneruj profesjonalne wezwanie w 60 sekund. Trzy wzory: standardowe,
            przedsądowe, uproszczone. Bez rejestracji, RODO-safe — żadne dane nie trafiają na
            serwer.
          </p>

          <WezwanieGeneratorClient generatorId="wezwanie" />

          <section className="mt-16 prose prose-sm max-w-none text-base-content/80 ">
            <p>
              Wezwanie do zapłaty to pierwszy krok w odzyskiwaniu należności od nierzetelnych
              kontrahentów. Właściwie sporządzone pismo stanowi dowód w postępowaniu sądowym i
              często skutecznie mobilizuje dłużnika do uregulowania zobowiązania bez kosztownej
              drogi sądowej.
            </p>
            <p>
              Generator Pismak tworzy dokument w pełni w Twojej przeglądarce — żadne dane nie
              trafiają na nasze serwery. Możesz go pobrać jako PDF lub wydrukować bezpośrednio.
            </p>
          </section>

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
