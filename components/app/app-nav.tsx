import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { client } from "@/lib/client";
import Avatar from "boring-avatars";
import {
  ArrowLeftIcon,
  ListFilterIcon,
  LogOutIcon,
  Settings,
  UserIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import { CommunitySwitcher } from "../community/community-switcher";
import { HomeBackButton } from "./home-back-button";
import { AppFilter } from "./app-filter";

export async function AppNav() {
  const jwt = cookies().get("token")?.value;
  const { my_user } = await client.getSite({
    auth: jwt,
  });

  return (
    <>
      <nav className="fixed z-50 flex h-14 w-screen shrink-0 border-b bg-background">
        <div className="container flex max-w-4xl items-center space-x-2 px-1">
          <HomeBackButton myUser={my_user} />
          <CommunitySwitcher />
          <span className="flex-1" />
          <AppFilter />
        </div>
      </nav>
      <div className="h-14 w-screen shrink-0" />
    </>
  );
}
