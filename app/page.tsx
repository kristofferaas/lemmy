import { PostList } from "@/components/lemmy/post";

export default async function Home() {
  return (
    <main className="container max-w-5xl py-4">
      <PostList />
    </main>
  );
}
