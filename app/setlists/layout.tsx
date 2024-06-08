import { PropsWithChildren } from "react";
import { PAGE_INFO, SITE_INFO } from "@/const";
import { Layout } from "@/components";

export default function Page({ children }: PropsWithChildren) {
  return <Layout pageSubTitle={PAGE_INFO.SETLISTS.NAME}>{children}</Layout>;
}

export const generateMetadata = async () => {
  const encStr = encodeURIComponent(PAGE_INFO.SETLISTS.NAME);
  return {
    title: `${SITE_INFO.TITLE} | ${PAGE_INFO.SETLISTS.NAME}`,
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
