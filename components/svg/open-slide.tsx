import Image from 'next/image'
import * as React from 'react'

const OpenSlide = ({ className }: React.SVGProps<SVGSVGElement>) => (
  <Image
    src="/assets/logo/open-slide.png"
    alt="Open Slide"
    width={16}
    height={16}
    className={`size-4 rounded-sm ${className ?? ''}`}
  />
)

export default OpenSlide
