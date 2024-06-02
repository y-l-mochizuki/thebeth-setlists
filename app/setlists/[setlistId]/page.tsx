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
    <div>
      <div className="w-full">
        <div className="w-2/4 mx-auto">
          <Card className="w-full aspect-square">
            {!!setlist.image && (
              <Image
                className="w-full height-full"
                src={setlist.image.url}
                alt={setlist.title}
                width={setlist.image.width}
                height={setlist.image.height}
              />
            )}
          </Card>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold">{setlist.title}</h1>
          {!!setlist.live_date && (
            <p className="opacity-50 mt-1">
              {toJstDate(setlist.live_date)} / 全{musicLenght}曲
            </p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <MusicTable musics={setlist.musics} />
      </div>
    </div>
  );
}
