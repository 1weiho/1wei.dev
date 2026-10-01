import ProjectList from './project-list'
import { Project } from '@/lib/type'

const projects: Project[] = [
  // {
  //   title: 'GH Link',
  //   description: 'A Link in Bio website configured with only a JSON file.',
  //   url: 'https://gh-link.vercel.app/',
  //   category: 'next-js',
  // },
  {
    title: 'open-slide',
    description: 'A slide framework built for agents.',
    url: 'https://open-slide.dev/',
    image: '/assets/projects/open-slide.webp',
  },
  {
    title: 'SVGL Raycast Extension',
    description: 'The Raycast extension to search SVG logos via svgl.',
    url: 'https://www.raycast.com/1weiho/svgl',
    image: '/assets/projects/svgl-raycast.webp',
  },
  {
    title: 'Next Lens',
    description:
      'A CLI tool for Next.js App Router to scan and list API and Page routes.',
    url: 'https://next-lens.1wei.dev/',
    image: '/assets/projects/next-lens.webp',
  },
  {
    title: 'Open Graph Raycast Extension',
    description: 'Preview Open Graph meta tags of a website.',
    url: 'https://www.raycast.com/1weiho/open-graph',
    image: '/assets/projects/open-graph-raycast.webp',
  },
  {
    title: 'Next Sandbox',
    description:
      'A lightweight tool for testing and monitoring server actions in Next.js.',
    url: 'https://next-sandbox.1wei.dev/',
    image: '/assets/projects/next-sandbox.webp',
  },
  {
    title: 'Findrink',
    description: 'A menu search platform for bubble tea brands in Taiwan.',
    url: 'https://findrink.tw/',
    image: '/assets/projects/findrink.webp',
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
    <div className="md:mt-40 mt-20">
      <h2 className="mt-16 text-3xl md:text-4xl text-black font-[family-name:var(--font-instrument-serif)]">
        Projects
      </h2>

      <ProjectList projects={projects} />
    </div>
  )
}

export default Projects
