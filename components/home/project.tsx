import Next from '@/components/svg/next'
import NPM from '@/components/svg/npm'
import Raycast from '@/components/svg/raycast'
import { Project } from '@/lib/type'
import Link from 'next/link'

const ProjectItem = ({ title, description, url, category }: Project) => {
  return (
    <Link className="group block text-blue-700 hover:underline" href={url} target="_blank">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-[#000080]">{title}</h3>
        {category === 'raycast-extension' ? (
          <Raycast className="opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : category === 'next-js' ? (
          <Next className="opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <NPM className="opacity-60 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <p className="mt-2 text-xs md:text-sm text-black">{description}</p>
    </Link>
  )
}

export default ProjectItem
