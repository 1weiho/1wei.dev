'use client'

import { cn } from '@/lib/utils'
import { animated, to, useSpring, useSprings } from '@react-spring/web'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

type NavLink = {
  path: string
  title: string
  external?: boolean
}

const links: NavLink[] = [
  { path: '/', title: 'Home' },
  { path: '/blog', title: 'Blog' },
  { path: '/talk', title: 'Talk' },
  { path: '/photo', title: 'Photo' },
  { path: 'https://links.1wei.dev', title: 'Links', external: true },
]

const internalLinks = links.filter((link) => !link.external)

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#%&*+=/<>'

// The edge travelling towards the target leads, the other one trails behind,
// so the pill stretches mid-flight and snaps back once it lands
const LEAD = { tension: 520, friction: 40 }
const TRAIL = { tension: 190, friction: 26 }

type Edges = { l: number; r: number }

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

// Decodes a label left-to-right through random glyphs, like a split-flap
// board settling. The nav is set in a mono font, so widths never jump.
const useScramble = (disabled: boolean) => {
  const [labels, setLabels] = useState<Record<string, string>>({})
  const timers = useRef<Record<string, number>>({})

  const scramble = useCallback(
    (key: string, text: string) => {
      if (disabled) return
      window.clearInterval(timers.current[key])

      let frame = 0
      const totalFrames = text.length * 2 + 3
      timers.current[key] = window.setInterval(() => {
        frame++
        const revealed = Math.floor((frame / totalFrames) * text.length)
        const next = text
          .split('')
          .map((char, i) =>
            i < revealed
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join('')

        if (frame >= totalFrames) {
          window.clearInterval(timers.current[key])
          setLabels((prev) => {
            const next = { ...prev }
            delete next[key]
            return next
          })
          return
        }
        setLabels((prev) => ({ ...prev, [key]: next }))
      }, 32)
    },
    [disabled],
  )

  useEffect(() => {
    const active = timers.current
    return () => Object.values(active).forEach(window.clearInterval)
  }, [])

  return { labels, scramble }
}

const Navbar = () => {
  const router = useRouter()
  const currentPathname = `/${usePathname().split('/')[1]}`
  const reducedMotion = usePrefersReducedMotion()
  const { labels, scramble } = useScramble(reducedMotion)

  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const inkEdges = useRef<Edges | null>(null)
  const ghostEdges = useRef<Edges | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const activeIndex = links.findIndex(
    (link) => !link.external && link.path === currentPathname,
  )

  // Solid ink pill marking the current page
  const [ink, inkApi] = useSpring(() => ({ l: 0, r: 0, opacity: 0 }))
  // Soft ghost pill following the pointer / focus
  const [ghost, ghostApi] = useSpring(() => ({ l: 0, r: 0, opacity: 0 }))
  // Per-item magnetic offset + press scale, shared by both text layers
  const [items, itemsApi] = useSprings(links.length, () => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 18 },
  }))

  const measure = useCallback((index: number): Edges | null => {
    const el = itemRefs.current[index]
    if (!el) return null
    return { l: el.offsetLeft, r: el.offsetLeft + el.offsetWidth }
  }, [])

  const placeInk = useCallback(
    (animate: boolean) => {
      const next = activeIndex === -1 ? null : measure(activeIndex)
      if (!next) {
        inkApi.start({ opacity: 0 })
        inkEdges.current = null
        return
      }

      const prev = inkEdges.current
      const goingRight = prev ? next.l > prev.l : true
      inkApi.start({
        ...next,
        opacity: 1,
        immediate: !animate || !prev || reducedMotion,
        config: (key) =>
          key === 'opacity'
            ? TRAIL
            : key === (goingRight ? 'r' : 'l')
              ? LEAD
              : TRAIL,
      })
      inkEdges.current = next
    },
    [activeIndex, inkApi, measure, reducedMotion],
  )

  useEffect(() => {
    placeInk(true)
  }, [placeInk])

  useEffect(() => {
    const remeasure = () => placeInk(false)
    window.addEventListener('resize', remeasure)
    // Re-measure once web fonts finish loading, since widths shift
    document.fonts?.ready.then(remeasure)
    return () => window.removeEventListener('resize', remeasure)
  }, [placeInk])

  useEffect(() => {
    if (hovered === null) {
      ghostApi.start({ opacity: 0 })
      ghostEdges.current = null
      return
    }
    const next = measure(hovered)
    if (!next) return

    const prev = ghostEdges.current
    const goingRight = prev ? next.l > prev.l : true
    ghostApi.start({
      ...next,
      opacity: 1,
      // Coming from nowhere: appear in place instead of sliding in
      immediate: (key) => key !== 'opacity' && (!prev || reducedMotion),
      config: (key) =>
        key === 'opacity'
          ? TRAIL
          : key === (goingRight ? 'r' : 'l')
            ? LEAD
            : TRAIL,
    })
    ghostEdges.current = next
  }, [hovered, ghostApi, measure, reducedMotion])

  // Float the nav as a frosted pill once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Number keys jump between pages
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return
      const target = event.target as HTMLElement | null
      if (
        target?.isContentEditable ||
        target?.closest('input, textarea, select')
      )
        return

      const link = internalLinks[Number(event.key) - 1]
      if (!link) return
      event.preventDefault()
      router.push(link.path)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  const enter = (index: number) => {
    setHovered(index)
    scramble(links[index].path, links[index].title)
  }

  const pull = (index: number, event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    itemsApi.start((i) =>
      i === index ? { x: dx * 0.18, y: dy * 0.3 } : undefined,
    )
  }

  const release = (index: number) =>
    itemsApi.start((i) => (i === index ? { x: 0, y: 0, scale: 1 } : undefined))

  const press = (index: number, down: boolean) =>
    itemsApi.start((i) =>
      i === index ? { scale: down && !reducedMotion ? 0.92 : 1 } : undefined,
    )

  const renderLabel = (link: NavLink, index: number) => {
    const internalIndex = internalLinks.indexOf(link)
    return (
      <animated.span
        className="flex items-center gap-1"
        style={{
          transform: to(
            [items[index].x, items[index].y, items[index].scale],
            (x, y, s) => `translate3d(${x}px, ${y}px, 0) scale(${s})`,
          ),
        }}
      >
        <span>{labels[link.path] ?? link.title}</span>
        {link.external ? (
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-4" />
        ) : (
          <span className="relative -top-1.5 hidden text-[0.6rem] tabular-nums opacity-40 md:inline">
            {internalIndex + 1}
          </span>
        )}
      </animated.span>
    )
  }

  const layoutClassName =
    'flex items-center gap-0.5 rounded-full p-1 font-mono text-sm md:gap-1 md:text-base'
  const itemClassName = 'relative flex rounded-full px-2.5 py-1.5 md:px-3'

  return (
    <div className="sticky top-3 z-30 mt-12 -ml-3.5 w-fit md:top-4 md:-ml-4">
      <nav
        ref={navRef}
        aria-label="Main"
        data-scrolled={scrolled}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          layoutClassName,
          'relative transition-[background-color,box-shadow] duration-500',
          'data-[scrolled=true]:bg-white/80 data-[scrolled=true]:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_10px_30px_-12px_rgb(0_0_0/0.3)] data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150',
        )}
      >
        {/* Hover ghost */}
        <animated.span
          aria-hidden
          className="pointer-events-none absolute inset-y-1 rounded-full bg-black/[0.06]"
          style={{
            left: ghost.l,
            width: to([ghost.l, ghost.r], (l, r) => r - l),
            opacity: ghost.opacity,
          }}
        />

        {links.map((link, index) => (
          <Link
            key={link.path}
            href={link.path}
            target={link.external ? '_blank' : undefined}
            aria-current={index === activeIndex ? 'page' : undefined}
            aria-keyshortcuts={
              link.external
                ? undefined
                : String(internalLinks.indexOf(link) + 1)
            }
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            onMouseEnter={() => enter(index)}
            onFocus={() => enter(index)}
            onBlur={() => setHovered(null)}
            onPointerMove={(event) => pull(index, event)}
            onPointerLeave={() => release(index)}
            onPointerDown={() => press(index, true)}
            onPointerUp={() => press(index, false)}
            className={cn(
              itemClassName,
              'group transition-colors duration-300 hover:text-black',
            )}
          >
            {renderLabel(link, index)}
          </Link>
        ))}

        {/* Ink pill for the current page */}
        <animated.span
          aria-hidden
          className="pointer-events-none absolute inset-y-1 rounded-full bg-neutral-900 shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_4px_12px_-4px_rgb(0_0_0/0.5)]"
          style={{
            left: ink.l,
            width: to([ink.l, ink.r], (l, r) => r - l),
            opacity: ink.opacity,
          }}
        />

        {/* Inverted copy of the labels, clipped to the ink pill, so text
            flips to white exactly where the pill passes over it */}
        <animated.div
          aria-hidden
          className={cn(
            layoutClassName,
            'pointer-events-none absolute inset-0 text-white select-none',
          )}
          style={{
            opacity: ink.opacity,
            clipPath: to(
              [ink.l, ink.r],
              (l, r) =>
                `inset(4px calc(100% - ${r}px) 4px ${l}px round 9999px)`,
            ),
          }}
        >
          {links.map((link, index) => (
            <span key={link.path} className={cn(itemClassName, 'group')}>
              {renderLabel(link, index)}
            </span>
          ))}
        </animated.div>
      </nav>
    </div>
  )
}

export default Navbar
