import Link from "next/link";

export const AppNav = () => {
  return (
    <>
      <nav className="fixed w-screen bg-background border-b h-14 flex justify-center items-center">
        <Link href="/">
          <h1 className="font-bold text-2xl">Lemmy</h1>
        </Link>
      </nav>
      <div className="h-14" />
    </>
  );
};
