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
  const title = searchParams.get('title') ?? '1wei.dev'
  const monoText = '1wei.devFULL STACK DEVELOPER '

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0a0a0a',
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #262626',
            padding: '52px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 26,
                color: '#fafafa',
                fontFamily: 'Geist Mono',
                letterSpacing: '0.1em',
              }}
            >
              1wei.dev
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#525252',
                fontFamily: 'Geist Mono',
                letterSpacing: '0.2em',
              }}
            >
              FULL STACK DEVELOPER
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              letterSpacing: '-0.02em',
              color: '#fafafa',
              lineHeight: 1.1,
              whiteSpace: 'pre-wrap',
              fontFamily: 'Instrument Serif',
              maxWidth: 960,
            }}
          >
            {title}
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
          data: await loadGoogleFont('Instrument Serif', title),
          style: 'normal',
        },
        {
          name: 'Geist Mono',
          data: await loadGoogleFont('Geist+Mono', monoText),
          style: 'normal',
        },
      ],
    },
  )
}
