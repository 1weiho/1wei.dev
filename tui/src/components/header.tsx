import { type Theme } from '../theme'

const lines = [
  ' ___             _     _',
  '|_  |  _ _ _ ___|_|  _| |___ _ _',
  ' _| |_| | | | -_| |_| . | -_| | |',
  '|_____|_____|___|_|_|___|___|\\_/',
]

export function Header({ theme }: { theme: Theme }) {
  return (
    <box flexDirection="column" paddingX={2} paddingTop={1}>
      <text fg={theme.fg}>你好 👋</text>
      {lines.map((line, i) => (
        <text key={i} fg={theme.accent}>
          {line}
        </text>
      ))}
    </box>
  )
}
