import { cn } from '@/lib/utils'

// Stacked backdrop blurs, each masked to fade out sooner the stronger it is,
// so the content blurs progressively as it scrolls up under the header
const blurLayers = [
  { blur: 0.5, end: 100 },
  { blur: 1, end: 85 },
  { blur: 2, end: 70 },
  { blur: 4, end: 55 },
  { blur: 8, end: 40 },
]

// Background veil: solid behind the status bar strip (`h-4`), then an eased
// fade to transparent. A linear fade shows hard bands over dark content
const veilSteps = 12
const veil = `linear-gradient(to bottom, ${Array.from(
  { length: veilSteps + 1 },
  (_, i) => {
    const t = i / veilSteps
    const alpha = (1 + Math.cos(Math.PI * t)) / 2
    return `hsl(var(--background) / ${alpha.toFixed(3)}) calc(1rem + (100% - 1rem) * ${t.toFixed(3)})`
  },
).join(', ')})`

const TopBlur = ({ visible }: { visible: boolean }) => (
  <>
    {/* Progressive blur behind the floating header */}
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-20 h-32 overflow-hidden transition-opacity duration-500 md:h-36',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {blurLayers.map(({ blur, end }) => (
        <div
          key={blur}
          // Bleed past the sides, Safari draws a hard edge where a
          // backdrop blur ends
          className="absolute inset-y-0 -inset-x-8"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(to bottom, black, transparent ${end}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black, transparent ${end}%)`,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ backgroundImage: veil }} />
    </div>

    {/* Safari 26 draws the page under the status bar and fills that area
        only from the topmost fixed element touching the viewport top, using
        its own opaque background. Keep this strip above the paper grain
        (z-40) and keep everything else off the top edge, otherwise the
        content scrolls past unblurred */}
    <div
      aria-hidden
      className={cn(
        'fixed inset-x-0 top-0 z-[45] h-4 transition-colors duration-500',
        visible ? 'bg-background' : 'pointer-events-none bg-transparent',
      )}
    />
  </>
)

export default TopBlur
