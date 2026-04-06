import { useState } from "react"
import { useKeyboard } from "@opentui/react"
import { type Theme } from "../theme"
import { posts, type Post } from "../data/posts"

function PostDetail({ post, theme }: { post: Post; theme: Theme }) {
  const paragraphs = post.content.split("\n\n")

  return (
    <box flexDirection="column" paddingX={2} paddingTop={1}>
      <text>
        <span fg={theme.fgMuted}>{"← Esc back"}</span>
      </text>

      <box marginTop={1}>
        <text fg={theme.fgBright}>
          <strong>{post.title}</strong>
        </text>
      </box>
      <text fg={theme.fgMuted}>{post.date}</text>

      <box flexDirection="column" marginTop={1}>
        {paragraphs.map((p, i) => {
          const isHeading =
            p === p.trim() &&
            !p.includes(". ") &&
            p.length < 60 &&
            !p.includes(",")
          return (
            <box key={i} marginTop={1}>
              {isHeading ? (
                <text fg={theme.fgBright}>
                  <strong>{p}</strong>
                </text>
              ) : (
                <text fg={theme.fg}>{p}</text>
              )}
            </box>
          )
        })}
      </box>
    </box>
  )
}

export function BlogPage({
  theme,
  readingPost,
  onReadPost,
}: {
  theme: Theme
  readingPost: Post | null
  onReadPost: (post: Post | null) => void
}) {
  const [selected, setSelected] = useState(0)

  useKeyboard((key) => {
    if (readingPost) {
      if (key.name === "escape") {
        onReadPost(null)
      }
      return
    }

    if (key.name === "down" || key.name === "j") {
      setSelected((s) => Math.min(s + 1, posts.length - 1))
    }
    if (key.name === "up" || key.name === "k") {
      setSelected((s) => Math.max(s - 1, 0))
    }
    if (key.name === "enter" || key.name === "return") {
      onReadPost(posts[selected]!)
    }
  })

  if (readingPost) {
    return <PostDetail post={readingPost} theme={theme} />
  }

  return (
    <box flexDirection="column" paddingX={2} paddingTop={1}>
      <text fg={theme.fgBright}>
        <strong>Blog</strong>
      </text>
      <text fg={theme.fgMuted}>
        Try to develop the habit of writing articles.
      </text>

      <box flexDirection="column" marginTop={1}>
        {posts.map((post, i) => (
          <box
            key={i}
            flexDirection="row"
            justifyContent="space-between"
            paddingY={0}
          >
            <text fg={i === selected ? theme.fgBright : theme.fgMuted}>
              {i === selected ? (
                <strong>{">"} {post.title}</strong>
              ) : (
                `  ${post.title}`
              )}
            </text>
            <text fg={theme.fgMuted}>{post.date}</text>
          </box>
        ))}
      </box>
    </box>
  )
}
