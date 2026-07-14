import { Post } from '@/lib/type'
import Link from 'next/link'

const PostItem = ({ slug, title, date }: Post) => {
  return (
    <li className="group py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <Link
            href={`/blog/${slug}`}
            className="text-black font-medium underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-black/40"
          >
            {title}
          </Link>
        </div>

        <div className="flex items-center shrink-0">
          <p className="text-xs tabular-nums text-black/40 transition-colors duration-300 group-hover:text-black/60">
            {date}
          </p>
        </div>
      </div>
    </li>
  )
}

export default PostItem
