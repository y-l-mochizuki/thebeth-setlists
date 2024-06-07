import { PropsWithChildren } from "react";
import { SITE_INFO } from "@/const";

export default function Page({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export const generateMetadata = async () => {
  const encStr = encodeURIComponent("ALBUMS");
  return {
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
