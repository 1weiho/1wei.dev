import { BrowserBar, MockFrame, Pill } from './primitives'
import { Code, Search, SlidersHorizontal, Trash2 } from 'lucide-react'

const methodTone = {
  GET: 'sky',
  POST: 'emerald',
  PATCH: 'amber',
  DELETE: 'rose',
} as const

type Method = keyof typeof methodTone

const routes: { methods: Method[]; path: string[] }[] = [
  { methods: ['POST'], path: ['api', 'auth', 'login'] },
  { methods: ['GET', 'POST'], path: ['api', 'posts'] },
  { methods: ['GET', 'PATCH', 'DELETE'], path: ['api', 'posts', ':postId'] },
  { methods: ['GET', 'PATCH'], path: ['api', 'profile'] },
  { methods: ['GET'], path: ['api', 'search'] },
  { methods: ['POST'], path: ['api', 'upload'] },
]

const NextLensMock = () => (
  <MockFrame>
    <BrowserBar url="localhost:3000" />
    <div className="min-h-0 flex-1 overflow-hidden bg-neutral-50 p-3.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold tracking-tight">API Routes</span>
        <Pill>13</Pill>
        <div className="ml-auto flex rounded-md bg-neutral-200/60 p-0.5 text-2xs">
          <span className="rounded-sm bg-white px-2 py-0.5 font-medium shadow-xs">
            API
          </span>
          <span className="px-2 py-0.5 text-neutral-500">Pages</span>
        </div>
      </div>
      <div className="mt-2.5 overflow-hidden rounded-md bg-white ring-1 ring-neutral-200/80">
        <div className="flex items-center gap-1.5 border-b border-neutral-100 px-2.5 py-1.5 text-2xs text-neutral-400">
          <Search className="size-2.5" />
          Search endpoints…
        </div>
        {routes.map(({ methods, path }) => (
          <div
            key={path.join('/')}
            className="flex items-center border-b border-neutral-100 px-2.5 py-1.5 last:border-0"
          >
            <div className="flex w-31 shrink-0 gap-1">
              {methods.map((method) => (
                <Pill
                  key={method}
                  tone={methodTone[method]}
                  className="font-[family-name:var(--font-geist-mono)]"
                >
                  {method}
                </Pill>
              ))}
            </div>
            <span className="font-[family-name:var(--font-geist-mono)] text-2xs">
              {path.map((segment, i) => (
                <span key={i}>
                  <span className="text-neutral-300">/</span>
                  <span
                    className={
                      segment.startsWith(':')
                        ? 'font-medium text-neutral-900'
                        : i === path.length - 1
                          ? 'text-neutral-900'
                          : 'text-neutral-400'
                    }
                  >
                    {segment}
                  </span>
                </span>
              ))}
            </span>
            <div className="ml-auto flex gap-2 text-neutral-400">
              <Code className="size-2.5" />
              <SlidersHorizontal className="size-2.5" />
              <Trash2 className="size-2.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </MockFrame>
)

export default NextLensMock
