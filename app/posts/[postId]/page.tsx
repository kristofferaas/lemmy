import { CommentList, commentFilterSchema } from "@/components/lemmy/comments";
import { Post, PostContent } from "@/components/lemmy/post";
import { Markdown } from "@/components/wysiwyg/markdown";
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
    <main className="container mb-20 h-full max-w-5xl space-y-4 pt-20">
      <Post postId={postId} />
      <PostContent postId={postId} />
    </main>
  );
}
