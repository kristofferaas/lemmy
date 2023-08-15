/* eslint-disable @next/next/no-img-element */
"use client";

import { cache, use } from "react";

type RemoteImageProps = {
  className?: string;
  src: string;
  alt: string;
};

const cachedImage = cache((src: string) => {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(src);
    img.onerror = () => reject();
  });
});

export function RemoteImage({ className, src, alt }: RemoteImageProps) {
  /*
    This will cause react to throw an "Not implemented" error.
    It should be valid to suspend while loading images with `use` and `cache`.
  */
  use(cachedImage(src));

  return <img className={className} src={src} alt={alt} />;
}
