import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Card, CardFooter, NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { PropsWithChildren } from "react";
import { Menu } from "@/components";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thebeth setlists",
  description: "thebeth setlists",
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={(inter.className, "relative")}>
        <NextUIProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </NextUIProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <Card
      isFooterBlurred
      radius="none"
      className="border-none bg-transparent sticky top-0 z-10"
    >
      <CardFooter className="before:bg-white/10 border-white/20 border-b overflow-hidden before:rounded-xl shadow-small p-0">
        <div className="w-full flex items-center justify-between max-w-sm mx-auto px-4 py-2">
          <Link className="text-tiny text-white/80" href="/">
            THE+BETH
          </Link>
          <Menu />
        </div>
      </CardFooter>
    </Card>
  );
};

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="max-w-sm mx-auto px-4 py-8 min-h-full">{children}</main>
  );
};

const Footer = () => {
  const packageJson = require("../package.json");
  return (
    <footer className="px-4 pb-4">
      <div className="text-right">
        <span className="opacity-50 text-xs">
          version: {packageJson.version}
        </span>
      </div>
    </footer>
  );
};
