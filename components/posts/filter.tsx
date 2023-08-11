import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

type FilterProps = {
  value?: {
    type?: string;
    from?: string;
  };
};

export async function Filter({ value }: FilterProps) {
  return (
    <form className="flex space-x-4">
      <Select name="type">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" defaultValue={value?.type} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="post">Posts</SelectItem>
          <SelectItem value="comment">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select name="from">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="From" defaultValue={value?.type} />
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
