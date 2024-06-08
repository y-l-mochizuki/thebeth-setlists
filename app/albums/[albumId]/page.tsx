import { getTheBethAlbum } from "@/utils/api";
import { DetailPage } from "@/components";

type Props = {
  params: {
    albumId: string;
  };
};

export default async function Home({ params }: Props) {
  const album = await getTheBethAlbum(params.albumId);
  return <DetailPage content={album} />;
}
