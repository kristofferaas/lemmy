import { CommunityBanner } from "@/components/community/community-banner";
import { VirtualCommunity } from "@/components/community/virtual-community";
import { client } from "@/lib/client";
import { Suspense } from "react";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.coerce.number(),
});

export default async function CommunityPage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  const { id } = paramsSchema.parse(params);
  const response = await client.getCommunity({ id });

  return (
    <main className="container my-4 max-w-5xl space-y-4">
      <Suspense fallback={<code>Loading...</code>}>
        <CommunityBanner {...response.community_view} />
        <VirtualCommunity id={id} />
      </Suspense>
    </main>
  );
}
