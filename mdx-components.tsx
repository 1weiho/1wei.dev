import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { unstable_ViewTransition as ViewTransition } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="prose mx-auto my-20 md:my-28 prose-headings:font-[family-name:var(--font-instrument-serif)] prose-headings:text-4xl prose-headings:font-normal prose-p:my-6 md:prose-p:my-8">
        {children}
      </article>
    ),
    a: (props) => <a target="_blank" rel="noopener noreferrer" {...props} />,
    ...components,
  }
}
