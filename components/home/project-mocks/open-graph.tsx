import { MockFrame, RaycastBar, RaycastFooter } from './primitives'

const tags = [
  { key: 'title', value: 'Yiwei Ho' },
  { key: 'description', value: 'Full-stack developer from Taiwan…' },
  { key: 'og:title', value: 'Yiwei Ho' },
  { key: 'og:image', value: 'https://1wei.dev/api/og…' },
  { key: 'twitter:card', value: 'summary_large_image' },
]

const OpenGraphMock = () => (
  <MockFrame>
    <RaycastBar query="https://1wei.dev" />
    <div className="flex min-h-0 flex-1">
      <div className="w-[58%] shrink-0 p-3">
        <div className="flex aspect-[1200/630] flex-col justify-between rounded-md bg-neutral-900 p-3">
          <span className="size-3 rounded-full bg-neutral-600" />
          <span className="font-[family-name:var(--font-instrument-serif)] text-xl leading-none text-white">
            1wei.dev
          </span>
        </div>
        <p className="mt-2.5 text-xs font-semibold">Yiwei Ho</p>
        <p className="mt-0.5 line-clamp-2 text-2xs text-neutral-500">
          Full-stack developer from Taiwan with a passion for crafting seamless
          user experiences and building scalable systems.
        </p>
      </div>
      <div className="min-w-0 flex-1 space-y-2 overflow-hidden border-l border-neutral-100 p-3">
        {tags.map(({ key, value }) => (
          <div key={key}>
            <p className="text-2xs text-neutral-400">{key}</p>
            <p className="truncate text-2xs">{value}</p>
          </div>
        ))}
      </div>
    </div>
    <RaycastFooter title="Open Graph" action="Open in Browser" />
  </MockFrame>
)

export default OpenGraphMock
