import Next from '@/components/svg/next'
import NPM from '@/components/svg/npm'
import Raycast from '@/components/svg/raycast'
import { Project } from '@/lib/type'
import Link from 'next/link'

const ProjectItem = ({ title, description, url, category }: Project) => {
  return (
    <Link className="group block" href={url} target="_blank">
      <div className="flex items-center gap-2">
        <h3 className="text-emerald-400 drop-shadow-[0_0_0.5rem_#39ff14]">
          {title}
        </h3>
        {category === 'raycast-extension' ? (
          <Raycast className="grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100" />
        ) : category === 'next-js' ? (
          <Next className="grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100" />
        ) : (
          <NPM className="grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100" />
        )}
      </div>
      <p className="mt-2 text-xs md:text-sm text-fuchsia-200">{description}</p>
    </Link>
  )
}

export default ProjectItem
