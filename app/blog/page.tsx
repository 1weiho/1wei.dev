import { posts } from './posts'
import Post from '@/components/post'
import { generateOgImageUrl } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Yiwei Ho',
  description: 'Blog posts by Yiwei Ho.',
  openGraph: {
    title: 'Blog | Yiwei Ho',
    description: 'Blog posts by Yiwei Ho.',
    images: [{ url: generateOgImageUrl('Blog'), alt: '1wei.dev' }],
  },
}

const Blog = () => {
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<string, typeof posts>,
  )

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="mt-20 md:mt-32 pb-20">
      <h1 className="text-2xl text-black">Blog</h1>
      <h2 className="mt-1 text-gray-500 text-sm">
        Try to develop the habit of writing articles.
      </h2>

      <div className="mt-12 space-y-12">
        {years.map((year) => (
          <div key={year}>
            <h3 className="text-4xl font-[family-name:var(--font-instrument-serif)]">
              {year}
            </h3>
            <ul className="divide-y divide-black/10">
              {postsByYear[year]
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((post) => (
                  <Post key={post.slug} {...post} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
