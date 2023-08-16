import { PostList } from "@/components/lemmy/post";
import { Filter } from "@/components/posts/filter";
import { filterSchema } from "@/lib/schema";

export default async function Home({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const query = filterSchema.parse(searchParams);

  return (
    <main className="flex h-full flex-col space-y-4 py-4">
      <Filter className="container max-w-5xl" value={query} />
      <PostList />
    </main>
  );
}
