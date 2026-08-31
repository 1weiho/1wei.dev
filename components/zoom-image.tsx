'use client'

import ZoomOverlay, { type ZoomTarget } from '@/components/zoom-overlay'
import { useCallback, useRef, useState } from 'react'

export default function ZoomImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [target, setTarget] = useState<ZoomTarget | null>(null)

  const openZoom = useCallback(() => {
    const img = imgRef.current
    if (!img) return
    setTarget((current) =>
      current
        ? current
        : {
            rect: img.getBoundingClientRect(),
            src: img.currentSrc || img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            alt: props.alt ?? '',
            originEl: img,
            capWidth: img.naturalWidth || undefined,
            className: 'rounded-lg ring-1 ring-black/5',
          },
    )
  }, [props.alt])

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
      />

      {target && (
        <ZoomOverlay target={target} onClosed={() => setTarget(null)} />
      )}
    </>
  )
}
