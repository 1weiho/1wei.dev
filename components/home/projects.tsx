import ProjectItem from './project'
import ProjectList from './project-list'
import FindrinkMock from './project-mocks/findrink'
import NextLensMock from './project-mocks/next-lens'
import NextSandboxMock from './project-mocks/next-sandbox'
import OpenGraphMock from './project-mocks/open-graph'
import OpenSlideMock from './project-mocks/open-slide'
import SvglMock from './project-mocks/svgl'
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
    preview: <OpenSlideMock />,
  },
  {
    title: 'SVGL Raycast Extension',
    description: 'The Raycast extension to search SVG logos via svgl.',
    url: 'https://www.raycast.com/1weiho/svgl',
    preview: <SvglMock />,
  },
  {
    title: 'Next Lens',
    description:
      'A CLI tool for Next.js App Router to scan and list API and Page routes.',
    url: 'https://next-lens.1wei.dev/',
    preview: <NextLensMock />,
  },
  {
    title: 'Open Graph Raycast Extension',
    description: 'Preview Open Graph meta tags of a website.',
    url: 'https://www.raycast.com/1weiho/open-graph',
    preview: <OpenGraphMock />,
  },
  {
    title: 'Next Sandbox',
    description:
      'A lightweight tool for testing and monitoring server actions in Next.js.',
    url: 'https://next-sandbox.1wei.dev/',
    preview: <NextSandboxMock />,
  },
  {
    title: 'Findrink',
    description: 'A menu search platform for bubble tea brands in Taiwan.',
    url: 'https://findrink.tw/',
    preview: <FindrinkMock />,
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

      <ProjectList>
        {projects.map((project) => (
          <li
            key={project.url}
            className="w-[85%] shrink-0 snap-start md:w-auto"
          >
            <ProjectItem {...project} />
          </li>
        ))}
      </ProjectList>
    </div>
  )
}

export default Projects
