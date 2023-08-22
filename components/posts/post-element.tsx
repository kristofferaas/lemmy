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
import { CommunityHoverCard } from "../community/community-hover-card";

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
        <CommunityHoverCard community={community}>
          <Link href={`/communities/${community.id}`}>
            <CommunityHandle community={community} />
          </Link>
        </CommunityHoverCard>
        <PostMetaData post={post} />
      </div>
      <Link href={`/posts/${post.id}`} className="flex h-20">
        <Thumbnail post={post} />
        <Typography variant="h4" balance className="my-2 ml-2">
          {post.name}
        </Typography>
      </Link>
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
