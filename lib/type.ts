export interface Project {
  title: string
  description: string
  url: string
  image: string
}

export interface Post {
  slug: string
  title: string
  date: string
}

export interface Talk {
  title: string
  slidesUrl: string
  videoUrl: string
  date: string
}
