'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const ZOOM_DURATION = 650
export const ZOOM_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'
const ZOOM_MARGIN = 40

export type ZoomTarget = {
  /** Viewport rect of the element the zoom starts from */
  rect: { top: number; left: number; width: number; height: number }
  /** Instantly displayable source (e.g. the thumbnail's currentSrc) */
  src: string
  /** Optional hi-res source faded in on top once loaded */
  fullSrc?: string
  /** Natural dimensions of the underlying photo, for the fullscreen aspect */
  naturalWidth: number
  naturalHeight: number
  alt: string
  /** Element hidden while the zoomed clone is on screen */
  originEl?: HTMLElement | null
  /** Cap the fullscreen width (e.g. at the image's natural width) */
  capWidth?: number
  /** Extra classes on the zooming box (e.g. rounded corners) */
  className?: string
  /** Overlaid at the bottom of the photo once fully open */
  caption?: React.ReactNode
}

type Phase = 'opening' | 'open' | 'closing'

/**
 * Shared-element fullscreen zoom. The clone box animates from the origin
 * rect to a centered fit of the photo's natural aspect ratio; a counter-
 * scaled inner layer makes a cropped thumbnail expand to reveal the full
 * photo. Transform-only, so the whole flight stays on the compositor.
 */
export default function ZoomOverlay({
  target,
  backdropClassName = 'bg-white/90 backdrop-blur-sm',
  onClosed,
}: {
  target: ZoomTarget
  backdropClassName?: string
  onClosed: () => void
}) {
  const [phase, setPhase] = useState<Phase>('opening')
  const [rect, setRect] = useState(target.rect)
  const [fullLoaded, setFullLoaded] = useState(false)

  // Fullscreen geometry is fixed for the overlay's lifetime (resize closes)
  const [fit] = useState(() => {
    const aspect =
      target.naturalWidth > 0 && target.naturalHeight > 0
        ? target.naturalWidth / target.naturalHeight
        : target.rect.width / target.rect.height
    const maxWidth = Math.min(
      window.innerWidth - ZOOM_MARGIN * 2,
      target.capWidth ?? Infinity,
    )
    const maxHeight = window.innerHeight - ZOOM_MARGIN * 2
    let width = maxWidth
    let height = width / aspect
    if (height > maxHeight) {
      height = maxHeight
      width = height * aspect
    }
    return {
      width,
      height,
      left: (window.innerWidth - width) / 2,
      top: (window.innerHeight - height) / 2,
    }
  })

  // Hide the origin element while the clone is on screen. Toggling
  // visibility on an external DOM node is an intentional escape hatch.
  useEffect(() => {
    const el = target.originEl
    if (!el) return
    const previous = el.style.visibility
    // eslint-disable-next-line react-hooks/immutability
    el.style.visibility = 'hidden'
    return () => {
      el.style.visibility = previous
    }
  }, [target.originEl])

  // Kick off the zoom-in transition on the frame after mount
  useEffect(() => {
    if (phase !== 'opening') return
    let inner: number
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPhase('open'))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [phase])

  const close = useCallback(() => {
    if (phase === 'closing') return
    if (phase === 'opening') {
      onClosed()
      return
    }
    // Re-measure so the clone flies back to where the origin currently is
    const el = target.originEl
    if (el) setRect(el.getBoundingClientRect())
    setPhase('closing')
  }, [phase, target.originEl, onClosed])

  // Close on Escape / scroll / resize while zoomed
  useEffect(() => {
    if (phase !== 'open') return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', close, { passive: true })
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', close)
      window.removeEventListener('resize', close)
    }
  }, [phase, close])

  // Safety net in case transitionend never fires (e.g. reduced motion)
  useEffect(() => {
    if (phase !== 'closing') return
    const id = setTimeout(onClosed, ZOOM_DURATION + 100)
    return () => clearTimeout(id)
  }, [phase, onClosed])

  // FLIP: the clone is laid out at its fullscreen position; the start
  // transform squashes it onto the origin rect, and the inner layer
  // counter-scales so the visible pixels match the origin's cover crop.
  const scaleX = rect.width / fit.width
  const scaleY = rect.height / fit.height
  const cover = Math.max(scaleX, scaleY)
  const boxStart = `translate(${
    rect.left + rect.width / 2 - (fit.left + fit.width / 2)
  }px, ${
    rect.top + rect.height / 2 - (fit.top + fit.height / 2)
  }px) scale(${scaleX}, ${scaleY})`
  const innerStart = `scale(${cover / scaleX}, ${cover / scaleY})`

  const zoomed = phase === 'open'
  const flight = `transform ${ZOOM_DURATION}ms ${ZOOM_EASING}`

  return createPortal(
    <div
      className="fixed inset-0 z-50 cursor-zoom-out"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={target.alt}
    >
      <div
        className={`absolute inset-0 ${backdropClassName}`}
        style={{
          opacity: zoomed ? 1 : 0,
          transition: `opacity ${ZOOM_DURATION}ms ${ZOOM_EASING}`,
        }}
      />
      <div
        className={`absolute overflow-hidden ${target.className ?? ''}`}
        style={{
          top: fit.top,
          left: fit.left,
          width: fit.width,
          height: fit.height,
          transform: zoomed ? 'none' : boxStart,
          transition: flight,
          willChange: 'transform',
        }}
        onTransitionEnd={(e) => {
          if (e.propertyName === 'transform' && phase === 'closing') {
            onClosed()
          }
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: zoomed ? 'none' : innerStart,
            transition: flight,
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={target.src}
            alt={target.alt}
            className="absolute inset-0 size-full object-cover"
          />
          {target.fullSrc && target.fullSrc !== target.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={target.fullSrc}
              alt=""
              onLoad={() => setFullLoaded(true)}
              className="absolute inset-0 size-full object-cover"
              style={{ opacity: fullLoaded ? 1 : 0, transition: 'opacity 300ms ease' }}
            />
          )}
        </div>
        {target.caption && (
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              opacity: zoomed ? 1 : 0,
              transition: `opacity 300ms ease ${zoomed ? '250ms' : '0ms'}`,
            }}
          >
            {target.caption}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
