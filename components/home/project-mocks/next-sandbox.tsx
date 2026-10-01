import { MockFrame, WindowBar } from './primitives'
import { Play } from 'lucide-react'

const functions = [
  { name: 'getAllPosts', time: '57ms' },
  { name: 'seedPosts', time: '1,047ms' },
]

const NextSandboxMock = () => (
  <MockFrame>
    <WindowBar />
    <div className="flex flex-1 flex-col justify-center gap-3 px-8 pb-6">
      {functions.map(({ name, time }) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-lg px-4 py-3.5 ring-1 ring-neutral-200/80"
        >
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="font-[family-name:var(--font-geist-mono)] text-xs">
            {name}()
          </span>
          <span className="ml-auto text-xs text-neutral-400 tabular-nums">
            {time}
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-neutral-900">
            <Play className="size-2.5 fill-current text-white" />
          </span>
        </div>
      ))}
    </div>
  </MockFrame>
)

export default NextSandboxMock
