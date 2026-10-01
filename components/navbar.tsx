'use client'

import Github from '@/components/svg/github'
import X from '@/components/svg/x'
import TopBlur from '@/components/top-blur'
import UTC8Clock from '@/components/utc-8-clock'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
    path: '/talk',
    title: 'Talk',
  },
  {
    path: '/photo',
    title: 'Photo',
  },
  {
    path: 'https://links.1wei.dev',
    title: 'Links',
    external: true,
  },
]

const socials = [
  { href: 'https://x.com/1weiho', label: 'Twitter', Icon: X },
  { href: 'https://github.com/1weiho', label: 'GitHub', Icon: Github },
]

const EASING = 'ease-[cubic-bezier(0.32,0.72,0,1)]'

// Where the header sticks (matches `top-4`)
const STICKY_TOP = 16

// Items rise in one after another on open, and leave together on close
const stagger = (open: boolean, index: number) => ({
  transitionDelay: open ? `${120 + index * 45}ms` : '0ms',
})

const itemClassName = (open: boolean) =>
  cn(
    'transition-[opacity,transform,filter] motion-reduce:transition-none',
    EASING,
    open
      ? 'translate-y-0 opacity-100 blur-[0px] duration-700'
      : 'translate-y-6 opacity-0 blur-sm duration-300',
  )

const Navbar = () => {
  const pathname = usePathname()
  const currentPathname = `/${pathname.split('/')[1]}`

  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Whether the header has left its spot and floats over the content
  const [floating, setFloating] = useState(false)

  // Close when the route changes underneath the menu, e.g. browser back
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const header = headerRef.current
        if (!header) return
        setFloating(header.getBoundingClientRect().top <= STICKY_TOP)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const root = document.documentElement
    const { overflow, scrollbarGutter } = root.style
    // Lock the page behind the menu. If it had a scrollbar, keep its space so
    // the layout doesn't shift sideways
    if (window.innerWidth > root.clientWidth) {
      root.style.scrollbarGutter = 'stable'
    }
    root.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      // Keep focus cycling between the trigger and the menu items
      const focusables = [
        triggerRef.current,
        ...(menuRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []),
      ].filter((el): el is HTMLElement => !!el)
      // Step manually, the trigger sits after the menu in the DOM
      event.preventDefault()
      const index = focusables.indexOf(document.activeElement as HTMLElement)
      const step = event.shiftKey ? -1 : 1
      const next =
        index === -1
          ? 0
          : (index + step + focusables.length) % focusables.length
      focusables[next].focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      root.style.overflow = overflow
      root.style.scrollbarGutter = scrollbarGutter
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      {/* Home docks its own header and drives the blur from that instead */}
      {pathname !== '/' && <TopBlur visible={floating} />}

      {/* Full-screen menu. Sits just under the paper grain (z-40) so it keeps
          the texture, and over the docked home header (z-30) so it blurs it */}
      <div
        ref={menuRef}
        id="site-menu"
        inert={!open}
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-[39] overflow-y-auto bg-background/80 backdrop-blur-2xl transition-[opacity,visibility] motion-reduce:transition-none',
          EASING,
          open
            ? 'visible opacity-100 duration-500'
            : 'invisible opacity-0 duration-300',
        )}
      >
        <div className="container mx-auto flex min-h-full flex-col px-6 pt-28 pb-8 md:pt-36 md:pb-12">
          <nav aria-label="Main">
            <ul className="group/list flex w-fit flex-col">
              {links.map((link, index) => {
                const active = !link.external && link.path === currentPathname
                return (
                  <li
                    key={link.path}
                    className={itemClassName(open)}
                    style={stagger(open, index)}
                  >
                    <Link
                      href={link.path}
                      target={link.external ? '_blank' : undefined}
                      aria-current={active ? 'page' : undefined}
                      className="group flex w-fit items-start gap-4 py-1.5 text-black transition-colors duration-300 md:gap-6 md:group-hover/list:text-black/25 md:hover:text-black!"
                    >
                      <span className="mt-1.5 font-mono text-xs text-black/40 tabular-nums md:mt-3 md:text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'flex items-center gap-3 font-[family-name:var(--font-instrument-serif)] text-5xl leading-none transition-transform duration-500 group-hover:translate-x-2 md:text-7xl',
                          EASING,
                        )}
                      >
                        {link.title}
                        {link.external && (
                          <ArrowUpRight
                            strokeWidth={1.25}
                            className="size-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-12"
                          />
                        )}
                        {active && (
                          <span
                            aria-hidden
                            className="size-2 rounded-full bg-black md:size-2.5"
                          />
                        )}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div
            className={cn(
              'mt-auto flex items-center justify-between pt-12 text-black',
              itemClassName(open),
            )}
            style={stagger(open, links.length)}
          >
            <UTC8Clock />
            <div className="flex items-center gap-5">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Takes the old inline nav's spot, then floats along once scrolled.
          Only the button catches clicks, so the docked header stays usable */}
      <header
        ref={headerRef}
        className="pointer-events-none sticky top-4 z-[39] mt-12 flex h-9 justify-end"
      >
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
          className="pointer-events-auto flex h-9 items-center gap-2.5 font-mono text-sm transition-colors duration-300 hover:text-black aria-expanded:text-black md:text-base"
        >
          {/* Two bars that cross into an X */}
          <span aria-hidden className="relative size-3.5">
            <span
              className={cn(
                'absolute inset-x-0 top-[6.5px] h-px bg-current transition-transform duration-500 motion-reduce:transition-none',
                EASING,
                open ? 'rotate-45' : '-translate-y-[3px]',
              )}
            />
            <span
              className={cn(
                'absolute inset-x-0 top-[6.5px] h-px bg-current transition-transform duration-500 motion-reduce:transition-none',
                EASING,
                open ? '-rotate-45' : 'translate-y-[3px]',
              )}
            />
          </span>

          {/* Label rolls between Menu and Close */}
          <span className="relative h-5 overflow-hidden leading-5">
            <span
              className={cn(
                'flex flex-col transition-transform duration-500 motion-reduce:transition-none',
                EASING,
                open && '-translate-y-1/2',
              )}
            >
              <span aria-hidden={open}>Menu</span>
              <span aria-hidden={!open}>Close</span>
            </span>
          </span>
        </button>
      </header>
    </>
  )
}

export default Navbar
