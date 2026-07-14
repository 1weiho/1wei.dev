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
        'rounded-md border border-black/10 bg-white/80 px-2 py-1 text-xs font-medium text-gray-600 shadow-xs backdrop-blur-sm transition-colors ' +
        'hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60' +
        (className ? ' ' + className : '')
      }
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}


