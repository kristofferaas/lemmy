"use client";

import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useRef } from "react";
import { PostElement } from "../posts/post-element";
import { Filter } from "@/lib/schema";

type VirtualCommunityProps = {
  className?: string;
  id: number;
};

export function VirtualCommunity({ className, id }: VirtualCommunityProps) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["posts", id],
    (ctx) => getPostPage(ctx.pageParam, { communityId: id }),
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      suspense: true,
    },
  );

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  // The scrollable element for your list
  const parentRef = useRef<HTMLDivElement>(null);

  const parentOffsetRef = useRef(0);

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  // The virtualizer
  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => 128,
    scrollMargin: parentOffsetRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

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

  const yTranslateStart =
    (virtualItems[0]?.start ?? 0) - virtualizer.options.scrollMargin;

  return (
    <div ref={parentRef}>
      {/* The large inner element to hold all of the items */}
      <div
        className="relative w-full"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <div
          className="absolute left-0 top-0 w-full"
          style={{
            transform: `translateY(${yTranslateStart}px)`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const post = allRows[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
              >
                {isLoaderRow
                  ? hasNextPage
                    ? "Loading more..."
                    : "Nothing more to load"
                  : post && (
                      <PostElement {...post} />
                    )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const getPostPage = async (page: number, filter?: Filter) => {
  const res = await client.getPosts({
    page,
    type_: filter?.from,
    community_id: filter?.communityId,
  });
  return { rows: res.posts, nextOffset: page + 1 };
};
