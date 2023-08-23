import { BackToTop } from "@/components/app/back-to-top";
import { Filter } from "@/components/posts/filter";
import { InfinitePosts } from "@/components/posts/infinite-posts";
import { PostElementSkeleton } from "@/components/posts/post-element";
import { Skeleton } from "@/components/ui/skeleton";
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
      <Suspense fallback={<PostListSkeleton />}>
        <BackToTop />
        <InfinitePosts filter={query} />
      </Suspense>
    </main>
  );
}

const PostListSkeleton = () => {
  return (
    <div className="space-y-12">
      {Array.from({ length: 10 }).map((_, i) => (
        <PostElementSkeleton key={i} />
      ))}
    </div>
  );
};
