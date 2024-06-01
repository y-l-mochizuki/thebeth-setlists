import { getThebethSetlist } from "@/utils/api";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { MusicTable } from "./_components/MusicTable";

type Props = {
  params: {
    setlistId: string;
  };
};

export default async function Home({ params }: Props) {
  const setlist = await getThebethSetlist(params.setlistId);

  return (
    <div>
      <div className="w-full py-8">
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
        <h1 className="text-xl font-bold text-center mt-4">{setlist.title}</h1>
      </div>
      <MusicTable musics={setlist.musics} />
    </div>
  );
}
