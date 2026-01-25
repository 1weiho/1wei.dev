import Next from '@/components/svg/next'
import NPM from '@/components/svg/npm'
import Raycast from '@/components/svg/raycast'
import { Project } from '@/lib/type'
import Link from 'next/link'

const iconClassName =
  'grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100'

const ProjectItem = ({
  title,
  description,
  url,
  category,
  icon: Icon,
}: Project) => {
  const renderIcon = () => {
    if (Icon) return <Icon className={iconClassName} />
    if (category === 'raycast-extension')
      return <Raycast className={iconClassName} />
    if (category === 'next-js') return <Next className={iconClassName} />
    return <NPM className={iconClassName} />
  }

  return (
    <Link className="group block" href={url} target="_blank">
      <div className="flex gap-2 items-center">
        <h3 className="text-black">{title}</h3>
        {renderIcon()}
      </div>
      <p className="mt-2 text-xs md:text-sm">{description}</p>
    </Link>
  )
}

export default ProjectItem
