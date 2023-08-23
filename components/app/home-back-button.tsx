"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MyUserInfo } from "lemmy-js-client";
import { AppSheet } from "./app-sheet";

export function HomeBackButton({ myUser }: { myUser?: MyUserInfo }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname !== "/") {
    return (
      <Button size="icon" variant="ghost" onClick={router.back}>
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <AppSheet myUser={myUser} />
    </Sheet>
  );
}
