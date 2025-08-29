import Github from '@/components/svg/github'
import X from '@/components/svg/x'
import Image from 'next/image'
import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'
import Balancer from 'react-wrap-balancer'

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
            className="rounded-full h-16 w-16 md:h-24 md:w-24"
          />
        </ViewTransition>
        <h1 className="text-xl md:text-2xl text-emerald-400 drop-shadow-[0_0_0.5rem_#39ff14]">
          你好 👋
        </h1>
      </div>

      <h2 className="mt-8 md:mt-16 text-4xl md:text-5xl text-pink-500 drop-shadow-[0_0_0.75rem_#ff00ff]">
        Yiwei Here!
      </h2>

      <div className="mt-6 md:mt-10 max-w-[900px] text-sm md:text-base text-fuchsia-200">
        <Balancer>
          I am currently a backend developer at Microprogram, where we have
          built a world-class public bike-sharing system in Taiwan. I have a
          passion for exploring new frontend and backend technologies, and I am
          deeply inspired by beautiful and innovative designs.
        </Balancer>
      </div>

      <div className="mt-8 flex gap-8 items-center">
        <Link
          href="https://x.com/1weiho"
          target="_blank"
          className="flex items-center gap-2 text-fuchsia-200 transition-colors duration-300 hover:text-pink-500 group text-sm md:text-base"
        >
          <X className="grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100" />
          Twitter
        </Link>

        <Link
          href="https://github.com/1weiho"
          target="_blank"
          className="flex items-center gap-2 text-fuchsia-200 transition-colors duration-300 hover:text-pink-500 group text-sm md:text-base"
        >
          <Github className="grayscale-0 md:grayscale opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100" />
          GitHub
        </Link>
      </div>
    </div>
  )
}

export default Hero
