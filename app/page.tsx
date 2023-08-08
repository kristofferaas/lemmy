import { PostList } from "@/components/lemmy/post";
import { z } from "zod";

const searchParamsSchema = z.object({
  page: z.coerce.number().optional(),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

export default async function Home({ params }: { params: unknown }) {
  const { page } = searchParamsSchema.parse(params);

  return (
    <main className="container max-w-5xl py-4">
      <PostList page={page} />
    </main>
  );
}

function Pagination({ page }: SearchParams) {}
