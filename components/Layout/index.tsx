import React, { PropsWithChildren } from "react";
import { Menu, ScrollRef } from "./components";
import { SITE_INFO } from "@/const";
import Link from "next/link";

type Props = PropsWithChildren<{
  pageSubTitle?: string;
}>;
export const Layout = ({ pageSubTitle, children }: Props) => {
  const title = pageSubTitle
    ? `${SITE_INFO.TITLE} | ${pageSubTitle}`
    : SITE_INFO.TITLE;
  return (
    <>
      <ScrollRef />
      <Header title={title} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <div className="h-[40px]" />
      <div className="z-10 w-full h-auto fixed top-0 inset-x-0 backdrop-blur-md bg-content1 bg-opacity-50">
        <div className="w-full flex items-center justify-between max-w-sm mx-auto px-4 py-2">
          <Link className="text-sm text-white/95 font-bold" href="/">
            {title}
          </Link>
          <Menu />
        </div>
      </div>
    </>
  );
};

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="max-w-sm mx-auto p-4 pb-8 min-h-full">{children}</main>
  );
};

const Footer = () => {
  const packageJson = require("@/package.json");
  return (
    <footer className="px-4 pb-4">
      <div className="text-center">
        <span className="opacity-50 text-xs">
          version: {packageJson.version}
        </span>
      </div>
    </footer>
  );
};
