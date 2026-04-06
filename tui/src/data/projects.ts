export interface Project {
  title: string
  description: string
  url: string
  category: string
}

export const projects: Project[] = [
  {
    title: "SVGL Raycast Extension",
    description: "The Raycast extension to search SVG logos via svgl.",
    url: "https://www.raycast.com/1weiho/svgl",
    category: "Raycast Extension",
  },
  {
    title: "Next Lens",
    description:
      "A CLI tool for Next.js App Router to scan and list API and Page routes.",
    url: "https://next-lens.1wei.dev/",
    category: "NPM Package",
  },
  {
    title: "Open Graph Raycast Extension",
    description: "Preview Open Graph meta tags of a website.",
    url: "https://www.raycast.com/1weiho/open-graph",
    category: "Raycast Extension",
  },
  {
    title: "Next Sandbox",
    description:
      "A lightweight tool for testing and monitoring server actions in Next.js.",
    url: "https://next-sandbox.1wei.dev/",
    category: "NPM Package",
  },
  {
    title: "Findrink",
    description: "A menu search platform for bubble tea brands in Taiwan.",
    url: "https://findrink.tw/",
    category: "Website",
  },
]
