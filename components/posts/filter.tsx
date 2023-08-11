import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type FilterProps = {
  className?: string;
  value?: {
    type?: string;
    from?: string;
  };
};

export async function Filter({ className, value }: FilterProps) {
  return (
    <form className={cn("flex space-x-4", className)}>
      <Select name="type" defaultValue={value?.type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="post">Posts</SelectItem>
          <SelectItem value="comment">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select name="from" defaultValue={value?.from}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="From" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="subscribed">Subscribed</SelectItem>
          <SelectItem value="local">Local</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Filter</Button>
    </form>
  );
}
