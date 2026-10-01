import { MockFrame, Pill, WindowBar } from './primitives'

const routes = [
  { method: 'GET', tone: 'sky', path: '/api/posts' },
  { method: 'POST', tone: 'emerald', path: '/api/posts' },
  { method: 'PATCH', tone: 'amber', path: '/api/posts/:id' },
  { method: 'DELETE', tone: 'rose', path: '/api/posts/:id' },
] as const

const NextLensMock = () => (
  <MockFrame>
    <WindowBar />
    <div className="flex flex-1 flex-col justify-center px-8 pb-6">
      <p className="text-sm font-semibold tracking-tight">API Routes</p>
      <div className="mt-3 divide-y divide-neutral-100">
        {routes.map(({ method, tone, path }) => (
          <div key={method} className="flex items-center gap-3 py-2.5">
            <Pill
              tone={tone}
              className="w-13 font-[family-name:var(--font-geist-mono)]"
            >
              {method}
            </Pill>
            <span className="font-[family-name:var(--font-geist-mono)] text-xs text-neutral-600">
              {path}
            </span>
          </div>
        ))}
      </div>
    </div>
  </MockFrame>
)

export default NextLensMock
