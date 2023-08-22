"use client";

import { Post } from "lemmy-js-client";
import { ImageIcon, LinkIcon, TextIcon } from "lucide-react";
import { RemoteImage } from "../ui/remote-image";
import { Suspense } from "react";

export function Thumbnail({ post }: { post: Post }) {
  const type = post.thumbnail_url ? "image" : post.url ? "link" : "text";

  return (
    <Suspense fallback={<ThumbnailPlaceholder type={type} />}>
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
        {type === "image" && (
          <RemoteImage
            className="h-full w-full object-cover"
            src={post.thumbnail_url!}
            alt={post.name}
          />
        )}
        {type === "link" && (
          <LinkIcon className="h-6 w-6 text-muted-foreground" />
        )}
        {type === "text" && (
          <TextIcon className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
    </Suspense>
  );
}

function ThumbnailPlaceholder({ type }: { type: "image" | "link" | "text" }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
      {type === "image" && (
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      )}
      {type === "link" && (
        <LinkIcon className="h-6 w-6 text-muted-foreground" />
      )}
      {type === "text" && (
        <TextIcon className="h-6 w-6 text-muted-foreground" />
      )}
    </div>
  );
}
