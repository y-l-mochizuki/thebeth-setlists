import { DetailPage } from "@/components";
import { PAGE_INFO, SITE_INFO } from "@/const";
import { getTheBethSetlist } from "@/utils/api";

type Props = {
  params: {
    setlistId: string;
  };
};

export default async function Home({ params }: Props) {
  const setlist = await getTheBethSetlist(params.setlistId);
  return <DetailPage content={setlist} />;
}

export const generateMetadata = async ({ params }: Props) => {
  const setlist = await getTheBethSetlist(params.setlistId);
  const encStr = encodeURIComponent(setlist.title);
  return {
    title: `${SITE_INFO.TITLE} | ${setlist.title}`,
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
