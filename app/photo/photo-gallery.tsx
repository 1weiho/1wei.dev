'use client'

import GoogleMapUrl from '@/components/google-map-url'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
} from '@/components/ui/map'
import { Grid, MapIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type ImageData = {
  path: string
  description: string
  date: string
  latitude?: number
  longitude?: number
}

type PhotoGalleryProps = {
  images: ImageData[]
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

  const imagesWithLocation = images.filter(
    (image) => image.latitude && image.longitude,
  )

  // Calculate map center from all images with location
  const calculateCenter = (): [number, number] => {
    if (imagesWithLocation.length === 0) return [120.6417, 24.1784] // Default to Taichung

    const avgLng =
      imagesWithLocation.reduce((sum, img) => sum + (img.longitude || 0), 0) /
      imagesWithLocation.length
    const avgLat =
      imagesWithLocation.reduce((sum, img) => sum + (img.latitude || 0), 0) /
      imagesWithLocation.length

    return [avgLng, avgLat]
  }

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="flex justify-start mt-6 mb-8">
        <div className="relative inline-flex items-center bg-gray-100 rounded-full p-0.5">
          <div
            className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
              viewMode === 'grid' ? 'left-0.5' : 'left-1/2'
            }`}
          />

          <button
            onClick={() => setViewMode('grid')}
            className={`relative z-10 flex items-center justify-center px-4 py-1.5 rounded-full transition-colors duration-200 ${
              viewMode === 'grid'
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Grid view"
          >
            <Grid className="size-4" />
          </button>

          <button
            onClick={() => setViewMode('map')}
            className={`relative z-10 flex items-center justify-center px-4 py-1.5 rounded-full transition-colors duration-200 ${
              viewMode === 'map'
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Map view"
          >
            <MapIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
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
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="mt-8 h-[600px] rounded-lg overflow-hidden border">
          <Map center={calculateCenter()} zoom={4}>
            <MapControls showZoom showFullscreen />
            {imagesWithLocation.map((image, index) => (
              <MapMarker
                key={index}
                longitude={image.longitude!}
                latitude={image.latitude!}
              >
                <MarkerContent>
                  <div className="size-8 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Image
                      src={image.path}
                      alt={image.description}
                      width={32}
                      height={32}
                      className="object-cover size-full"
                    />
                  </div>
                </MarkerContent>
                <MarkerPopup className="p-0 w-64">
                  <div className="relative h-48 overflow-hidden rounded-t-md">
                    <Image
                      fill
                      src={image.path}
                      alt={image.description}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="font-medium text-sm">{image.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {image.date}
                    </p>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>
        </div>
      )}
    </div>
  )
}
