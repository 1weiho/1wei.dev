import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

// Decorative 16:10 window every project mock renders into.
// See `.mock-canvas` in globals.css for how the contents scale.
export const MockFrame = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    aria-hidden
    className="@container relative aspect-[16/10] overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-transform duration-500 ease-out select-none group-hover:scale-[1.015]"
  >
    <div
      className={cn(
        'mock-canvas flex size-full flex-col font-[family-name:var(--font-geist-sans)] text-neutral-900',
        className,
      )}
    >
      {children}
    </div>
  </div>
)

export const WindowBar = () => (
  <div className="flex h-8 shrink-0 items-center gap-1.5 px-4">
    {[0, 1, 2].map((i) => (
      <span key={i} className="size-2 rounded-full bg-neutral-200" />
    ))}
  </div>
)

export const SearchBar = ({
  query,
  placeholder,
}: {
  query?: string
  placeholder?: string
}) => (
  <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-neutral-100 px-5 text-sm">
    <Search className="size-3.5 text-neutral-400" />
    {query ?? <span className="text-neutral-400">{placeholder}</span>}
  </div>
)

const pillTones = {
  neutral: 'bg-neutral-100 text-neutral-500',
  sky: 'bg-sky-50 text-sky-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
}

export const Pill = ({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: keyof typeof pillTones
  className?: string
  children: React.ReactNode
}) => (
  <span
    className={cn(
      'inline-flex h-5 shrink-0 items-center justify-center rounded-full px-2 text-2xs font-medium',
      pillTones[tone],
      className,
    )}
  >
    {children}
  </span>
)
