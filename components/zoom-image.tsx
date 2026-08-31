'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Phase = 'closed' | 'opening' | 'open' | 'closing'

const ZOOM_MARGIN = 40
const DURATION = 400
const EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'

export default function ZoomImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [phase, setPhase] = useState<Phase>('closed')
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [naturalWidth, setNaturalWidth] = useState(Infinity)

  const isActive = phase !== 'closed'

  const openZoom = useCallback(() => {
    const img = imgRef.current
    if (!img || phase !== 'closed') return
    setRect(img.getBoundingClientRect())
    setNaturalWidth(img.naturalWidth || Infinity)
    setPhase('opening')
  }, [phase])

  const closeZoom = useCallback(() => {
    const img = imgRef.current
    // Re-measure so the image animates back to where it currently is
    if (img) setRect(img.getBoundingClientRect())
    setPhase((p) => (p === 'open' || p === 'opening' ? 'closing' : p))
  }, [])

  // Kick off the zoom-in transition on the frame after the clone mounts
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

  // Close on Escape / scroll / resize while zoomed
  useEffect(() => {
    if (phase !== 'open') return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', closeZoom, { passive: true })
    window.addEventListener('resize', closeZoom)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', closeZoom)
      window.removeEventListener('resize', closeZoom)
    }
  }, [phase, closeZoom])

  // Safety net in case transitionend never fires (e.g. reduced motion)
  useEffect(() => {
    if (phase !== 'closing') return
    const id = setTimeout(() => setPhase('closed'), DURATION + 100)
    return () => clearTimeout(id)
  }, [phase])

  const getZoomTransform = () => {
    if (!rect) return 'none'
    const scale = Math.min(
      (window.innerWidth - ZOOM_MARGIN * 2) / rect.width,
      (window.innerHeight - ZOOM_MARGIN * 2) / rect.height,
      Math.max(naturalWidth / rect.width, 1),
    )
    const translateX =
      window.innerWidth / 2 - (rect.left + rect.width / 2)
    const translateY =
      window.innerHeight / 2 - (rect.top + rect.height / 2)
    return `translate(${translateX}px, ${translateY}px) scale(${scale})`
  }

  const zoomed = phase === 'open'

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        ref={imgRef}
        alt={props.alt ?? ''}
        onClick={openZoom}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openZoom()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={props.alt ? `Zoom image: ${props.alt}` : 'Zoom image'}
        className="cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
        style={{ visibility: isActive ? 'hidden' : undefined }}
      />

      {isActive &&
        rect &&
        createPortal(
          <div
            className="fixed inset-0 z-50 cursor-zoom-out"
            onClick={closeZoom}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-white/90 backdrop-blur-sm"
              style={{
                opacity: zoomed ? 1 : 0,
                transition: `opacity ${DURATION}ms ${EASING}`,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.src}
              alt={props.alt ?? ''}
              onTransitionEnd={(e) => {
                if (
                  e.propertyName === 'transform' &&
                  phase === 'closing'
                ) {
                  setPhase('closed')
                }
              }}
              className="absolute rounded-lg ring-1 ring-black/5"
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                transform: zoomed ? getZoomTransform() : 'none',
                transition: `transform ${DURATION}ms ${EASING}`,
                willChange: 'transform',
              }}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
