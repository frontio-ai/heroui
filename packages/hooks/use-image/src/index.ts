/**
 * Part of this code is taken from @chakra-ui/react package ❤️
 */

import type {ImgHTMLAttributes, SyntheticEvent} from "react";

import {useRef, useState, useEffect, useCallback} from "react";
import {useIsHydrated} from "@heroui/react-utils";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export interface UseImageProps {
  /**
   * The image `src` attribute
   */
  src?: string;
  /**
   * The image `srcset` attribute
   */
  srcSet?: string;
  /**
   * The image `sizes` attribute
   */
  sizes?: string;
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps["onLoad"];
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: NativeImageProps["onError"];
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean;
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: NativeImageProps["crossOrigin"];
  loading?: NativeImageProps["loading"];
}

type Status = "loading" | "failed" | "pending" | "loaded";

export type FallbackStrategy = "onError" | "beforeLoadOrError";

type ImageEvent = SyntheticEvent<HTMLImageElement, Event>;
/**
 * React hook that loads an image in the browser,
 * and lets us know the `status` so we can show image
 * fallback if it is still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */

export function useImage(props: UseImageProps = {}) {
  const {onLoad, onError, ignoreFallback, src, crossOrigin, srcSet, sizes, loading} = props;

  const isHydrated = useIsHydrated();

  const imageRef = useRef<HTMLImageElement | null>(isHydrated ? new Image() : null);

  const [status, setStatus] = useState<Status>("pending");

  useEffect(() => {
    if (!imageRef.current) return;
    imageRef.current.onload = (event) => {
      flush();
      setStatus("loaded");
      onLoad?.(event as unknown as ImageEvent);
    };
    imageRef.current.onerror = (error) => {
      flush();
      setStatus("failed");
      onError?.(error as any);
    };
  }, [imageRef.current]);

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  const load = useCallback((): Status => {
    if (!src) return "pending";
    if (ignoreFallback) return "loaded";

    const img = new Image();

    img.src = src;
    if (crossOrigin) img.crossOrigin = crossOrigin;
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (loading) img.loading = loading;

    imageRef.current = img;
    if (img.complete && img.naturalWidth) {
      return "loaded";
    }

    return "loading";
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);

  useSafeLayoutEffect(() => {
    if (isHydrated) {
      setStatus(load());
    }
  }, [isHydrated, load]);

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return ignoreFallback ? "loaded" : status;
}

export const shouldShowFallbackImage = (status: Status, fallbackStrategy: FallbackStrategy) =>
  (status !== "loaded" && fallbackStrategy === "beforeLoadOrError") ||
  (status === "failed" && fallbackStrategy === "onError");

export type UseImageReturn = ReturnType<typeof useImage>;
