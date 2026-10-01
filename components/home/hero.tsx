import BuyMeACoffee from '@/components/svg/buy-me-a-coffee'
import Github from '@/components/svg/github'
import X from '@/components/svg/x'
import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import Balancer from 'react-wrap-balancer'

const linkClassName =
  'flex items-center gap-2 hover:text-black duration-300 group text-sm md:text-base'

const iconClassName =
  'size-5 md:size-4 grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100'

// Icon-only on mobile, label stays available to screen readers
const labelClassName = 'sr-only md:not-sr-only'

const Hero = () => {
  return (
    <div>
      <div className="flex items-center gap-4 md:gap-8 mt-20 md:mt-32">
        <ViewTransition name="avatar">
          <Image
            src="/assets/avatar.jpeg"
            alt="Avatar"
            width={600}
            height={600}
            className="rounded-full h-16 w-16 md:h-24 md:w-24 ring-1 ring-black/10"
          />
        </ViewTransition>
        <h1 className="text-2xl md:text-3xl text-black">你好 👋</h1>
      </div>

      <h2 className="mt-8 md:mt-16 text-3xl md:text-4xl text-black font-[family-name:var(--font-instrument-serif)]">
        Yiwei Here!
      </h2>

      <div className="mt-6 md:mt-10 max-w-[900px] text-sm md:text-base">
        <Balancer>
          I am currently a backend developer at Microprogram, where we have
          built a world-class public bike-sharing system in Taiwan. I have a
          passion for exploring new frontend and backend technologies, and I am
          deeply inspired by beautiful and innovative designs.
        </Balancer>
      </div>

      <div className="mt-8 flex gap-6 md:gap-8 items-center">
        <Link
          href="https://x.com/1weiho"
          target="_blank"
          className={linkClassName}
        >
          <X className={iconClassName} />
          <span className={labelClassName}>Twitter</span>
        </Link>

        <Link
          href="https://github.com/1weiho"
          target="_blank"
          className={linkClassName}
        >
          <Github className={iconClassName} />
          <span className={labelClassName}>GitHub</span>
        </Link>

        <Link
          href="https://buymeacoffee.com/1weiho"
          target="_blank"
          className={linkClassName}
        >
          <BuyMeACoffee className={iconClassName} />
          <span className={labelClassName}>Sponsor</span>
        </Link>
      </div>
    </div>
  )
}

export default Hero
