import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thebeth setlists",
  description: "thebeth setlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={(inter.className, "relative")}>
        <Background />
        <NextUIProvider>
          <main className="max-w-sm mx-auto p-4">{children}</main>
        </NextUIProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}

const Background = () => (
  <div
    className="fixed w-full h-screen top-0 left-0 z-[-1]"
    style={{
      background:
        "radial-gradient(circle at top left, rgba(255, 0, 0, 0.2), transparent 50%), radial-gradient(circle at top right, rgba(128, 0, 128, 0.2), transparent 50%), radial-gradient(circle at bottom right, rgba(255, 165, 0, 0.2), transparent 50%), radial-gradient(circle at bottom left, rgba(255, 192, 203, 0.2), transparent 50%)",
    }}
  />
);
