import { PostList } from "@/components/lemmy/post";
import { Filter } from "@/components/posts/filter";
import { Pagination } from "@/components/posts/pagination";
import { z } from "zod";

const searchParamsSchema = z.object({
  page: z.coerce.number().optional(),
  from: z.string().optional(),
  type: z.string().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const query = searchParamsSchema.parse(searchParams);

  return (
    <main className="container max-w-5xl py-4 space-y-4">
      <Filter value={query} />
      <PostList page={query.page} />
      <Pagination page={query.page} />
    </main>
  );
}
