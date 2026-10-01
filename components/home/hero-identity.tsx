'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
  ViewTransition,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

// Distance from the viewport top where the avatar docks (matches `pt-4`)
const DOCK_TOP = 16
const DURATION = 500
const EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'

// Stacked backdrop blurs, each masked to fade out sooner the stronger it is,
// so the content blurs progressively as it scrolls up under the header
const blurLayers = [
  { blur: 0.5, end: 100 },
  { blur: 1, end: 85 },
  { blur: 2, end: 70 },
  { blur: 4, end: 55 },
  { blur: 8, end: 40 },
]

// FLIP: play `to` from where `from` currently is on screen, so the two
// elements read as one element morphing between positions
const morph = (from: HTMLElement, to: HTMLElement) => {
  const fromRect = from.getBoundingClientRect()
  from.getAnimations().forEach((animation) => animation.cancel())
  to.getAnimations().forEach((animation) => animation.cancel())

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const toRect = to.getBoundingClientRect()
  if (!toRect.width) return

  const dx = fromRect.left - toRect.left
  const dy = fromRect.top - toRect.top
  const scale = fromRect.width / toRect.width

  to.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
      { transform: 'none' },
    ],
    { duration: DURATION, easing: EASING },
  )
}

const HeroIdentity = () => {
  const rowRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const dockAvatarRef = useRef<HTMLDivElement>(null)
  const dockNameRef = useRef<HTMLSpanElement>(null)

  const [docked, setDocked] = useState(false)
  // Skip the morph for the initial state, e.g. reloading mid-page
  const skipMorph = useRef(true)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const row = rowRef.current
        if (!row) return
        // The row is never transformed, so it reports the avatar's resting
        // position even while the avatar itself is mid-morph
        setDocked(row.getBoundingClientRect().top <= DOCK_TOP)
      })
    }

    update()
    const ready = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        skipMorph.current = false
      })
    })

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(ready)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useLayoutEffect(() => {
    if (skipMorph.current) return
    const pairs = [
      [avatarRef.current, dockAvatarRef.current],
      [nameRef.current, dockNameRef.current],
    ]
    for (const [hero, dock] of pairs) {
      if (!hero || !dock) continue
      if (docked) morph(hero, dock)
      else morph(dock, hero)
    }
  }, [docked])

  return (
    <>
      <div
        ref={rowRef}
        className="flex items-center gap-4 md:gap-8 mt-20 md:mt-32"
      >
        <div
          ref={avatarRef}
          className={cn('origin-top-left', docked && 'opacity-0')}
        >
          <ViewTransition name="avatar">
            <Image
              src="/assets/avatar.jpeg"
              alt="Avatar"
              width={600}
              height={600}
              className="rounded-full h-16 w-16 md:h-24 md:w-24 ring-1 ring-black/10"
            />
          </ViewTransition>
        </div>
        <h1 className="text-2xl md:text-3xl text-black">你好 👋</h1>
      </div>

      <h2 className="mt-8 md:mt-16 text-3xl md:text-4xl text-black font-[family-name:var(--font-instrument-serif)]">
        <span
          ref={nameRef}
          className={cn(
            'inline-block origin-top-left leading-none',
            docked && 'opacity-0',
          )}
        >
          Yiwei
        </span>{' '}
        <span
          className={cn(
            'transition-opacity duration-300',
            docked && 'opacity-0',
          )}
        >
          Here!
        </span>
      </h2>

      {/* Progressive blur behind the docked header */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-20 h-32 transition-opacity duration-500 md:h-36',
          docked ? 'opacity-100' : 'opacity-0',
        )}
      >
        {blurLayers.map(({ blur, end }) => (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: `linear-gradient(to bottom, black, transparent ${end}%)`,
              WebkitMaskImage: `linear-gradient(to bottom, black, transparent ${end}%)`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/70 to-transparent" />
        {/* iOS Safari draws the page under the status bar, above the fixed
            viewport's top edge, so extend the opaque top beyond it */}
        <div className="absolute inset-x-0 bottom-full h-32 bg-background" />
      </div>

      {/* Docked header */}
      <div
        inert={!docked}
        className={cn(
          'fixed inset-x-0 top-0 z-30',
          !docked && 'pointer-events-none',
        )}
      >
        <div className="container mx-auto px-6">
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0 })}
            className={cn(
              'mt-4 flex items-center gap-3 rounded-full',
              !docked && 'opacity-0',
            )}
          >
            <div ref={dockAvatarRef} className="origin-top-left">
              <Image
                src="/assets/avatar.jpeg"
                alt=""
                width={600}
                height={600}
                className="rounded-full h-9 w-9 ring-1 ring-black/10"
              />
            </div>
            <span
              ref={dockNameRef}
              className="inline-block origin-top-left leading-none text-2xl text-black font-[family-name:var(--font-instrument-serif)]"
            >
              Yiwei
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default HeroIdentity
