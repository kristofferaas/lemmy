import { ThemeSelect } from "../ui/theme";

export const AppFooter = () => {
  return (
    <div className="mt-8 flex flex-col border-t">
      <div className="container flex max-w-5xl flex-col space-y-8 py-8 md:flex-row md:justify-between md:space-y-0">
        <AppearanceColumn />
      </div>
      <span className="self-center py-8 text-sm text-muted-foreground">
        © 2023 Acme Inc. All rights reserved.
      </span>
    </div>
  );
};

const AppearanceColumn = () => {
  return (
    <div className="flex flex-col space-y-2">
      <ThemeSelect />
    </div>
  );
};
