import { Project } from '@/lib/type'
import Image from 'next/image'
import Link from 'next/link'

const ProjectItem = ({ title, description, url, image }: Project) => {
  return (
    <Link className="group block" href={url} target="_blank">
      <div className="rounded-2xl bg-neutral-100 p-3 transition-colors duration-300 group-hover:bg-neutral-200/70 md:p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <h3 className="mt-4 text-black underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-black/30">
        {title}
      </h3>
      <p className="mt-1.5 text-xs md:text-sm">{description}</p>
    </Link>
  )
}

export default ProjectItem
