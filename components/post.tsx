import { Post } from '@/lib/type'
import { Tag } from 'lucide-react'
import Link from 'next/link'

const PostItem = ({ slug, title, description, date, tags }: Post) => {
  return (
    <li className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <Link
            href={`/blog/${slug}`}
            className="text-black font-semibold hover:underline"
          >
            {title}
          </Link>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <p className="text-xs">{date}</p>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-amber-100 px-1.5 py-0.5 rounded-lg inline-flex items-center"
              >
                <Tag className="h-2.5 w-2.5 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

export default PostItem
