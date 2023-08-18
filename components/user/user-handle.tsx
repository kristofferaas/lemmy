import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Avatar from "boring-avatars";
import { Person } from "lemmy-js-client";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import { BotIcon } from "lucide-react";

type UserHandleProps = {
  user: Person;
  className?: string;
};

export function UserHandle({ user, className }: UserHandleProps) {
  const person = user;
  const headerName = person.display_name || person.name;
  const userHandle = person.name;
  const isBot = person.bot_account;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href={`/users/${user.id}`}
          className={cn("flex items-center space-x-2", className)}
        >
          <Avatar size={24} name={user.name} variant="beam" />
          <span className="text-sm text-muted-foreground">{headerName}</span>
          {isBot && <BotIcon className="h-4 w-4 text-muted-foreground" />}
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
