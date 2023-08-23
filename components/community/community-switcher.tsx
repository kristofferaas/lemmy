"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  BookmarkIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  Globe2Icon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { z } from "zod";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Typography } from "../ui/typography";
import { CommunityHandle } from "./community-handle";
import { useCommunity } from "./use-community";
import { usePost } from "../posts/use-post";
import { Skeleton } from "../ui/skeleton";

const listSchema = z.enum(["local", "fediverse", "subscribed"]).nullable();

type CommunitySwitcherProps = {};

export function CommunitySwitcher({}: CommunitySwitcherProps) {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const list = searchParams.get("list");
  const pathname = usePathname();
  const value = useMemo(() => {
    const [slug, idSlug] = pathname.split("/").filter(Boolean);
    const listType = listSchema.parse(list) || "local";

    const type = slug || (listType && "list");
    const id = idSlug || listType;

    if (!type || !id) return null;
    switch (type) {
      case "communities": {
        return { type, id: Number(id) };
      }
      case "posts": {
        return { type, id: Number(id) };
      }
      case "list": {
        return {
          type: "list",
          id: listType,
        } as const;
      }
      default: {
        return null;
      }
    }
  }, [pathname, list]);

  return (
    <Suspense fallback={<Skeleton className="h-10 w-60 rounded-md" />}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className="w-60 justify-between"
          >
            {value?.type === "communities" && <CommunityItem id={value.id} />}
            {value?.type === "posts" && <CommunityPostItem id={value.id} />}
            {value?.type === "list" && <ListItem type={value.id} />}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0">
          <Command>
            <CommandList>
              <CommandGroup heading="Lists">
                <Link href="/?list=fediverse">
                  <CommandItem>
                    <ListItem type="fediverse" />
                  </CommandItem>
                </Link>
                <Link href="/?list=local">
                  <CommandItem>
                    <ListItem type="local" />
                  </CommandItem>
                </Link>
                {/* <Link href="/?list=subscribed">
                  <CommandItem>
                    <ListItem type="subscribed" />
                  </CommandItem>
                </Link> */}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Suspense>
  );
}

const LoadingSwitcher = () => {
  return (
    <Button
      variant="outline"
      aria-label="Select a team"
      className="w-[200px] justify-between"
    ></Button>
  );
};

const ListItem = ({ type }: { type: "local" | "fediverse" | "subscribed" }) => {
  switch (type) {
    case "local": {
      return (
        <>
          <HomeIcon className="mr-2 h-4 w-4" />
          <Typography>Local</Typography>
        </>
      );
    }
    case "fediverse": {
      return (
        <>
          <Globe2Icon className="mr-2 h-4 w-4" />
          <Typography>Fediverse</Typography>
        </>
      );
    }
    case "subscribed": {
      return (
        <>
          <BookmarkIcon className="mr-2 h-4 w-4" />
          <Typography>Subscribed</Typography>
        </>
      );
    }
  }
};

const CommunityItem = ({ id }: { id: number }) => {
  const [community] = useCommunity(id);

  return (
    <CommunityHandle
      community={community.community_view.community}
      className="w-full"
    />
  );
};

const CommunityPostItem = ({ id }: { id: number }) => {
  const [data] = usePost(id);

  return (
    <CommunityHandle
      community={data.community_view.community}
      className="w-full"
    />
  );
};
