/* eslint-disable @next/next/no-img-element */
import { client } from "@/lib/client";
import {
  ArrowBigUpIcon
} from "lucide-react";
import Link from "next/link";

export type PostListProps = {
  communityId?: number;
  page?: number;
};

export async function PostList(props: PostListProps) {
  const posts = await client.getPosts({
    community_id: props.communityId,
  });

  return (
    <div className="space-y-4">
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

  const thumbnail = post.post_view.post.thumbnail_url;

  return (
    <Link
      className="border rounded-lg p-4 flex space-x-4 hover:bg-accent transition-colors"
      href={`/posts/${postId}`}
    >
      <div className="w-10 shrink-0">
        <ArrowBigUpIcon className="w-6 h-6 mx-auto" />
        <div className="w-full text-center">{post.post_view.counts.score}</div>
      </div>
      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          width={56}
          height={56}
          className="w-14 h-14 object-cover"
        />
      )}
      <div className="flex flex-col">
        <h2 className="font-bold">{post.post_view.post.name}</h2>
        <div className="text-muted-foreground">
          by {post.post_view.creator.name} in {post.post_view.community.name} -{" "}
          {post.post_view.counts.comments} comments
        </div>
      </div>
    </Link>
  );
}

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
