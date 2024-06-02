import { getThebethSetlist } from "@/utils/api";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { MusicTable } from "./_components/MusicTable";
import { toJstDate } from "@/utils/format";

type Props = {
  params: {
    setlistId: string;
  };
};

export default async function Home({ params }: Props) {
  const setlist = await getThebethSetlist(params.setlistId);
  const musicLenght = setlist.musics.length;

  return (
    <>
      <div className="w-full">
        <div className="w-2/4 mx-auto">
          <Card className="w-full aspect-square relative">
            {!!setlist.image && (
              <Image
                className="w-full h-full object-cover"
                src={setlist.image.url}
                alt={setlist.title}
                fill
              />
            )}
          </Card>
        </div>
        <div className="grid mt-4">
          <h1 className="text-xl font-bold">{setlist.title}</h1>
          <div className="opacity-50 mt-1">
            {!!setlist.live_date && (
              <p>開催日: {toJstDate(setlist.live_date)}</p>
            )}
            <p>楽曲数: {musicLenght}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <MusicTable musics={setlist.musics} />
      </div>
    </>
  );
}
