'use client'

import { useEffect, useRef, useState } from 'react'

type CopyButtonProps = {
  content: string
  className?: string
}

export default function CopyButton({ content, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      data-copied={copied ? 'true' : 'false'}
      className={
        'rounded-md border bg-white/70 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm transition ' +
        'hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
        'dark:bg-black/40 dark:text-gray-200 dark:hover:bg-black/60 ' +
        (className ? ' ' + className : '')
      }
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}


