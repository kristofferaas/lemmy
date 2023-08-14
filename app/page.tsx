import { Filter } from "@/components/posts/filter";
import { Infinite } from "@/components/posts/infinite";
import { Suspense } from "react";
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
    <main className="container flex h-full max-w-5xl flex-col">
      <Suspense fallback={<code>Loading...</code>}>
        <Infinite className="pt-4"/>
      </Suspense>
    </main>
  );
}
