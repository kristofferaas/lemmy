import { Comment, CommentList } from "@/components/lemmy/comments";
import { client } from "@/lib/client";
import { z } from "zod";

const searchParamsSchema = z.object({
  id: z.coerce.number(),
});

export default async function CommentPage({ params }: { params: unknown }) {
  const { id } = searchParamsSchema.parse(params);

  return (
    <main className="container max-w-5xl space-y-4 py-4">
      <Comment commentId={id} />
      <div className="ml-4">
        <CommentList parentId={id} />
      </div>
    </main>
  );
}
