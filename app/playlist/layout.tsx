import { PropsWithChildren } from "react";
import { PAGE_INFO, SITE_INFO } from "@/const";
import { Layout } from "@/components";

const PAGE_NAME = PAGE_INFO.PLAYLIST.NAME;

export default function Page({ children }: PropsWithChildren) {
  return <Layout pageSubTitle={PAGE_NAME}>{children}</Layout>;
}

export const generateMetadata = async () => {
  const encStr = encodeURIComponent(PAGE_NAME);
  return {
    title: `${SITE_INFO.TITLE} | ${PAGE_NAME}`,
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
