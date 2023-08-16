"use client";

import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { PostElement } from "./post-element";
import { FilterValue } from "./filter";

type InfiniteProps = {
  className?: string;
  filter?: FilterValue;
};

export function Infinite({ className, filter }: InfiniteProps) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["posts", filter],
    (ctx) => getPostPage(ctx.pageParam, filter),
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      suspense: true,
    },
  );

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  // The scrollable element for your list
  const parentRef = useRef<HTMLDivElement>(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 128,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems.at(-1);

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  return (
    <div ref={parentRef} className={cn("h-full overflow-auto", className)}>
      {/* The large inner element to hold all of the items */}
      <div
        className="relative h-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {virtualItems.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const post = allRows[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              className="t-0 l-0 absolute w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow
                ? hasNextPage
                  ? "Loading more..."
                  : "Nothing more to load"
                : post && (
                    <PostElement className="container max-w-5xl" {...post} />
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const getPostPage = async (page: number, filter?: FilterValue) => {
  const res = await client.getPosts({ page, type_: filter?.from });
  return { rows: res.posts, nextOffset: page + 1 };
};
