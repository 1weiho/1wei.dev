import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateOgImageUrl = (title: string) => {
  const baseUrl = 'https://1wei.dev/api/og'
  const encodedTitle = encodeURIComponent(title)
  return `${baseUrl}?title=${encodedTitle}`
}

export const parseUrl = (url: string, getDomain: boolean = false) => {
  try {
    const urlObj = new URL(url)
    return getDomain ? urlObj.hostname : url
  } catch {
    return url
  }
}
