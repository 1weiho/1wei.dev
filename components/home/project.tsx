import { Project } from '@/lib/type'
import Link from 'next/link'

const ProjectItem = ({ title, description, url, preview }: Project) => {
  return (
    <Link className="group block" href={url} target="_blank">
      <div className="rounded-2xl bg-neutral-100 p-3 transition-colors duration-300 group-hover:bg-neutral-200/70 md:p-4">
        {preview}
      </div>

      <h3 className="mt-4 text-black underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-black/30">
        {title}
      </h3>
      <p className="mt-1.5 text-xs md:text-sm">{description}</p>
    </Link>
  )
}

export default ProjectItem
