import { BrowserBar, MockFrame, Pill } from './primitives'
import { Play, ScrollText, Zap } from 'lucide-react'

const functions = [
  { name: 'Get All Posts', avg: '57', p95: '84' },
  { name: 'Seed Posts', avg: '1047', p95: '1240' },
]

const NextSandboxMock = () => (
  <MockFrame>
    <BrowserBar url="localhost:3000" />
    <div className="relative min-h-0 flex-1 overflow-hidden p-4">
      <p className="text-sm font-semibold tracking-tight">next-sandbox</p>
      <div className="mt-3 rounded-lg bg-neutral-50 p-3 ring-1 ring-neutral-100">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          Function
          <Pill>2</Pill>
        </div>
        <div className="mt-2.5 space-y-2">
          {functions.map(({ name, avg, p95 }) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-md bg-white px-3 py-2.5 shadow-xs ring-1 ring-neutral-200/70"
            >
              <span className="text-xs font-medium whitespace-nowrap">
                {name}
              </span>
              <Pill tone="emerald">success</Pill>
              <div className="ml-auto flex gap-3">
                {[
                  ['AVG', avg],
                  ['P95', p95],
                ].map(([label, value]) => (
                  <div key={label} className="w-10">
                    <p className="text-2xs text-neutral-400">{label}</p>
                    <p className="text-2xs font-medium tabular-nums">
                      {value}ms
                    </p>
                  </div>
                ))}
              </div>
              {[ScrollText, Play].map((Icon, i) => (
                <span
                  key={i}
                  className="flex size-6 items-center justify-center rounded-md bg-neutral-100"
                >
                  <Icon className="size-3 text-neutral-600" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="absolute bottom-3 left-3 flex size-6 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200">
        <Zap className="size-3" />
      </span>
    </div>
  </MockFrame>
)

export default NextSandboxMock
