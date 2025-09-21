import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { unstable_ViewTransition as ViewTransition } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="prose mx-auto my-20 md:my-28">{children}</article>
    ),
    ...components,
  }
}
