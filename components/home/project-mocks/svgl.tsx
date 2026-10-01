import { MockFrame, RaycastBar, RaycastFooter } from './primitives'
import { cn } from '@/lib/utils'
import {
  Atom,
  ChevronDown,
  Cloud,
  Container,
  Database,
  Flame,
  Hexagon,
  Triangle,
  Wind,
  Zap,
} from 'lucide-react'

const NextLogo = ({ className }: { className?: string }) => (
  <span
    className={cn(
      'flex items-center justify-center rounded-full bg-neutral-900 text-[length:var(--text-xs)] font-semibold text-white',
      className,
    )}
  >
    N
  </span>
)

const logos = [
  { name: 'Vercel', category: 'Hosting', Icon: Triangle, fill: true },
  { name: 'Next.js', category: 'Framework', Icon: NextLogo },
  { name: 'React', category: 'Library', Icon: Atom },
  { name: 'Tailwind CSS', category: 'Framework', Icon: Wind },
  { name: 'Supabase', category: 'Database', Icon: Zap, fill: true },
  { name: 'Docker', category: 'DevOps', Icon: Container },
  { name: 'Firebase', category: 'Database', Icon: Flame, fill: true },
  { name: 'PostgreSQL', category: 'Database', Icon: Database },
  { name: 'Cloudflare', category: 'Hosting', Icon: Cloud, fill: true },
  { name: 'Node.js', category: 'Runtime', Icon: Hexagon },
]

const SvglMock = () => (
  <MockFrame>
    <RaycastBar
      placeholder="Search SVG Logos…"
      accessory={
        <span className="flex h-5 w-24 items-center justify-between rounded-md px-2 text-2xs ring-1 ring-neutral-200">
          All · 293
          <ChevronDown className="size-2.5 text-neutral-400" />
        </span>
      }
    />
    <div className="grid min-h-0 flex-1 grid-cols-5 content-start gap-x-2 gap-y-2.5 overflow-hidden p-3">
      {logos.map(({ name, category, Icon, fill }, i) => (
        <div key={name}>
          <div
            className={cn(
              'flex aspect-[5/4] items-center justify-center rounded-md bg-neutral-100',
              i === 0 && 'ring-1 ring-neutral-900 ring-offset-1',
            )}
          >
            <Icon
              className={cn('size-6 text-neutral-800', fill && 'fill-current')}
            />
          </div>
          <p className="mt-1 truncate text-2xs font-medium">{name}</p>
          <p className="truncate text-2xs text-neutral-400">{category}</p>
        </div>
      ))}
    </div>
    <RaycastFooter title="Search SVG Logos" action="Copy SVG File" />
  </MockFrame>
)

export default SvglMock
