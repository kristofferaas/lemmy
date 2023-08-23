"use client";

import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { MyUserInfo } from "lemmy-js-client";
import Link from "next/link";
import { Button } from "../ui/button";
import { CodeBlock } from "../ui/code-block";
import { UserHandle } from "../user/user-handle";
import { ThemeSwitcher } from "../ui/theme";

export function AppSheet({ myUser }: { myUser?: MyUserInfo }) {
  return (
    <SheetContent side="left">
      <SheetTitle>Lemmy</SheetTitle>
      {myUser ? (
        <div className="my-4 space-y-4">
          <UserHandle user={myUser.local_user_view.person} />
          <ThemeSwitcher />
        </div>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </SheetContent>
  );
}
