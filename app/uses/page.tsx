import { Metadata } from 'next'
import { generateOgImageUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Uses | Yiwei Ho',
  description: 'Tools, software and languages I use.',
  openGraph: {
    title: 'Uses | Yiwei Ho',
    description: 'Tools, software and languages I use.',
    images: [{ url: generateOgImageUrl('Uses'), alt: '1wei.dev' }],
  },
}

const categories = [
  {
    title: 'Languages',
    items: ['TypeScript', 'PHP', 'Go'],
  },
  {
    title: 'Frameworks',
    items: ['Next.js', 'React', 'Laravel'],
  },
  {
    title: 'Tools',
    items: ['VS Code', 'Git', 'Vercel'],
  },
  {
    title: 'Other Software',
    items: ['Raycast', 'Figma'],
  },
]

const UsesPage = () => {
  return (
    <div className="mt-20 md:mt-32 pb-20">
      <h1 className="text-2xl text-black">Uses</h1>
      <h2 className="mt-1 text-gray-500 text-sm">
        Tools, software and languages I use.
      </h2>

      <div className="mt-12 space-y-8">
        {categories.map((category) => (
          <div key={category.title}>
            <h3 className="text-black">{category.title}</h3>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsesPage
