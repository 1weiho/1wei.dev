import Github from '@/components/svg/github'
import X from '@/components/svg/x'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-20 md:mt-32">
      <div className="flex-shrink-0">
        <Image
          src="/assets/avatar.jpeg"
          alt="Avatar"
          width={200}
          height={200}
          className="rounded-full h-32 w-32 md:h-48 md:w-48"
        />
      </div>
      <div className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold">Yiwei Ho</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground">
          Full-stack Developer
        </h2>
        <div className="mt-4 max-w-xl text-base md:text-lg">
          <Balancer>
            I craft seamless user experiences and build scalable systems.
            Passionate about beautiful design and innovative technologies.
          </Balancer>
        </div>
        <div className="mt-6 flex gap-6 justify-center md:justify-start">
          <Link
            href="https://x.com/1weiho"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-6 w-6" />
          </Link>
          <Link
            href="https://github.com/1weiho"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
