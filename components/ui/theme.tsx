"use client";

import {
  ChevronsUpDownIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Typography } from "./typography";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-40 justify-between">
          <ThemeSwitchItem theme={theme} />
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <ThemeSwitchItem theme="light" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <ThemeSwitchItem theme="dark" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <ThemeSwitchItem theme="system" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function ThemeSwitchItem({ theme }: { theme?: string }) {
  switch (theme) {
    case "light": {
      return (
        <>
          <SunIcon className="mr-4 h-4 w-4" />
          <Typography>Light</Typography>
        </>
      );
    }
    case "dark": {
      return (
        <>
          <MoonIcon className="mr-4 h-4 w-4" />
          <Typography>Dark</Typography>
        </>
      );
    }
    case "system": {
      return (
        <>
          <LaptopIcon className="mr-4 h-4 w-4" />
          <Typography>System</Typography>
        </>
      );
    }
    default: {
      throw new Error(`Unknown theme: ${theme}`);
    }
  }
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export { ThemeProvider };
