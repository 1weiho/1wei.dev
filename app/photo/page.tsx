import images from './images.json'
import GoogleMapUrl from '@/components/google-map-url'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { generateOgImageUrl } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Photo | Yiwei Ho',
  description: 'Some memories I want to cherish.',
  openGraph: {
    title: 'Photo | Yiwei Ho',
    description: 'Some memories I want to cherish.',
    images: [{ url: generateOgImageUrl('Photo'), alt: '1wei.dev' }],
  },
}

const PhotoPage = () => {
  return (
    <div className="mt-20 md:mt-32 pb-20">
      <h1 className="text-2xl text-black">Photo</h1>
      <h2 className="mt-1 text-gray-500 text-sm">
        Some memories I want to cherish.
      </h2>

      <div className="mt-12 md:mt-20 grid md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {[...images].reverse().map((image, index) => (
          <div key={index}>
            <AspectRatio ratio={3 / 4}>
              <Image
                src={image.path}
                alt={image.description}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
                priority={index < 8}
              />
            </AspectRatio>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <p>{image.date}</p>
              {image.latitude && image.longitude && (
                <GoogleMapUrl
                  latitude={image.latitude}
                  longitude={image.longitude}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoPage
