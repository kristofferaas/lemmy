import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import Avatar from "boring-avatars";
import { Community } from "lemmy-js-client";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Typography } from "../ui/typography";

type CommunityHandleProps = {
  community: Community;
  className?: string;
};

export function CommunityHandle({
  community,
  className,
}: CommunityHandleProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Avatar size={20} name={community.name} variant="marble" />
      <Typography>{community.name}</Typography>
    </div>
  );
}
