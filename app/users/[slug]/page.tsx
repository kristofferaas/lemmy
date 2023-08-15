import { UserBanner } from "@/components/user/user-banner";
import { client } from "@/lib/client";
import { z } from "zod";

const paramsSchema = z.object({
  slug: z.coerce.number(),
});

export default async function UserPage({ params }: { params: unknown }) {
  const { slug } = paramsSchema.parse(params);

  const user = await client.getPersonDetails({
    person_id: slug,
  });

  return (
    <main className="container max-w-5xl space-y-4 pt-20">
      <UserBanner {...user.person_view} />
    </main>
  );
}
