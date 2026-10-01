import { BrowserBar, MockFrame, Pill } from './primitives'
import { cn } from '@/lib/utils'
import { BadgeCheck, ChevronDown, CupSoda, Heart, Search } from 'lucide-react'

const categories = ['原葉茶選', '奶香茶飲', '果韻茶飲', '季節限定']

const menu = [
  { name: '茉莉綠茶', m: 30, l: 35 },
  { name: '四季春青茶', m: 30, l: 35 },
  { name: '阿里山烏龍', m: 40, l: 45 },
  { name: '熟成紅茶', m: 30, l: 35 },
  { name: '冬瓜檸檬', m: 45, l: 50 },
  { name: '蜜香紅茶', m: 35, l: 40 },
]

const FindrinkMock = () => (
  <MockFrame>
    <BrowserBar url="findrink.tw" />
    <div className="min-h-0 flex-1 overflow-hidden p-4">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-md bg-neutral-900">
          <CupSoda className="size-4 text-white" />
        </span>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold">找茶</span>
            <Pill tone="sky" className="gap-0.5">
              <BadgeCheck className="size-2.5" />
              官方合作品牌
            </Pill>
          </div>
          <p className="text-2xs text-neutral-400">
            23 間門市 · 菜單更新於 3 天前
          </p>
        </div>
        <Heart className="ml-auto size-3.5 text-neutral-400" />
      </div>
      <div className="mt-3 flex gap-2">
        <div className="flex h-6 flex-1 items-center gap-1.5 rounded-full px-2.5 text-2xs text-neutral-400 ring-1 ring-neutral-200">
          <Search className="size-2.5" />
          搜尋飲品…
        </div>
        <div className="flex h-6 w-16 items-center justify-between rounded-full px-2.5 text-2xs ring-1 ring-neutral-200">
          北部
          <ChevronDown className="size-2.5 text-neutral-400" />
        </div>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {categories.map((category, i) => (
          <span
            key={category}
            className={cn(
              'rounded-full px-2 py-0.5 text-2xs',
              i === 0
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-500',
            )}
          >
            {category}
          </span>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        {menu.map(({ name, m, l }) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-md px-2.5 py-1.5 ring-1 ring-neutral-100"
          >
            <span className="text-2xs font-medium">{name}</span>
            <span className="flex gap-1.5 text-2xs text-neutral-500 tabular-nums">
              <span>
                <span className="text-neutral-300">M</span> ${m}
              </span>
              <span>
                <span className="text-neutral-300">L</span> ${l}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  </MockFrame>
)

export default FindrinkMock
