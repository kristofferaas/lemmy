import type { PostView } from "lemmy-js-client";
import { ArrowDownIcon, ArrowUpIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { CommunityAvatar } from "../community/community-avatar";
import { Button } from "../ui/button";
import { UserHandle } from "../user/user-handle";
import { Thumbnail } from "./thumbnail";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex h-28 space-x-4", className)}>
      <Thumbnail post={post} />
      <div className="flex flex-col justify-between space-y-2">
        <Link
          className="max-h-14 scroll-m-20 truncate text-lg font-semibold tracking-tight"
          href={`/posts/${post.id}`}
        >
          <Balancer>{post.name}</Balancer>
        </Link>
        <div className="flex items-center space-x-4">
          <UserHandle user={creator} />
          <Link
            className="hidden md:block"
            href={`/communities/${community.id}`}
          >
            <CommunityAvatar community={community} />
          </Link>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            {counts.upvotes}
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button className="hidden md:flex" variant="outline">
            {counts.downvotes}
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/posts/${post.id}`}>
              {counts.comments}
              <MessageCircleIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LoadingElement() {
  return <div></div>;
}
