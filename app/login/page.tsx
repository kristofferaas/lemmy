import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { RedirectType } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";

const searchParamsSchema = z.object({
  error: z.string().optional(),
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const { error } = searchParamsSchema.parse(searchParams);

  return (
    <div className="flex flex-col h-full justify-center items-center space-y-4">
      <form className="flex flex-col space-y-4 w-72" action={login}>
        <Input name="username" type="text" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
        {error === "incorrect_login" && (
          <p className="text-red-500 text-sm">Incorrect username or password</p>
        )}
      </form>
      <Link
        className="text-muted-foreground text-center text-sm hover:underline"
        href="/sign-up"
      >
        Sign up
      </Link>
    </div>
  );
}

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const login = async (data: FormData) => {
  "use server";
  let token = "";
  try {
    const username = data.get("username");
    const password = data.get("password");
    const loginData = loginSchema.parse({ username, password });
    const response = await client.login({
      username_or_email: loginData.username,
      password: loginData.password,
    });
    const { jwt } = response;

    if (!jwt) {
      // TODO
      throw "TODO: handle response .registration_created and .verify_email_sent";
    }
    token = jwt;
  } catch (error) {
    token = "";
    switch (error) {
      case "incorrect_login": {
        return redirect("/login?error=incorrect_login", RedirectType.replace);
      }
      default: {
        console.warn("Unknown error:", error);
        return redirect("/login?error=unknown", RedirectType.replace);
      }
    }
  }
  cookies().set("token", token);
  return redirect("/", RedirectType.replace);
};
