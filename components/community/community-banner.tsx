import Avatar from "boring-avatars";
import { CommunityView } from "lemmy-js-client";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Typography } from "../ui/typography";

type CommunityBannerProps = CommunityView & {
  // TODO
};

export function CommunityBanner({ community }: CommunityBannerProps) {
  return (
    <div className="space-y-4">
      {community.banner && (
        <AspectRatio ratio={2.4}>
          <Image
            src={community.banner}
            alt="Profile banner"
            className="h-full w-full rounded-lg object-cover"
            width={864}
            height={360}
          />
        </AspectRatio>
      )}
      <div className="flex items-center space-x-4">
        <Avatar size={64} name={community.name} variant="marble" />
        <div>
          <h1 className="text-2xl">{community.name}</h1>
          <p className="text-sm text-muted-foreground">@{community.name}</p>
        </div>
      </div>
      {community.description && (
        <Typography>{community.description}</Typography>
      )}
    </div>
  );
}
