import { MockFrame, SearchBar } from './primitives'

const OpenGraphMock = () => (
  <MockFrame>
    <SearchBar query="https://1wei.dev" />
    <div className="flex flex-1 items-center justify-center px-20">
      <div className="w-full overflow-hidden rounded-lg ring-1 ring-neutral-200">
        <div className="flex aspect-[1200/630] items-center justify-center bg-neutral-900">
          <span className="font-[family-name:var(--font-instrument-serif)] text-xl text-white">
            1wei.dev
          </span>
        </div>
        <div className="px-3.5 py-2.5">
          <p className="text-xs font-medium">Yiwei Ho</p>
          <p className="text-2xs text-neutral-400">1wei.dev</p>
        </div>
      </div>
    </div>
  </MockFrame>
)

export default OpenGraphMock
