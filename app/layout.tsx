import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { Menu } from "@/app/_root/_components";

const inter = Inter({ subsets: ["latin"] });

const SITE_INFO = {
  TITLE: "THE+BETH SETLISTS",
};

export const metadata: Metadata = {
  title: SITE_INFO.TITLE,
  description: SITE_INFO.TITLE,
  openGraph: {
    title: SITE_INFO.TITLE,
    siteName: SITE_INFO.TITLE,
    type: "website",
    images: ["https://thebeth-setlists.vercel.app/api/ogp"],
  },
  twitter: {
    card: "summary_large_image",
  },
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
    <>
      <div className="h-[40px]" />
      <div className="z-10 w-full h-auto fixed top-0 inset-x-0 backdrop-blur-md bg-content1 bg-opacity-50">
        <div className="w-full flex items-center justify-between max-w-sm mx-auto px-4 py-2">
          <Link className="text-tiny text-white/95" href="/">
            THE+BETH
          </Link>
          <Menu />
        </div>
      </div>
    </>
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
