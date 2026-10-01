'use client'

import ProjectItem from './project'
import { Project } from '@/lib/type'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const arrowClassName =
  'flex size-10 items-center justify-center rounded-full border border-black/10 text-black transition-all duration-300 hover:bg-neutral-100 active:scale-95 disabled:pointer-events-none disabled:opacity-30'

// Horizontal carousel on mobile, grid from `md` up
const ProjectList = ({ projects }: { projects: Project[] }) => {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows])

  const scrollByItem = (direction: 1 | -1) => {
    const track = trackRef.current
    const item = track?.firstElementChild as HTMLElement | null
    if (!track || !item) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({
      left: direction * (item.offsetWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <div className="mt-8">
      <ul
        ref={trackRef}
        onScroll={updateArrows}
        className={cn(
          '-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'md:mx-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-12 md:overflow-visible md:px-0 lg:grid-cols-3',
        )}
      >
        {projects.map((project) => (
          <li
            key={project.url}
            className="w-[85%] shrink-0 snap-start md:w-auto"
          >
            <ProjectItem {...project} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end gap-3 md:hidden">
        <button
          type="button"
          aria-label="Previous project"
          className={arrowClassName}
          disabled={!canPrev}
          onClick={() => scrollByItem(-1)}
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          className={arrowClassName}
          disabled={!canNext}
          onClick={() => scrollByItem(1)}
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default ProjectList
