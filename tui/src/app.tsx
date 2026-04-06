import { useState } from "react"
import { useKeyboard, useRenderer } from "@opentui/react"
import { getTheme } from "./theme"
import { type Post } from "./data/posts"
import { Header } from "./components/header"
import { Nav } from "./components/nav"
import { Footer } from "./components/footer"
import { HomePage } from "./components/home-page"
import { BlogPage } from "./components/blog-page"
import { AboutPage } from "./components/about-page"

export function App() {
  const renderer = useRenderer()
  const theme = getTheme(renderer.themeMode)
  const [activeTab, setActiveTab] = useState(0)
  const [readingPost, setReadingPost] = useState<Post | null>(null)
  const tabCount = 3

  useKeyboard((key) => {
    if (key.name === "q" && !key.ctrl && !key.meta) {
      renderer.destroy()
    }
    if (key.ctrl && key.name === "c") {
      renderer.destroy()
    }
    if (!readingPost) {
      if (key.name === "left" || key.name === "h") {
        setReadingPost(null)
        setActiveTab((t) => (t - 1 + tabCount) % tabCount)
      }
      if (key.name === "right" || key.name === "l") {
        setReadingPost(null)
        setActiveTab((t) => (t + 1) % tabCount)
      }
    }
  })

  return (
    <box flexDirection="column" height="100%" width="100%">
      <Header theme={theme} />
      <Nav activeTab={activeTab} theme={theme} />
      <scrollbox flexGrow={1} focused={activeTab === 1 && !!readingPost}>
        {activeTab === 0 && <HomePage theme={theme} />}
        {activeTab === 1 && (
          <BlogPage
            theme={theme}
            readingPost={readingPost}
            onReadPost={setReadingPost}
          />
        )}
        {activeTab === 2 && <AboutPage theme={theme} />}
      </scrollbox>
      <Footer theme={theme} />
    </box>
  )
}
