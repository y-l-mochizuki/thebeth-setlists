import { PropsWithChildren } from "react";
import { PAGE_INFO, SITE_INFO } from "@/const";
import { Layout } from "@/components";
import { notFound } from "next/navigation";

export default function Page({ children }: PropsWithChildren) {
  // TODO: 管理者以外はアクセスできないようにする
  // notFound();
  return <Layout pageSubTitle={PAGE_INFO.ADMIN.NAME}>{children}</Layout>;
}

export const generateMetadata = async () => {
  const encStr = encodeURIComponent(PAGE_INFO.ADMIN.NAME);
  return {
    title: `${SITE_INFO.TITLE} | ${PAGE_INFO.ADMIN.NAME}`,
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
