import { highlightToHtml } from './lib/shiki'
import { parseUrl } from './lib/utils'
import CopyButton from '@/components/ui/copy-button'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="prose mx-auto my-20 md:my-28 tracking-tight prose-headings:font-[family-name:var(--font-instrument-serif)] prose-headings:text-4xl prose-headings:font-normal prose-p:my-6 prose-p:leading-7 prose-p:text-pretty md:prose-p:my-8 md:prose-p:leading-8">
        {children}
      </article>
    ),
    // Shiki-highlight for fenced code blocks
    pre: async (props) => {
      const child = props.children as React.ReactElement<{
        className?: string
        children?: string
      }>
      const maybeCode = child?.props ? child : null
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
    a: (props) => {
      const href = props.href
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        const domain = parseUrl(href, true)
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            {...props}
            className="inline-flex items-baseline gap-1"
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
              alt={`Favicon of ${domain}`}
              width={16}
              height={16}
              className="inline-block align-baseline flex-shrink-0 rounded-sm"
              style={{
                marginTop: 0,
                marginBottom: 0,
                transform: 'translateY(2px)',
              }}
            />
            {props.children}
          </a>
        )
      }
      return <a target="_blank" rel="noopener noreferrer" {...props} />
    },
    ...components,
  }
}
