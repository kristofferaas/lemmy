"use client";

import { client } from "@/lib/client";
import { Filter } from "@/lib/schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useRef } from "react";
import { PostElement } from "./post-element";

type InfinitePostsProps = {
  className?: string;
  filter?: Filter;
};

export function InfinitePosts({ className, filter }: InfinitePostsProps) {
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

  const parentOffsetRef = useRef(0);

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  // The virtualizer
  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => 208,
    scrollMargin: parentOffsetRef.current,
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

  const yTranslateStart =
    (virtualItems[0]?.start ?? 0) - rowVirtualizer.options.scrollMargin;

  return (
    <div ref={parentRef}>
      {/* The large inner element to hold all of the items */}
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
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
                style={{
                  height: `${virtualRow.size}px`,
                }}
              >
                {isLoaderRow
                  ? hasNextPage
                    ? "Loading more..."
                    : "Nothing more to load"
                  : post && <PostElement {...post} />}
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
    type_: toType(filter?.list),
    community_id: filter?.communityId,
  });
  return { rows: res.posts, nextOffset: page + 1 };
};

const toType = (type: unknown) => {
  switch (type) {
    case "local": {
      return "Local";
    }
    case "fediverse": {
      return "All";
    }
    case "subscribed": {
      return "Subscribed";
    }
    default: {
      return undefined;
    }
  }
};
