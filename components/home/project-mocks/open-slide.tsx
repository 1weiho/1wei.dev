import { BrowserBar, MockFrame } from './primitives'
import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'

const OpenSlideMock = () => (
  <MockFrame>
    <BrowserBar url="localhost:5173" />
    <div className="flex h-7 shrink-0 items-center gap-2 border-b border-neutral-100 px-3 text-2xs">
      <div className="flex rounded-md bg-neutral-100 p-0.5">
        <span className="rounded-sm bg-white px-1.5 py-0.5 font-medium shadow-xs">
          Slides
        </span>
        <span className="px-1.5 py-0.5 text-neutral-400">Assets</span>
      </div>
      <span className="mx-auto font-medium">Getting started</span>
      <span className="flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-white">
        <Play className="size-2 fill-current" />
        Present
      </span>
    </div>
    <div className="flex min-h-0 flex-1">
      <div className="w-18 shrink-0 space-y-2 overflow-hidden border-r border-neutral-100 p-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'flex aspect-video flex-col justify-end gap-0.5 rounded-sm p-1.5',
              i === 0
                ? 'bg-neutral-900 ring-1 ring-neutral-900 ring-offset-1'
                : 'bg-neutral-100',
            )}
          >
            <span
              className={cn(
                'h-0.5 w-3/4 rounded-full',
                i === 0 ? 'bg-white' : 'bg-neutral-300',
              )}
            />
            <span
              className={cn(
                'h-0.5 w-1/2 rounded-full',
                i === 0 ? 'bg-neutral-500' : 'bg-neutral-200',
              )}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center bg-neutral-50 p-4">
        <div className="flex aspect-video w-full flex-col justify-between rounded-md bg-neutral-900 p-4 shadow-sm">
          <div className="flex justify-between text-[length:calc(var(--text-2xs)*0.8)] tracking-[0.2em] text-neutral-500">
            <span>OPEN-SLIDE · GETTING STARTED</span>
            <span>01</span>
          </div>
          <div>
            <p className="text-xl leading-tight font-semibold tracking-tight text-white">
              Author slides
              <br />
              <span className="text-neutral-400">with your agent.</span>
            </p>
            <div className="mt-3 flex gap-2.5 text-[length:calc(var(--text-2xs)*0.8)] text-neutral-500">
              {['init', 'prompt', 'edit', 'present'].map((step, i) => (
                <span key={step}>
                  <span className="text-neutral-300">0{i + 1}</span> {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </MockFrame>
)

export default OpenSlideMock
