import { client } from "@/lib/client";
import Link from "next/link";

export type PostListProps = {
  communityId?: number;
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

async function Post({ postId }: PostProps) {
  const post = await client.getPost({ id: postId });

  return (
    <Link
      className="border rounded-lg p-4 flex flex-col hover:bg-accent transition-colors"
      href={`/posts/${postId}`}
    >
      <h2 className="text-xl font-bold">{post.post_view.post.name}</h2>
      <div>
        by {post.post_view.creator.name} in {post.post_view.community.name}
      </div>
    </Link>
  );
}
