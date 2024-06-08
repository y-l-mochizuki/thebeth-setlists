import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SITE_INFO } from "@/const";

const inter = Inter({ subsets: ["latin"] });

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
        <NextUIProvider>{children}</NextUIProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}
