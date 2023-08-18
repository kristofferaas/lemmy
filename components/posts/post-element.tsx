import { formatDistanceStrict } from "date-fns";
import type { Post, PostAggregates, PostView } from "lemmy-js-client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  PencilIcon,
  PinIcon,
} from "lucide-react";
import Link from "next/link";
import { CommunityHandle } from "../community/community-handle";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { UserHandle } from "../user/user-handle";
import { Thumbnail } from "./thumbnail";

type PostElementProps = PostView & {};

export function PostElement({
  post,
  creator,
  community,
  counts,
}: PostElementProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <CommunityHandle community={community} />
        <PostMetaData post={post} />
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
      <PostActions post={post} counts={counts} />
    </div>
  );
}

function PostMetaData({ post }: { post: Post }) {
  const isFeatured = post.featured_community || post.featured_local;
  const isEdited = !!post.updated;

  const publishTime = formatDistanceStrict(
    new Date(post.published),
    new Date(),
    {
      addSuffix: true,
    },
  );

  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      {isFeatured && <PinIcon className="h-4 w-4" />}
      {isEdited && <PencilIcon className="h-4 w-4" />}
      <Typography variant="p">{publishTime}</Typography>
    </div>
  );
}

function PostActions({ post, counts }: { post: Post; counts: PostAggregates }) {
  return (
    <div className="flex items-center space-x-2">
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
  );
}

export function LoadingElement() {
  return <div></div>;
}
