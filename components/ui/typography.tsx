import { Balancer } from "react-wrap-balancer";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      normal: "text-sm font-normal text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "normal",
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
  balance = true,
  children,
}: TypographyProps) {
  return (
    <p className={cn(typographyVariants({ variant, className }))}>
      {balance ? <Balancer>{children}</Balancer> : children}
    </p>
  );
}
