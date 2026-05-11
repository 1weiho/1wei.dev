import { projects } from '../data/projects'
import { type Theme } from '../theme'
import { ProjectItem } from './project-item'
import { useKeyboard, useTerminalDimensions } from '@opentui/react'
import { useState } from 'react'

export function HomePage({ theme, active }: { theme: Theme; active: boolean }) {
  const { width } = useTerminalDimensions()
  const dividerWidth = Math.max(width - 6, 20)
  const [selected, setSelected] = useState(0)

  useKeyboard((key) => {
    if (!active) return
    if (key.name === 'down' || key.name === 'j') {
      setSelected((s) => Math.min(s + 1, projects.length - 1))
    }
    if (key.name === 'up' || key.name === 'k') {
      setSelected((s) => Math.max(s - 1, 0))
    }
    if (key.name === 'enter' || key.name === 'return') {
      Bun.spawn(['open', projects[selected]!.url])
    }
  })

  return (
    <box flexDirection="column" paddingX={2} paddingTop={1}>
      <text fg={theme.fg}>
        I am currently a backend developer at Microprogram, where we have built
        a world-class public bike-sharing system in Taiwan. I have a passion for
        exploring new frontend and backend technologies, and I am deeply
        inspired by beautiful and innovative designs.
      </text>

      <box flexDirection="row" gap={4} marginTop={1}>
        <text>
          <span fg={theme.fgMuted}>Twitter </span>
          <span fg={theme.link}>
            <a href="https://x.com/1weiho">@1weiho</a>
          </span>
        </text>
        <text>
          <span fg={theme.fgMuted}>GitHub </span>
          <span fg={theme.link}>
            <a href="https://github.com/1weiho">1weiho</a>
          </span>
        </text>
      </box>

      <box marginY={1}>
        <text fg={theme.border}>{'─'.repeat(dividerWidth)}</text>
      </box>

      <text fg={theme.fgBright}>
        <strong>Projects</strong>
      </text>

      <box flexDirection="column" marginTop={1}>
        {projects.map((project, i) => (
          <ProjectItem
            key={i}
            project={project}
            theme={theme}
            selected={i === selected}
          />
        ))}
      </box>
    </box>
  )
}
