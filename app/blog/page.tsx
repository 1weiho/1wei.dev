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
  return (
    <div className="mt-20 md:mt-32 pb-20">
      <h1 className="text-2xl text-black">Blog</h1>
      <h2 className="mt-1 text-gray-500 text-sm">
        Try to develop the habit of writing articles.
      </h2>

      <ul className="mt-8 divide-y divide-black/10">
        {posts.map((post) => (
          <Post key={post.slug} {...post} />
        ))}
      </ul>
    </div>
  )
}

export default Blog
