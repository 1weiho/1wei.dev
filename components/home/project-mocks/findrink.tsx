import { MockFrame, SearchBar } from './primitives'

const menu = [
  { name: '茉莉綠茶', price: 30 },
  { name: '四季春青茶', price: 30 },
  { name: '珍珠奶茶', price: 50 },
  { name: '冬瓜檸檬', price: 45 },
]

const FindrinkMock = () => (
  <MockFrame>
    <SearchBar placeholder="搜尋品牌或飲料…" />
    <div className="flex flex-1 flex-col justify-center px-8">
      {menu.map(({ name, price }) => (
        <div
          key={name}
          className="flex items-center border-b border-neutral-100 py-2.5 text-xs last:border-0"
        >
          <span>{name}</span>
          <span className="ml-auto text-neutral-400 tabular-nums">
            ${price}
          </span>
        </div>
      ))}
    </div>
  </MockFrame>
)

export default FindrinkMock
