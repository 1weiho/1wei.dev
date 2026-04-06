import { type Theme } from "../theme"

const tabs = ["Home", "Blog", "About"]

export function Nav({
  activeTab,
  theme,
}: {
  activeTab: number
  theme: Theme
}) {
  return (
    <box paddingX={2} paddingY={1} flexDirection="row" gap={3}>
      {tabs.map((tab, i) => (
        <text key={tab} fg={i === activeTab ? theme.fgBright : theme.fgMuted}>
          {i === activeTab ? <strong>{tab}</strong> : tab}
        </text>
      ))}
    </box>
  )
}
