import { Filter } from "@/components/posts/filter";
import { InfinitePosts } from "@/components/posts/infinite-posts";
import { filterSchema } from "@/lib/schema";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const query = filterSchema.parse(searchParams);

  return (
    <main className="container my-4 max-w-4xl space-y-4">
      <Suspense fallback={<code>Loading...</code>}>
        <Filter value={query} />
        <InfinitePosts filter={query} />
      </Suspense>
    </main>
  );
}
