import ProjectItem from './project'
import { Project } from '@/lib/type'

const projects: Project[] = [
  // {
  //   title: 'GH Link',
  //   description: 'A Link in Bio website configured with only a JSON file.',
  //   url: 'https://gh-link.vercel.app/',
  //   category: 'next-js',
  // },
  {
    title: 'SVGL',
    description: 'The Raycast extension to search SVG logos via svgl.',
    url: 'https://www.raycast.com/1weiho/svgl',
    category: 'raycast-extension',
  },
  // {
  //   title: 'Open Graph',
  //   description: 'Preview Open Graph meta tags of a website.',
  //   url: 'https://www.raycast.com/1weiho/open-graph',
  //   category: 'raycast-extension',
  // },
  {
    title: 'Next Sandbox',
    description:
      'A lightweight tool for testing and monitoring server actions in Next.js.',
    url: 'https://next-sandbox.1wei.dev/',
    category: 'npm-package',
  },
  // {
  //   title: 'rwdot',
  //   description: 'Shows your window’s Tailwind size for easier RWD.',
  //   url: 'https://www.npmjs.com/package/rwdot',
  //   category: 'npm-package',
  // },
]

const Projects = () => {
  return (
    <div className="mt-20 md:mt-40">
      <h2 className="mt-16 text-4xl md:text-5xl text-pink-500 drop-shadow-[0_0_0.75rem_#ff00ff]">
        Projects
      </h2>

      <div className="mt-8 space-y-8 md:space-y-12">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
