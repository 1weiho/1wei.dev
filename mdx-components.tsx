import { highlightToHtml } from './lib/shiki'
import CopyButton from '@/components/ui/copy-button'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="prose mx-auto my-20 md:my-28 prose-headings:font-[family-name:var(--font-instrument-serif)] prose-headings:text-4xl prose-headings:font-normal prose-p:my-6 md:prose-p:my-8">
        {children}
      </article>
    ),
    // Shiki-highlight for fenced code blocks
    pre: async (props) => {
      const child = (props as any)?.children as any
      const maybeCode = child && child.props ? child : null
      const className: string | undefined = maybeCode?.props?.className
      const rawCode: string = String(maybeCode?.props?.children ?? '')
      // Remove trailing newlines to avoid rendering an extra blank line at the end
      const trimmedCode = rawCode.replace(/\n+$/, '')
      const match = className?.match(/language-([\w-]+)/)
      const lang = match?.[1]

      // Highlight only for fenced code blocks with a language
      if (lang && trimmedCode) {
        const html = await highlightToHtml({ code: trimmedCode, lang })
        return (
          <div className="not-prose relative group">
            <CopyButton
              content={trimmedCode}
              className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )
      }
      // Fallback to default rendering
      return <pre {...props} />
    },
    a: (props) => <a target="_blank" rel="noopener noreferrer" {...props} />,
    ...components,
  }
}
