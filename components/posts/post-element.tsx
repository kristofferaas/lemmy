import type { PostView } from "lemmy-js-client";
import { ArrowDownIcon, ArrowUpIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { CommunityAvatar } from "../community/community-avatar";
import { Button } from "../ui/button";
import { UserHandle } from "../user/user-handle";
import { Thumbnail } from "./thumbnail";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { CommunityHandle } from "../community/community-handle";

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
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {/* <UserHandle user={creator} /> */}
        <CommunityHandle community={community} />
        <Typography variant="p">
          1w ago
          {/* {post.published} */}
        </Typography>
      </div>
      <div className="flex h-20">
        <Thumbnail post={post} />
        <div className="ml-2 flex flex-col">
          <Link href={`/posts/${post.id}`} className="overflow-hidden">
            <Typography variant="h4" balance>
              {post.name}
            </Typography>
          </Link>
          <UserHandle user={creator} className="py-2" />
        </div>
      </div>
      <div className="space-x-2">
        <Button variant="outline" size="sm">
          {counts.upvotes}
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          {counts.downvotes}
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/posts/${post.id}`}>
            {counts.comments}
            <MessageCircleIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingElement() {
  return <div></div>;
}
