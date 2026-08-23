import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#ffffff',
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #d4d4d4',
            padding: '60px 60px 48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              letterSpacing: '-0.025em',
              fontStyle: 'normal',
              color: '#111111',
              lineHeight: '104px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'Instrument Serif',
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#737373',
              fontFamily: 'Instrument Serif',
            }}
          >
            1wei.dev
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Instrument Serif',
          data: await loadGoogleFont(
            'Instrument Serif',
            (title ?? '') + '1wei.dev',
          ),
          style: 'normal',
        },
      ],
    },
  )
}
