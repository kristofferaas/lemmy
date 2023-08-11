import {
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type PaginationProps = {
  page?: number;
};

export function Pagination({ page = 1 }: PaginationProps) {
  const prevPage = Math.max(page - 1, 1);
  const nextPage = Math.max(page + 1, 1);

  return (
    <div className="flex justify-center space-x-4">
      <Button variant="outline" size="icon" asChild>
        <Link href={`?page=1`}>
          <ArrowLeftToLineIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <Link href={`?page=${prevPage}`}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <Link href={`?page=${nextPage}`}>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
