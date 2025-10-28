// Image optimization utilities

export interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  quality?: number
}

export function getOptimizedImageUrl(src: string, width: number, height: number, quality = 75): string {
  // For production, integrate with image optimization service
  // This is a placeholder for Next.js Image Optimization
  return src
}

export function generateSrcSet(src: string, widths: number[]): string {
  return widths.map((width) => `${getOptimizedImageUrl(src, width, width)} ${width}w`).join(", ")
}

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 300 },
  hero: { width: 1200, height: 600 },
  gallery: { width: 800, height: 600 },
  blog: { width: 1200, height: 630 },
}
