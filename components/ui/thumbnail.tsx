/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ThumbnailProps = {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Thumbnail({ src, alt, className }: ThumbnailProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <img
          className={cn(
            "h-20 w-20 shrink-0 rounded-lg object-cover",
            className,
          )}
          src={src}
          alt={alt}
          width={56}
          height={56}
        />
      </DialogTrigger>
      <DialogContent>
        <img
          className="mt-6 max-h-full max-w-full rounded-lg"
          src={src}
          alt={alt}
        />
      </DialogContent>
    </Dialog>
  );
}
