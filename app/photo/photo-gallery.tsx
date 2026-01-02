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
      <div className="flex gap-1 mt-6">
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
            viewMode === 'grid'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Grid className="size-4" />
          Grid
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
            viewMode === 'map'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <MapIcon className="size-4" />
          Map
        </button>
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
          <Map center={calculateCenter()} zoom={5}>
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
