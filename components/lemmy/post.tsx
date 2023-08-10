/* eslint-disable @next/next/no-img-element */
import { client } from "@/lib/client";
import {
  ArrowBigUpIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ImageIcon,
  LinkIcon,
  MessageCircleIcon,
  TextIcon,
} from "lucide-react";
import Link from "next/link";
import { Thumbnail } from "../ui/thumbnail";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type PostListProps = {
  communityId?: number;
  page?: number;
};

export async function PostList(props: PostListProps) {
  const posts = await client.getPosts({
    community_id: props.communityId,
    page: props.page,
  });

  return (
    <div className="space-y-8">
      {posts.posts.map((view) => (
        <Post key={view.post.id} postId={view.post.id} />
      ))}
    </div>
  );
}

type PostProps = {
  postId: number;
};

export async function Post({ postId }: PostProps) {
  const post = await client.getPost({ id: postId });

  return (
    <div className="flex space-x-4">
      <PostThumbnail postId={postId} />
      <div className="flex flex-col space-y-2">
        <Link className="font-bold" href={`posts/${post.post_view.post.id}`}>
          {post.post_view.post.name}
        </Link>
        <div className="text-muted-foreground">
          by{" "}
          <Link
            className="hover:underline"
            href={`/users/${post.post_view.creator.id}`}
          >
            {post.post_view.creator.name}
          </Link>{" "}
          in{" "}
          <Link
            className="hover:underline"
            href={`/communities/${post.post_view.community.name}`}
          >
            {post.post_view.community.name}
          </Link>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            {post.post_view.counts.upvotes}
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline">
            {post.post_view.counts.downvotes}
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/posts/${post.post_view.post.id}`}>
              {post.post_view.counts.comments}
              <MessageCircleIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

const PostThumbnail = async ({ postId }: PostProps) => {
  const { post_view } = await client.getPost({ id: postId });

  const type = post_view.post.thumbnail_url
    ? "image"
    : post_view.post.url
    ? "link"
    : "text";

  switch (type) {
    case "image": {
      return (
        <div className="w-20 h-20 shrink-0 bg-muted rounded-lg flex justify-center items-center">
          <ImageIcon className="w-6 h-6 text-muted-foreground" />
        </div>
      );
    }
    case "link": {
      return (
        <div className="w-20 h-20 shrink-0 bg-muted rounded-lg flex justify-center items-center">
          <LinkIcon className="w-6 h-6 text-muted-foreground" />
        </div>
      );
    }
    case "text": {
      return (
        <div className="w-20 h-20 shrink-0 bg-muted rounded-lg flex justify-center items-center">
          <TextIcon className="w-6 h-6 text-muted-foreground" />
        </div>
      );
    }
  }
};

export async function PostContent({ postId }: PostProps) {
  const post = await client.getPost({ id: postId });
  const body = post.post_view.post.body;

  if (!body) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4">
      <p>{body}</p>
    </div>
  );
}
