'use client'

import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const links = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/blog',
    title: 'Blog',
  },
  {
    path: '/talk',
    title: 'Talk',
  },
  {
    path: '/photo',
    title: 'Photo',
  },
]

const Navbar = () => {
  const currentPathname = `/${usePathname().split('/')[1]}`

  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [ghost, setGhost] = useState<{ left: number; width: number } | null>(
    null,
  )
  const [ready, setReady] = useState(false)

  const activeKey = links.some((link) => link.path === currentPathname)
    ? currentPathname
    : null
  const targetKey = hoveredKey ?? activeKey

  const moveGhost = useCallback(() => {
    const nav = navRef.current
    const target = targetKey ? itemRefs.current[targetKey] : null
    if (!nav || !target) {
      setGhost(null)
      return
    }
    const navRect = nav.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setGhost({ left: targetRect.left - navRect.left, width: targetRect.width })
  }, [targetKey])

  useEffect(() => {
    moveGhost()
    // Enable transitions only after the first placement has painted,
    // so the highlight doesn't slide in from the left edge on load
    const raf = requestAnimationFrame(() => setReady(true))

    window.addEventListener('resize', moveGhost)
    // Re-measure once web fonts finish loading, since widths shift
    document.fonts?.ready.then(moveGhost)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', moveGhost)
    }
  }, [moveGhost])

  return (
    <nav
      ref={navRef}
      className="relative mt-12 -ml-3 flex items-center gap-1 md:gap-3"
      onMouseLeave={() => setHoveredKey(null)}
    >
      {/* Sliding ghost highlight */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-y-0 rounded-full bg-black/[0.05] motion-reduce:transition-none',
          ready &&
            'transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          ghost ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          left: ghost?.left ?? 0,
          width: ghost?.width ?? 0,
          margin: 0,
        }}
      />

      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          ref={(el) => {
            itemRefs.current[link.path] = el
          }}
          onMouseEnter={() => setHoveredKey(link.path)}
          onFocus={() => setHoveredKey(link.path)}
          onBlur={() => setHoveredKey(null)}
          className={cn(
            'relative rounded-full px-3 py-1.5 transition-colors duration-300 hover:text-black',
            link.path === currentPathname && 'text-black',
          )}
        >
          {link.title}
        </Link>
      ))}
      <Link
        href="https://links.1wei.dev"
        target="_blank"
        ref={(el) => {
          itemRefs.current['links'] = el
        }}
        onMouseEnter={() => setHoveredKey('links')}
        onFocus={() => setHoveredKey('links')}
        onBlur={() => setHoveredKey(null)}
        className="group relative flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors duration-300 hover:text-black"
      >
        Links
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </nav>
  )
}

export default Navbar
