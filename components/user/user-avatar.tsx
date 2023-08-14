import Avatar from "boring-avatars";
import { Person } from "lemmy-js-client";

type UserAvatarProps = {
  user: Person;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar size={24} name={user.name} variant="beam" />
      <span className="text-muted-foreground text-sm">{user.name}</span>
    </div>
  );
}
