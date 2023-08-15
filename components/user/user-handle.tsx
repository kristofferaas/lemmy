import Avatar from "boring-avatars";
import { Person } from "lemmy-js-client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";

type UserHandleProps = {
  user: Person;
};

export function UserHandle({ user }: UserHandleProps) {
  const person = user;
  const headerName = person.display_name || person.name;
  const userHandle = person.name;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href={`/users/${user.id}`}
          className="flex items-center space-x-2"
        >
          <Avatar size={24} name={user.name} variant="beam" />
          <span className="text-sm text-muted-foreground">{headerName}</span>
        </Link>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent className="space-y-4">
          {user.banner && (
            <AspectRatio ratio={2.4}>
              <img
                src={user.banner}
                className="h-full w-full rounded-lg object-cover"
              />
            </AspectRatio>
          )}
          <div className="flex items-center space-x-4">
            <Avatar size={48} name={person.name} variant="beam" />
            <div>
              <h1 className="text-lg">{headerName}</h1>
              <p className="text-sm text-muted-foreground">@{userHandle}</p>
            </div>
          </div>
          {person.bio && (
            <div className="flex items-center space-x-2 overflow-hidden">
              <Typography>{person.bio}</Typography>
            </div>
          )}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}
