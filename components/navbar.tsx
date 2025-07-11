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
          className={cn(link.path === currentPathname && 'text-black')}
        >
          {link.title}
        </Link>
      ))}
      <Link
        href="https://links.1wei.dev"
        target="_blank"
        className="flex items-center gap-1"
      >
        Links
        <ArrowUpRight className="size-4" />
      </Link>
    </nav>
  )
}

export default Navbar
