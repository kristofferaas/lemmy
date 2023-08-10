import Link from "next/link";
import { Button } from "../ui/button";
import { cookies } from "next/headers";
import { client } from "@/lib/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "boring-avatars";
import { LogOutIcon, Settings, UserIcon } from "lucide-react";

export async function AppNav() {
  const jwt = cookies().get("token")?.value;

  return (
    <>
      <nav className="fixed w-screen bg-background border-b h-14 flex">
        <div className="container max-w-5xl flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-xl">Lemmy</h1>
          </Link>
          {jwt ? (
            <User jwt={jwt} />
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </nav>
      <div className="h-14" />
    </>
  );
}

type UserProps = {
  jwt: string;
};

async function User({ jwt }: UserProps) {
  const { my_user } = await client.getSite({
    auth: jwt,
  });

  if (!my_user) {
    throw new Error("User not found");
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
        <Link href="/profile">
          <DropdownMenuItem>
            <UserIcon className="w-4 h-4 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/logout">
          <DropdownMenuItem>
            <LogOutIcon className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
