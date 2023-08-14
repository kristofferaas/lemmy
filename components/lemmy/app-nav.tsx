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
import { LogOutIcon, Settings, UserIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";

export async function AppNav() {
  const jwt = cookies().get("token")?.value;

  return (
    <nav className="fixed z-10 flex h-14 w-screen border-b bg-background">
      <div className="container flex max-w-5xl items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">Lemmy</h1>
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
