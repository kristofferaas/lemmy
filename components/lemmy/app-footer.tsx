import { ThemeSelect } from "../ui/theme";

export const AppFooter = () => {
  return (
    <div className="border-t flex flex-col mt-8">
      <div className="container max-w-5xl py-8 space-y-8 flex flex-col md:flex-row md:space-y-0 md:justify-between">
        <AppearanceColumn />
      </div>
      <span className="self-center py-8 text-muted-foreground text-sm">
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
