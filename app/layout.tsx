import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { PropsWithChildren } from "react";

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
          <Main>{children}</Main>
          <Footer />
        </NextUIProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}

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
