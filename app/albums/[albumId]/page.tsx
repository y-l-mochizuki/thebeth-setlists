import { getTheBethAlbum } from "@/utils/api";
import { DetailPage } from "@/components";
import { SITE_INFO } from "@/const";

type Props = {
  params: {
    albumId: string;
  };
};

export default async function Home({ params }: Props) {
  const album = await getTheBethAlbum(params.albumId);
  return <DetailPage content={album} />;
}

export const generateMetadata = async ({ params }: Props) => {
  const album = await getTheBethAlbum(params.albumId);
  const encStr = encodeURIComponent(album.title);
  return {
    title: `${SITE_INFO.TITLE} | ${album.title}`,
    openGraph: {
      images: [`${SITE_INFO.DOMAIN}/api/ogp?title=${encStr}`],
    },
  };
};
