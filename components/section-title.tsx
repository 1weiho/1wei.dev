'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

// A heading counts as read once it slides under the floating header
// (`top-4` + `h-9`)
const HEADER_BOTTOM = 52

type Section = {
  index: number
  title: string
  // Scrolling down rolls the new title up from below, and vice versa
  down: boolean
  visible: boolean
}

// Shows the heading of the section being read in the blurred top bar
const SectionTitle = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [section, setSection] = useState<Section | null>(null)

  useEffect(() => {
    const article = ref.current?.closest('article')
    if (!article) return
    const headings = [...article.querySelectorAll<HTMLElement>('h1, h2, h3')]

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const index = headings.findLastIndex(
          (heading) => heading.getBoundingClientRect().top <= HEADER_BOTTOM,
        )
        setSection((prev) => {
          if (index === -1) return prev && { ...prev, visible: false }
          if (prev?.index === index && prev.visible) return prev
          return {
            index,
            title: headings[index].textContent ?? '',
            down: !prev || index >= prev.index,
            visible: true,
          }
        })
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const visible = !!section?.visible

  return (
    <div
      ref={ref}
      inert={!visible}
      className="not-prose pointer-events-none fixed inset-x-0 top-4 z-30"
    >
      {/* Leave room for the Menu button on the right */}
      <div className="container mx-auto flex px-6 pr-28 md:pr-32">
        {section && (
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0 })}
            className={cn(
              'flex h-9 min-w-0 items-center transition-[opacity,filter] duration-500',
              visible ? 'pointer-events-auto' : 'opacity-0 blur-sm',
            )}
          >
            <span
              key={section.index}
              className={cn(
                'truncate text-xl leading-9 text-black font-[family-name:var(--font-instrument-serif)] animate-in fade-in duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:animate-none md:text-2xl md:leading-9',
                section.down ? 'slide-in-from-bottom-3' : 'slide-in-from-top-3',
              )}
            >
              {section.title}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default SectionTitle
