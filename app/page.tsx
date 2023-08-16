import { Filter } from "@/components/posts/filter";
import { Infinite } from "@/components/posts/infinite";
import { Suspense } from "react";
import { z } from "zod";

const searchParamsSchema = z.object({
  type: z.enum(["Posts", "Comments"]).optional(),
  from: z.enum(["All", "Subscribed", "Local"]).optional(),
  sort: z
    .enum([
      "Active",
      "Hot",
      "New",
      "Old",
      "TopDay",
      "TopWeek",
      "TopMonth",
      "TopYear",
      "TopAll",
      "MostComments",
      "NewComments",
      "TopHour",
      "TopSixHour",
      "TopTwelveHour",
      "TopThreeMonths",
      "TopSixMonths",
      "TopNineMonths",
      "Controversial",
    ])
    .optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const query = searchParamsSchema.parse(searchParams);

  return (
    <main className="flex h-full flex-col space-y-4 py-4">
      <Filter className="container max-w-5xl" value={query} />
      <Suspense fallback={<code>Loading...</code>}>
        <Infinite filter={query} />
      </Suspense>
    </main>
  );
}
