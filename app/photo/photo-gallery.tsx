'use client'

import GoogleMapUrl from '@/components/google-map-url'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Map,
  MapMarker,
  MarkerContent,
  MapPopup,
  MapControls,
  useMap,
} from '@/components/ui/map'
import { Grid, MapIcon, Maximize, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useCallback } from 'react'

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
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(null)

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
            <PhotoMarkers
              images={imagesWithLocation}
              onFullscreen={setFullscreenImage}
            />
          </Map>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-in fade-in-0 duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="size-6" />
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenImage.path}
              alt={fullscreenImage.description}
              width={1200}
              height={1600}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="font-medium">{fullscreenImage.description}</p>
              <p className="text-sm text-white/70">{fullscreenImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PhotoMarkers({
  images,
  onFullscreen,
}: {
  images: ImageData[]
  onFullscreen: (image: ImageData) => void
}) {
  const { map } = useMap()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMarkerClick = useCallback(
    (image: ImageData, index: number) => {
      if (!map) return

      // Close any open popup first
      setActiveIndex(null)

      const container = map.getContainer()
      const height = container.clientHeight

      // Fly to the marker position
      // padding.top = height/2 positions the target at 75% from top (y: 3/4)
      map.flyTo({
        center: [image.longitude!, image.latitude!],
        zoom: 8,
        padding: { top: height / 2 },
        duration: 800,
      })

      // Open popup after fly animation completes
      map.once('moveend', () => {
        setActiveIndex(index)
      })
    },
    [map],
  )

  const activeImage = activeIndex !== null ? images[activeIndex] : null

  return (
    <>
      {images.map((image, index) => (
        <MapMarker
          key={index}
          longitude={image.longitude!}
          latitude={image.latitude!}
          onClick={() => handleMarkerClick(image, index)}
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
        </MapMarker>
      ))}

      {activeImage && (
        <MapPopup
          longitude={activeImage.longitude!}
          latitude={activeImage.latitude!}
          onClose={() => setActiveIndex(null)}
          className="!p-0 !border-0 !bg-transparent !shadow-none w-[300px] focus:outline-none cursor-default"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl ring-4 ring-white group isolate">
            <Image
              fill
              src={activeImage.path}
              alt={activeImage.description}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end gap-1.5 text-white transform transition-transform duration-500 group-hover:translate-y-[-4px]">
              <div className="flex items-center justify-between opacity-80 mix-blend-screen">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/90">
                  {activeImage.date.replace(/-/g, '.')}
                </span>
              </div>
              <h3 className="font-medium text-lg leading-tight tracking-wider text-white drop-shadow-md">
                {activeImage.description}
              </h3>
            </div>

            <button
              onClick={() => onFullscreen(activeImage)}
              className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              aria-label="View fullscreen"
            >
              <Maximize className="size-4 drop-shadow-md" />
            </button>
          </div>
        </MapPopup>
      )}
    </>
  )
}
