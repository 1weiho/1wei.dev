import ProjectItem from './project'
import { Project } from '@/lib/type'

const projects: Project[] = [
  {
    title: 'SVGL',
    description: 'The Raycast extension to search SVG logos via svgl.',
    url: 'https://www.raycast.com/1weiho/svgl',
    category: 'raycast-extension',
  },
  {
    title: 'Next Sandbox',
    description:
      'A lightweight tool for testing and monitoring server actions in Next.js.',
    url: 'https://next-sandbox.1wei.dev/',
    category: 'npm-package',
  },
]

const Projects = () => {
  return (
    <div className="md:mt-40 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Featured Projects
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
