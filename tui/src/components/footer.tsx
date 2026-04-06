import { type Theme } from "../theme"

export function Footer({ theme }: { theme: Theme }) {
  return (
    <box
      flexDirection="row"
      justifyContent="space-between"
      paddingX={2}
      height={1}
    >
      <text>
        <span fg={theme.fgMuted}>q quit │ ←→ navigate</span>
      </text>
      <text>
        <span fg={theme.fgMuted}>1wei.dev</span>
      </text>
    </box>
  )
}
