import images from './images.json'
import PhotoGallery from './photo-gallery'
import { generateOgImageUrl } from '@/lib/utils'
import { Metadata } from 'next'

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

      <PhotoGallery images={images} />
    </div>
  )
}

export default PhotoPage
