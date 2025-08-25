'use client'

import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/photo',
    title: 'Photo',
  },
]

const Navbar = () => {
  const currentPathname = `/${usePathname().split('/')[1]}`

  return (
    <nav className="sticky top-0 z-10 bg-background/80 backdrop-blur-md py-6">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-2xl font-bold">
          1wei
        </Link>
        <div className="flex space-x-6 md:space-x-12 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                'text-muted-foreground hover:text-foreground transition-colors',
                link.path === currentPathname && 'text-foreground'
              )}
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="https://links.1wei.dev"
            target="_blank"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            Links
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
