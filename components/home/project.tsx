import Next from '@/components/svg/next'
import NPM from '@/components/svg/npm'
import Raycast from '@/components/svg/raycast'
import { Project } from '@/lib/type'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const ProjectItem = ({ title, description, url, category }: Project) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="group block p-6 bg-card rounded-lg border hover:bg-secondary transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            {category === 'raycast-extension' ? (
              <Raycast className="h-5 w-5 text-muted-foreground" />
            ) : category === 'next-js' ? (
              <Next className="h-5 w-5 text-muted-foreground" />
            ) : (
              <NPM className="h-5 w-5 text-muted-foreground" />
            )}
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transform transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default ProjectItem
