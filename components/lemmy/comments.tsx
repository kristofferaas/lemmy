import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { client } from "@/lib/client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  PencilIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { z } from "zod";

type CommentListProps = {
  postId?: number;
  parentId?: number;
  filter?: CommentFilter;
};

export async function CommentList({
  postId,
  parentId,
  filter,
}: CommentListProps) {
  const { comments } = await client.getComments({
    post_id: postId,
    parent_id: parentId,
    max_depth: 1,
    sort: filter?.sort,
  });

  return (
    <ol className="space-y-4">
      {filter && <Filter value={filter} />}
      {comments.map((comment) => (
        <Comment key={comment.comment.id} commentId={comment.comment.id} />
      ))}
    </ol>
  );
}

type CommentProps = {
  commentId: number;
};

export async function Comment({ commentId }: CommentProps) {
  const { comment_view } = await client.getComment({ id: commentId });

  console.log(comment_view);

  return (
    <div className="border-l-2 space-y-4 pl-4">
      <div className="text-muted-foreground">
        by{" "}
        <Link
          href={`/users/${comment_view.creator.name}`}
          className="hover:underline"
        >
          {comment_view.creator.name}
        </Link>
      </div>
      <p>{comment_view.comment.content}</p>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          {comment_view.counts.upvotes}
          <ArrowUpIcon className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="sm">
          {comment_view.counts.downvotes}
          <ArrowDownIcon className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/comments/${comment_view.comment.id}`}>
            {comment_view.counts.child_count}
            <MessageCircleIcon className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          Reply
          <PencilIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export const commentFilterSchema = z.object({
  sort: z.enum(["Controversial", "Hot", "New", "Old", "Top"]).catch("Hot"),
});

type CommentFilter = z.infer<typeof commentFilterSchema>;

const Filter = ({ value }: { value: CommentFilter }) => {
  return (
    <form className="flex space-x-4">
      <Select name="sort" defaultValue={value.sort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Controversial">Controversial</SelectItem>
          <SelectItem value="Hot">Hot</SelectItem>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Old">Old</SelectItem>
          <SelectItem value="Top">Top</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="outline">
        Filter
      </Button>
    </form>
  );
};
