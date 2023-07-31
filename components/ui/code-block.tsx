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
        "border rounded-lg p-4 overflow-auto bg-accent text-accent-foreground",
        className
      )}
    >
      <code>{children}</code>
    </div>
  );
};
