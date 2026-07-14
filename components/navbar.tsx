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
    path: '/blog',
    title: 'Blog',
  },
  {
    path: '/photo',
    title: 'Photo',
  },
]

const Navbar = () => {
  const currentPathname = `/${usePathname().split('/')[1]}`

  return (
    <nav className="mt-12 flex space-x-6 md:space-x-12">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            'transition-colors duration-300 hover:text-black',
            link.path === currentPathname && 'text-black',
          )}
        >
          {link.title}
        </Link>
      ))}
      <Link
        href="https://links.1wei.dev"
        target="_blank"
        className="group flex items-center gap-1 transition-colors duration-300 hover:text-black"
      >
        Links
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </nav>
  )
}

export default Navbar
