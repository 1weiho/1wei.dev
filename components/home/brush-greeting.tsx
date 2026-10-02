import { GREETING } from '@/components/home/greeting-strokes'
import type { CSSProperties } from 'react'

// Brush diameter in glyph units; each stroke's outline clips it, so it only
// has to be wide enough to cover the thickest part of any stroke
const BRUSH = 200
const START_DELAY = 0.3
// Seconds per glyph unit of travel, plus a fixed cost for setting the brush
// down, so long sweeps take longer than dots without dragging on
const SPEED = 1 / 4000
const PRESS = 0.1
const STROKE_GAP = 0.05
const CHAR_GAP = 0.15

// Lay every stroke out on one timeline so the characters are written in
// order, one stroke after another
let time = START_DELAY
const characters = GREETING.map((character, charIndex) => {
  if (charIndex > 0) time += CHAR_GAP - STROKE_GAP
  const strokes = character.strokes.map((stroke) => {
    const duration = PRESS + stroke.length * SPEED
    const timing = { ...stroke, delay: time, duration }
    time += duration + STROKE_GAP
    return timing
  })
  return { char: character.char, strokes }
})
const WRITTEN_AT = time

const BrushGreeting = () => (
  <h1
    aria-label="你好"
    className="flex items-center text-2xl md:text-3xl text-black"
  >
    {characters.map(({ char, strokes }, charIndex) => (
      <svg
        key={char}
        aria-hidden
        viewBox="0 0 1024 1024"
        className="size-[1.1em] shrink-0"
      >
        <g transform="translate(0 900) scale(1 -1)">
          {strokes.map((stroke, strokeIndex) => {
            const id = `brush-greeting-${charIndex}-${strokeIndex}`
            return (
              <g key={id}>
                <clipPath id={id}>
                  <path d={stroke.outline} />
                </clipPath>
                <path
                  d={stroke.median}
                  clipPath={`url(#${id})`}
                  className="brush-stroke"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={BRUSH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={
                    {
                      '--length': stroke.length,
                      '--brush': BRUSH,
                      animationDelay: `${stroke.delay}s`,
                      animationDuration: `${stroke.duration}s`,
                    } as CSSProperties
                  }
                />
              </g>
            )
          })}
        </g>
      </svg>
    ))}
    <span
      aria-hidden
      className="brush-greeting-wave ml-2"
      style={{ animationDelay: `${WRITTEN_AT}s` }}
    >
      👋
    </span>
  </h1>
)

export default BrushGreeting
