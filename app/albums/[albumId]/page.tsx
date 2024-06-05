import { getTheBethAlbum } from "@/utils/api";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { toJstDate } from "@/utils/format";
import { MusicTable } from "@/components";

type Props = {
  params: {
    albumId: string;
  };
};

export default async function Home({ params }: Props) {
  const album = await getTheBethAlbum(params.albumId);
  const musicLenght = album.musics.length;

  return (
    <>
      <div className="w-full">
        <div className="w-2/4 mx-auto">
          <Card className="w-full aspect-square relative">
            {!!album.image && (
              <Image
                className="w-full h-full object-cover"
                src={album.image.url}
                alt={album.title}
                fill
              />
            )}
          </Card>
        </div>
        <div className="grid mt-4">
          <h1 className="text-xl font-bold">{album.title}</h1>
          <div className="opacity-50 mt-1">
            {!!album.release_date && (
              <p>発売日: {toJstDate(album.release_date)}</p>
            )}
            <p>楽曲数: {musicLenght}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <MusicTable musics={album.musics} />
      </div>
    </>
  );
}
