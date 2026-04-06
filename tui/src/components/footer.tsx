import { type Theme } from "../theme"

export function Footer({
  theme,
  activeTab,
  readingPost,
}: {
  theme: Theme
  activeTab: number
  readingPost: boolean
}) {
  let hints = "q quit │ ←→ switch tab │ ↑↓ select │ ⏎ open"
  if (activeTab === 1 && readingPost) {
    hints = "q quit │ Esc back │ ↑↓ scroll"
  }

  return (
    <box
      flexDirection="row"
      justifyContent="space-between"
      paddingX={2}
      height={1}
    >
      <text>
        <span fg={theme.fgMuted}>{hints}</span>
      </text>
      <text>
        <span fg={theme.fgMuted}>1wei.dev</span>
      </text>
    </box>
  )
}
