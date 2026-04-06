import { useState, useEffect } from "react"
import { useKeyboard } from "@opentui/react"
import { type Theme } from "../theme"

const links = [
  { label: "Web", url: "https://1wei.dev" },
  { label: "Links", url: "https://links.1wei.dev" },
  { label: "Twitter", url: "https://x.com/1weiho", display: "@1weiho" },
  { label: "GitHub", url: "https://github.com/1weiho", display: "1weiho" },
]

function Clock({ theme }: { theme: Theme }) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Taipei",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date())
      setTime(formatted)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <box flexDirection="row" gap={2} marginTop={1}>
      <text fg={theme.fgBright}>
        <strong>UTC+8</strong>
      </text>
      <text fg={theme.accent}>{time}</text>
    </box>
  )
}

export function AboutPage({ theme }: { theme: Theme }) {
  const [selected, setSelected] = useState(0)

  useKeyboard((key) => {
    if (key.name === "down" || key.name === "j") {
      setSelected((s) => Math.min(s + 1, links.length - 1))
    }
    if (key.name === "up" || key.name === "k") {
      setSelected((s) => Math.max(s - 1, 0))
    }
    if (key.name === "enter" || key.name === "return") {
      Bun.spawn(["open", links[selected]!.url])
    }
  })

  return (
    <box flexDirection="column" paddingX={2} paddingTop={1}>
      <text fg={theme.fgBright}>
        <strong>About</strong>
      </text>

      <box marginTop={1}>
        <text fg={theme.fg}>
          If you don't know where Taiwan is, here's a little reference for you, I
          live here :)
        </text>
      </box>

      <Clock theme={theme} />

      <box marginTop={2} flexDirection="column">
        <text fg={theme.fgBright}>
          <strong>Links</strong>
        </text>
        <box flexDirection="column" marginTop={1}>
          {links.map((link, i) => (
            <text key={i} fg={i === selected ? theme.fgBright : theme.fgMuted}>
              {i === selected ? (
                <strong>{">"} {link.label.padEnd(8)}{link.display ?? link.url}</strong>
              ) : (
                `  ${link.label.padEnd(8)}${link.display ?? link.url}`
              )}
            </text>
          ))}
        </box>
      </box>
    </box>
  )
}
