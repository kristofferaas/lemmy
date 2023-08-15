import { client } from "@/lib/client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ImageIcon,
  LinkIcon,
  MessageCircleIcon,
  TextIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { PostElement } from "../posts/post-element";
import { Markdown } from "../wysiwyg/markdown";

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

  return <PostElement {...post.post_view} />;
}

export async function PostContent({ postId }: PostProps) {
  const post = await client.getPost({ id: postId });
  const body = post.post_view.post.body;

  if (!body) {
    return null;
  }

  return (
    <div className="rounded-lg border p-4">
      <Markdown>{body}</Markdown>
    </div>
  );
}
