"use client";

import ReactMarkdown, { Components } from "react-markdown";
import { Typography } from "../ui/typography";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown className="space-y-4" components={markdownComponents}>
      {children}
    </ReactMarkdown>
  );
}

const markdownComponents = {
  p: ({ children }) => <Typography>{children}</Typography>,
  a: ({ children, href }) => (
    <a
      className="text-blue-400 hover:underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
} satisfies Components;
