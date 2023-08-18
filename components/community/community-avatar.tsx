import Avatar from "boring-avatars";
import { Community } from "lemmy-js-client";

type CommunityAvatarProps = {
  community: Community;
};

export function CommunityAvatar({ community }: CommunityAvatarProps) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar size={24} name={community.name} variant="marble" />
      <span className="text-sm text-muted-foreground">{community.name}</span>
    </div>
  );
}
