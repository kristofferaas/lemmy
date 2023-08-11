type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className="flex h-screen flex-col">{children}</div>;
};

export const Header = ({ children }: LayoutProps) => {
  return <header className="flex-shrink-0">{children}</header>;
};

export const Body = ({ children }: LayoutProps) => {
  return <main className="flex-grow">{children}</main>;
};

export const Footer = ({ children }: LayoutProps) => {
  return <footer className="flex-shrink-0">{children}</footer>;
};
