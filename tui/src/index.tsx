import { App } from './app'
import { createCliRenderer } from '@opentui/core'
import { createRoot } from '@opentui/react'

const renderer = await createCliRenderer({ exitOnCtrlC: false })
createRoot(renderer).render(<App />)
