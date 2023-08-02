import { Body, Footer, Header, Layout } from "@/components/ui/layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNav } from "@/components/lemmy/app-nav";
import { AppFooter } from "@/components/lemmy/app-footer";
import { ThemeProvider } from "@/components/ui/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Layout>
            <Header>
              <AppNav />
            </Header>
            <Body>{children}</Body>
            <Footer>
              <AppFooter />
            </Footer>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
