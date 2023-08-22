"use client";

import { ArrowUpIcon } from "lucide-react";
import { Typography } from "../ui/typography";
import { useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";

type BackToTopProps = {};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function BackToTop({}: BackToTopProps) {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={cn(
        "fixed left-1/2 z-10 flex -translate-x-1/2 -translate-y-16 rounded-full bg-secondary px-4 py-2 drop-shadow-lg transition-transform",
        {
          "translate-y-0": show,
        },
      )}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="mr-2 h-4 w-4" />
      <Typography className="text-xs text-secondary-foreground">
        Back to top
      </Typography>
    </button>
  );
}
