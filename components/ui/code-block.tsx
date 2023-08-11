import { cn } from "@/lib/utils";

export type CodeBlockProps = {
  className?: string;
  children: React.ReactNode;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "overflow-auto rounded-lg border bg-accent p-4 text-accent-foreground",
        className,
      )}
    >
      <code>{children}</code>
    </div>
  );
};
