import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Avatar from "boring-avatars";
import { Community } from "lemmy-js-client";
import { AspectRatio } from "../ui/aspect-ratio";
import { Typography } from "../ui/typography";

type CommunityHoverCard = {
  community: Community;
  children?: React.ReactNode;
};

export function CommunityHoverCard({
  community,
  children,
}: CommunityHoverCard) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent className="space-y-4">
          {community.banner && (
            <AspectRatio ratio={2.4}>
              <img
                src={community.banner}
                className="h-full w-full rounded-lg object-cover"
              />
            </AspectRatio>
          )}
          <div className="flex items-center space-x-4">
            <Avatar size={48} name={community.name} variant="marble" />
            <div>
              <h1 className="text-lg">{community.title}</h1>
              <p className="text-sm text-muted-foreground">@{community.name}</p>
            </div>
          </div>
          {community.description && (
            <div className="flex items-center space-x-2 overflow-hidden">
              <Typography>{community.description}</Typography>
            </div>
          )}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}
