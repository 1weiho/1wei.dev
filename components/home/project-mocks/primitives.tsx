import { cn } from '@/lib/utils'
import { ArrowLeft, CornerDownLeft } from 'lucide-react'

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
    className="@container relative aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.015] overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/5 select-none"
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

const Dots = () => (
  <div className="flex w-9 gap-1.5">
    {[0, 1, 2].map((i) => (
      <span key={i} className="size-2 rounded-full bg-neutral-200" />
    ))}
  </div>
)

export const BrowserBar = ({ url }: { url: string }) => (
  <div className="flex h-8 shrink-0 items-center border-b border-neutral-100 px-3.5">
    <Dots />
    <div className="mx-auto flex h-5 w-40 items-center justify-center rounded-md bg-neutral-100 text-2xs text-neutral-500">
      {url}
    </div>
    <div className="w-9" />
  </div>
)

export const RaycastBar = ({
  query,
  placeholder,
  accessory,
}: {
  query?: string
  placeholder?: string
  accessory?: React.ReactNode
}) => (
  <div className="flex h-8 shrink-0 items-center gap-2 border-b border-neutral-100 px-3">
    <span className="flex size-5 items-center justify-center rounded-md bg-neutral-100">
      <ArrowLeft className="size-3" />
    </span>
    <span className="flex items-center text-xs">
      <span className="h-3 w-px bg-neutral-900" />
      {query ? (
        <span className="ml-0.5">{query}</span>
      ) : (
        <span className="ml-0.5 text-neutral-400">{placeholder}</span>
      )}
    </span>
    <div className="ml-auto">{accessory}</div>
  </div>
)

export const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-4 min-w-4 items-center justify-center rounded-sm bg-neutral-200/70 px-1 text-2xs text-neutral-500">
    {children}
  </span>
)

export const RaycastFooter = ({
  title,
  action,
}: {
  title: string
  action: string
}) => (
  <div className="flex h-7 shrink-0 items-center gap-2 border-t border-neutral-100 bg-neutral-50 px-3 text-2xs">
    <span className="size-3.5 rounded-sm bg-neutral-900" />
    <span className="text-neutral-500">{title}</span>
    <span className="ml-auto font-medium">{action}</span>
    <Kbd>
      <CornerDownLeft className="size-2.5" />
    </Kbd>
    <span className="h-3 w-px bg-neutral-200" />
    <span className="text-neutral-500">Actions</span>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </div>
)

const pillTones = {
  neutral: 'bg-neutral-100 text-neutral-600 ring-neutral-200',
  sky: 'bg-sky-50 text-sky-600 ring-sky-200',
  emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-600 ring-amber-200',
  rose: 'bg-rose-50 text-rose-600 ring-rose-200',
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
      'inline-flex h-4 shrink-0 items-center rounded-full px-1.5 text-2xs font-medium ring-1 ring-inset',
      pillTones[tone],
      className,
    )}
  >
    {children}
  </span>
)
