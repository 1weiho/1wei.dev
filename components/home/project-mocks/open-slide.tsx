import { MockFrame, WindowBar } from './primitives'
import { cn } from '@/lib/utils'

const OpenSlideMock = () => (
  <MockFrame>
    <WindowBar />
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-14 pb-6">
      <div className="flex aspect-video w-full flex-col justify-end rounded-md bg-neutral-900 p-6 shadow-sm">
        <p className="text-xl leading-tight font-semibold tracking-tight text-white">
          Author slides
          <br />
          <span className="text-neutral-500">with your agent.</span>
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1 rounded-full',
              i === 0 ? 'w-4 bg-neutral-900' : 'w-1 bg-neutral-300',
            )}
          />
        ))}
      </div>
    </div>
  </MockFrame>
)

export default OpenSlideMock
