import { type Project } from '../data/projects'
import { type Theme } from '../theme'

export function ProjectItem({
  project,
  theme,
  selected,
}: {
  project: Project
  theme: Theme
  selected: boolean
}) {
  return (
    <box flexDirection="column" marginBottom={1}>
      <text fg={selected ? theme.fgBright : theme.fgMuted}>
        {selected ? (
          <strong>
            {'>'} {project.title}
          </strong>
        ) : (
          `  ${project.title}`
        )}
        <span fg={theme.fgMuted}> [{project.category}]</span>
      </text>
      <text fg={theme.fgMuted}> {project.description}</text>
      <text>
        <span fg={theme.link}>
          {'  '}
          <a href={project.url}>{project.url}</a>
        </span>
      </text>
    </box>
  )
}
