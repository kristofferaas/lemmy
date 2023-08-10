/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          className={cn("w-20 h-20 shrink-0 object-cover rounded-lg", className)}
          src={src}
          alt={alt}
          width={56}
          height={56}
        />
      </DialogTrigger>
      <DialogContent>
        <img
          className="max-w-full max-h-full mt-6 rounded-lg"
          src={src}
          alt={alt}
        />
      </DialogContent>
    </Dialog>
  );
}
