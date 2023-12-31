/* eslint-disable @next/next/no-img-element */
import Avatar from "boring-avatars";
import { PersonView } from "lemmy-js-client";
import { Badge } from "../ui/badge";
import { AspectRatio } from "../ui/aspect-ratio";
import { Typography } from "../ui/typography";
import { RemoteImage } from "../ui/remote-image";
import { Skeleton } from "../ui/skeleton";
import { Suspense } from "react";

type UserBannerProps = PersonView & {
  // TODO
};

export function UserBanner({ person, counts }: UserBannerProps) {
  const headerName = person.display_name || person.name;
  const userHandle = person.name;

  return (
    <div className="space-y-4">
      {person.banner && (
        <AspectRatio ratio={2.4}>
          <Suspense
            fallback={<Skeleton className="h-full w-full rounded-lg" />}
          >
            <RemoteImage
              src={person.banner}
              alt="Profile banner"
              className="h-full w-full rounded-lg object-cover"
            />
          </Suspense>
        </AspectRatio>
      )}
      <div className="flex items-center space-x-4">
        <Avatar size={64} name={person.name} variant="beam" />
        <div>
          <h1 className="text-2xl">{headerName}</h1>
          <p className="text-sm text-muted-foreground">@{userHandle}</p>
        </div>
      </div>
      {person.bio && <Typography>{person.bio}</Typography>}
      <div className="flex items-center space-x-2">
        <Badge>{counts.post_count} posts</Badge>
        <Badge>{counts.comment_count} comments</Badge>
      </div>
    </div>
  );
}

export function UserBannerSkeleton() {
  return (
    <div>
      <AspectRatio ratio={2.4}>
        <Skeleton className="h-full w-full" />
      </AspectRatio>
    </div>
  );
}
