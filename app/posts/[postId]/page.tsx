import { CommentList, commentFilterSchema } from "@/components/lemmy/comments";
import { Post, PostContent } from "@/components/lemmy/post";
import { ErrorBoundary } from "react-error-boundary";
import { z } from "zod";

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export default async function PostPage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  const { postId } = paramsSchema.parse(params);
  const filter = commentFilterSchema.parse(searchParams);

  return (
    <main className="container h-full max-w-4xl space-y-4 py-4">
      <Post postId={postId} />
      <PostContent postId={postId} />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <CommentList postId={postId} filter={filter} />
      </ErrorBoundary>
    </main>
  );
}
