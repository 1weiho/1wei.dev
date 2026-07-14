'use client'

import { useEffect, useState } from 'react'

interface UTC8ClockProps {
  className?: string
}

const UTC8Clock = ({ className }: UTC8ClockProps) => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedTime = time
    ? new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Taipei',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(time)
    : '--:--:--'

  return (
    <div className={className}>
      <div className="flex items-center text-xs space-x-2">
        <p className="font-semibold">UTC+8</p>
        <p className="tabular-nums">{formattedTime}</p>
      </div>
    </div>
  )
}

export default UTC8Clock
