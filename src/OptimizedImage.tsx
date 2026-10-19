import type { ImgHTMLAttributes } from 'react';
import imageManifest from './image-manifest.json';

const images: Record<string, { src: string; srcSet: string; width: number; height: number }> = imageManifest;

/** Local originals map to responsive WebP assets; remote avatars pass through. */
export default function OptimizedImage({ src, sizes = '100vw', loading = 'lazy', decoding = 'async', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? images[src] : undefined;
  return (
    <img
      width={image?.width}
      height={image?.height}
      {...props}
      src={image?.src ?? src}
      srcSet={image?.srcSet}
      sizes={image ? sizes : undefined}
      loading={loading}
      decoding={decoding}
    />
  );
}
