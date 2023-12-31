import { Balancer } from "react-wrap-balancer";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-bold",
      h4: "text-sm font-semibold",
      p: "text-sm font-normal text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type TypographyProps = VariantProps<typeof typographyVariants> & {
  className?: string;
  balance?: boolean;
  children: React.ReactNode;
};

export function Typography({
  variant,
  className,
  balance = false,
  children,
}: TypographyProps) {
  const TextElement = variant ?? "p";

  if (balance) {
    return (
      <Balancer
        as={TextElement}
        className={cn(typographyVariants({ variant, className }))}
      >
        {children}
      </Balancer>
    );
  }

  return (
    <TextElement className={cn(typographyVariants({ variant, className }))}>
      {children}
    </TextElement>
  );
}
