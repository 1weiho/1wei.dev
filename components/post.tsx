import { Post } from '@/lib/type'
import { Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'

const PostItem = ({ slug, title, description, date, tags }: Post) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block border border-gray-500 bg-[#e0e0e0] px-6 py-4 shadow-[inset_-1px_-1px_0_0_#000,inset_1px_1px_0_0_#fff] hover:bg-[#d4d0c8]"
    >
      <h3 className="font-bold text-[#000080]">{title}</h3>
      <p className="text-sm text-black">{description}</p>

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
          <p className="text-xs text-black">{date}</p>
          <div className="flex space-x-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="flex items-center border border-gray-500 bg-[#c0c0c0] px-1.5 py-0.5 text-xs text-black"
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
