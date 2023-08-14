import { PostList } from "@/components/lemmy/post";
import { CodeBlock } from "@/components/ui/code-block";
import { client } from "@/lib/client";
import { z } from "zod";

const paramsSchema = z.object({
  slug: z.string(),
});

export default async function CommunityPage({ params }: { params: unknown }) {
  const { slug } = paramsSchema.parse(params);
  const community = await client.getCommunity({ name: slug });

  return (
    <main className="container max-w-5xl py-4">
      <h1 className="text-2xl font-bold">
        {community.community_view.community.title}
      </h1>
      <PostList communityId={community.community_view.community.id} />
    </main>
  );
}
