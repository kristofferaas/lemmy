import type { PostView } from "lemmy-js-client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
} from "lucide-react";
import Link from "next/link";
import { CommunityAvatar } from "../community/community-avatar";
import { Button } from "../ui/button";
import { UserHandle } from "../user/user-handle";
import { Thumbnail } from "./thumbnail";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { CommunityHandle } from "../community/community-handle";
import { formatDistanceStrict } from "date-fns";

type PostElementProps = PostView & {
  className?: string;
};

export function PostElement({
  className,
  post,
  creator,
  community,
  counts,
}: PostElementProps) {
  const postTime = formatDistanceStrict(new Date(post.published), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <CommunityHandle community={community} />
        <Typography variant="p">{postTime}</Typography>
      </div>
      <div className="flex h-20">
        <Thumbnail post={post} />
        <div className="my-1 ml-4 flex flex-col space-y-1">
          <Link href={`/posts/${post.id}`} className="overflow-hidden">
            <Typography variant="h4" balance>
              {post.name}
            </Typography>
          </Link>
          <UserHandle user={creator} />
        </div>
      </div>
      <div className="space-x-2">
        <Button variant="outline">
          <ArrowUpIcon className="mr-2 h-4 w-4" />
          {counts.upvotes}
        </Button>
        <Button variant="outline">
          <ArrowDownIcon className="mr-2 h-4 w-4" />
          {counts.downvotes}
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/posts/${post.id}`}>
            <MessageCircleIcon className="mr-2 h-4 w-4" />
            {counts.comments}
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function LoadingElement() {
  return <div></div>;
}
