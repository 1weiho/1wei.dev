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
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'url(https://1wei.dev/assets/og-bg.png)',
        }}
      >
        <div
          style={{
            marginLeft: 100,
            marginRight: 205,
            marginBottom: 120,
            display: 'flex',
            fontSize: 80,
            letterSpacing: '-0.025em',
            fontStyle: 'normal',
            color: '#4F4F4F',
            lineHeight: '110px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'Instrument Serif',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Instrument Serif',
          data: await loadGoogleFont('Instrument Serif', title ?? ''),
          style: 'normal',
        },
      ],
    },
  )
}
