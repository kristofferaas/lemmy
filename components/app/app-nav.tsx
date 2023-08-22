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

export async function AppNav() {
  return (
    <>
      <nav className="fixed z-50 flex h-14 w-screen shrink-0 border-b bg-background">
        <div className="container flex max-w-4xl items-center space-x-2 px-1">
          <HomeBackButton />
          <CommunitySwitcher />
          <span className="flex-1" />
          <Button size="icon" variant="ghost">
            <ListFilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </nav>
      <div className="h-14 w-screen shrink-0" />
    </>
  );
}

async function User() {
  const jwt = cookies().get("token")?.value;

  const { my_user } = await client.getSite({
    auth: jwt,
  });

  if (!my_user) {
    return (
      <Button variant="outline" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  const { local_user_view } = my_user;
  const displayName = local_user_view.person.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          size={32}
          name={displayName}
          variant="beam"
          colors={["#2197A3", "#F71E6C", "#F07868", "#EBB970", "#E7D3B0"]}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${displayName}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/logout">
          <DropdownMenuItem>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
