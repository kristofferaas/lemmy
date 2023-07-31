import { CodeBlock } from "@/components/ui/code-block";
import { client } from "@/lib/client";
import { z } from "zod";

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export default async function PostPage({ params }: { params: unknown }) {
  const { postId } = paramsSchema.parse(params);

  const post = await client.getPost({ id: postId });

  return (
    <main className="container max-w-5xl space-y-4 py-4">
      <h1 className="font-bold text-2xl">{post.post_view.post.name}</h1>
      <p>{post.post_view.post.body}</p>
      <CodeBlock className="max-h-[800px]">
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </CodeBlock>
    </main>
  );
}
