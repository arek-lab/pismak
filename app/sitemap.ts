import { MetadataRoute } from 'next'
import { GENERATORS } from '@/lib/generators.config'

const BASE_URL = 'https://pismak.pl'

export default function sitemap(): MetadataRoute.Sitemap {
  const generatorUrls = GENERATORS.filter((g) => g.status === 'active').map((g) => ({
    url: `${BASE_URL}/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...generatorUrls,
  ]
}
