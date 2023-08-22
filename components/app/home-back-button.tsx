"use client";

import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export function HomeBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Button size="icon" variant="ghost">
        <MenuIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button size="icon" variant="ghost" onClick={router.back}>
      <ArrowLeftIcon className="h-4 w-4" />
    </Button>
  );
}
