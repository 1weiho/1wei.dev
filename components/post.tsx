import { Post } from '@/lib/type'
import Link from 'next/link'

const PostItem = ({ slug, title, date }: Post) => {
  return (
    <li className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <Link
            href={`/blog/${slug}`}
            className="text-black font-medium hover:underline"
          >
            {title}
          </Link>
        </div>

        <div className="flex items-center shrink-0">
          <p className="text-xs">{date}</p>
        </div>
      </div>
    </li>
  )
}

export default PostItem
