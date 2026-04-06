import { AboutPage } from './components/about-page'
import { BlogPage } from './components/blog-page'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { HomePage } from './components/home-page'
import { Nav } from './components/nav'
import { type Post } from './data/posts'
import { getTheme } from './theme'
import { useKeyboard, useRenderer } from '@opentui/react'
import { useState } from 'react'

export function App() {
  const renderer = useRenderer()
  const theme = getTheme(renderer.themeMode)
  const [activeTab, setActiveTab] = useState(0)
  const [readingPost, setReadingPost] = useState<Post | null>(null)
  const tabCount = 3

  useKeyboard((key) => {
    if (key.name === 'q' && !key.ctrl && !key.meta) {
      renderer.destroy()
    }
    if (key.ctrl && key.name === 'c') {
      renderer.destroy()
    }
    if (!readingPost) {
      if (key.name === 'left' || key.name === 'h') {
        setActiveTab((t) => (t - 1 + tabCount) % tabCount)
      }
      if (key.name === 'right' || key.name === 'l') {
        setActiveTab((t) => (t + 1) % tabCount)
      }
    }
  })

  return (
    <box flexDirection="column" height="100%" width="100%">
      <Header theme={theme} />
      <Nav activeTab={activeTab} theme={theme} />
      <scrollbox flexGrow={1} focused={activeTab === 1 && !!readingPost}>
        {activeTab === 0 && <HomePage theme={theme} active />}
        {activeTab === 1 && (
          <BlogPage
            theme={theme}
            readingPost={readingPost}
            onReadPost={setReadingPost}
          />
        )}
        {activeTab === 2 && <AboutPage theme={theme} active />}
      </scrollbox>
      <Footer theme={theme} activeTab={activeTab} readingPost={!!readingPost} />
    </box>
  )
}
