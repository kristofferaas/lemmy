"use client";

import { ListFilterIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type AppFilterProps = {};

export function AppFilter({}: AppFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <ListFilterIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Top">
              <CommandItem>Top today</CommandItem>
              <CommandItem>Top week</CommandItem>
              <CommandItem>Top month</CommandItem>
              <CommandItem>Top all</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Show">
              <CommandItem>Everything</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
