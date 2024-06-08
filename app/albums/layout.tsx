import { PropsWithChildren } from "react";
import { PAGE_INFO, SITE_INFO } from "@/const";
import { Layout } from "@/components";

export default function Page({ children }: PropsWithChildren) {
  return <Layout pageSubTitle={PAGE_INFO.ALBUMS.NAME}>{children}</Layout>;
}

export const generateMetadata = async () => {
  const encStr = encodeURIComponent(PAGE_INFO.ALBUMS.NAME);
  return {
    title: `${SITE_INFO.TITLE} | ${PAGE_INFO.ALBUMS.NAME}`,
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
