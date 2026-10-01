import { MockFrame, SearchBar } from './primitives'
import { cn } from '@/lib/utils'
import {
  Atom,
  Cloud,
  Container,
  Flame,
  Hexagon,
  Triangle,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const logos: { Icon: LucideIcon; fill?: boolean }[] = [
  { Icon: Triangle, fill: true },
  { Icon: Atom },
  { Icon: Wind },
  { Icon: Zap, fill: true },
  { Icon: Flame, fill: true },
  { Icon: Hexagon },
  { Icon: Cloud, fill: true },
  { Icon: Container },
]

const SvglMock = () => (
  <MockFrame>
    <SearchBar placeholder="Search SVG logos…" />
    <div className="grid flex-1 grid-cols-4 content-center gap-3 px-5">
      {logos.map(({ Icon, fill }, i) => (
        <div
          key={i}
          className={cn(
            'flex aspect-[4/3] items-center justify-center rounded-md bg-neutral-50',
            i === 0 && 'ring-1 ring-neutral-900',
          )}
        >
          <Icon
            className={cn('size-5 text-neutral-800', fill && 'fill-current')}
          />
        </div>
      ))}
    </div>
  </MockFrame>
)

export default SvglMock
