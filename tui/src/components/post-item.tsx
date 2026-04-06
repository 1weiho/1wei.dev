import { type Theme } from "../theme"
import { type Post } from "../data/posts"

export function PostItem({ post, theme }: { post: Post; theme: Theme }) {
  return (
    <box flexDirection="row" justifyContent="space-between" paddingY={0}>
      <text>
        <span fg={theme.fg}>{post.title}</span>
      </text>
      <text>
        <span fg={theme.fgMuted}>{post.date}</span>
      </text>
    </box>
  )
}
