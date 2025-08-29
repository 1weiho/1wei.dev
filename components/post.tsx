import { Post } from '@/lib/type'
import { Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'

const PostItem = ({ slug, title, description, date, tags }: Post) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block rounded-2xl border-2 border-pink-500 bg-black/40 px-6 py-4 duration-150 hover:bg-pink-950/40"
    >
      <h3 className="font-semibold text-pink-500 drop-shadow-[0_0_0.5rem_#ff00ff]">
        {title}
      </h3>
      <p className="text-sm text-fuchsia-200">{description}</p>

      <div className="flex justify-between items-center mt-3">
        <ViewTransition name="avatar">
          <Image
            src="/assets/avatar.jpeg"
            alt="Avatar"
            width={180}
            height={180}
            className="rounded-full size-6"
          />
        </ViewTransition>

        <div className="flex items-center space-x-4">
          <p className="text-xs text-fuchsia-200">{date}</p>
          <div className="flex space-x-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="flex items-center rounded-lg bg-pink-700 px-1.5 py-0.5 text-xs text-fuchsia-200"
              >
                <Tag className="mr-1 h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostItem
