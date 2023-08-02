import { client } from "@/lib/client";
import Link from "next/link";
import { CodeBlock } from "../ui/code-block";
import { Button } from "../ui/button";
import {
  ArrowBigDownIcon,
  ArrowBigUpIcon,
  MessageCircleIcon,
} from "lucide-react";

type CommentListProps = {
  postId: number;
};

export async function CommentList(props: CommentListProps) {
  const { comments } = await client.getComments({
    post_id: props.postId,
    max_depth: 1,
  });

  return (
    <ol className="space-y-4">
      <div>{comments.length} comments</div>
      {comments.map((comment) => (
        <Comment key={comment.comment.id} commentId={comment.comment.id} />
      ))}
    </ol>
  );
}

type CommentProps = {
  commentId: number;
};

async function Comment({ commentId }: CommentProps) {
  const comment = await client.getComment({ id: commentId });

  return (
    <li className="border-l-4 space-y-4 pl-4">
      <div className="text-muted-foreground">
        by{" "}
        <Link
          href={`/users/${comment.comment_view.creator.name}`}
          className="hover:underline"
        >
          {comment.comment_view.creator.name}
        </Link>
      </div>
      <p>{comment.comment_view.comment.content}</p>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          {comment.comment_view.counts.upvotes}
          <ArrowBigUpIcon className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="sm">
          {comment.comment_view.counts.downvotes}
          <ArrowBigDownIcon className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="sm">
          {comment.comment_view.counts.child_count}
          <MessageCircleIcon className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="sm">
          Reply
        </Button>
      </div>
    </li>
  );
}
