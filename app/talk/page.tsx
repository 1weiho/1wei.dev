import { talks } from './talks'
import Talk from '@/components/talk'
import { generateOgImageUrl } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talk | Yiwei Ho',
  description: 'Talks given by Yiwei Ho.',
  openGraph: {
    title: 'Talk | Yiwei Ho',
    description: 'Talks given by Yiwei Ho.',
    images: [{ url: generateOgImageUrl('Talk'), alt: '1wei.dev' }],
  },
}

const TalkPage = () => {
  const talksByYear = talks.reduce(
    (acc, talk) => {
      const year = new Date(talk.date).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(talk)
      return acc
    },
    {} as Record<string, typeof talks>,
  )

  const years = Object.keys(talksByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="mt-20 md:mt-32 pb-20">
      <h1 className="text-2xl text-black">Talk</h1>
      <h2 className="mt-1 text-gray-500 text-sm">
        Sharing what I have learned on stage.
      </h2>

      <div className="mt-12 space-y-12">
        {years.map((year) => (
          <div key={year}>
            <h3 className="text-4xl text-black/30 font-[family-name:var(--font-instrument-serif)]">
              {year}
            </h3>
            <ul className="divide-y divide-black/10">
              {talksByYear[year]
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((talk) => (
                  <Talk key={talk.title} {...talk} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TalkPage
