import { Talk } from '@/lib/type'
import { parseUrl } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const TalkItem = ({ title, slidesUrl, videoUrl, date }: Talk) => {
  const links = [
    { label: 'Slides', url: slidesUrl },
    { label: 'Video', url: videoUrl },
  ]

  return (
    <li className="group py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h4 className="text-black font-medium">{title}</h4>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                title={parseUrl(link.url)}
                className="group/link flex items-center gap-0.5 text-xs transition-colors duration-300 hover:text-black"
              >
                {link.label}
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            ))}
          </div>
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

export default TalkItem
