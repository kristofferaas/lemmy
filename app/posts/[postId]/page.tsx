import { CommentList } from "@/components/lemmy/comments";
import { Post, PostContent } from "@/components/lemmy/post";
import { z } from "zod";

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export default async function PostPage({ params }: { params: unknown }) {
  const { postId } = paramsSchema.parse(params);

  return (
    <main className="container max-w-5xl space-y-4 py-4">
      <Post postId={postId} />
      <PostContent postId={postId} />
      <CommentList postId={postId} />
    </main>
  );
}
