export interface Project {
  title: string
  description: string
  url: string
  category: 'raycast-extension' | 'next-js' | 'npm-package'
}

export interface Post {
  slug: string
  title: string
  date: string
}
