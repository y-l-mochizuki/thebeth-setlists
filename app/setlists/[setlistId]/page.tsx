import { getThebethSetlist } from "@/utils/api";
import Image from "next/image";

type Props = {
  params: {
    setlistId: string;
  };
};

export default async function Home({ params }: Props) {
  const setlist = await getThebethSetlist(params.setlistId);

  return (
    <main>
      {!!setlist.image && (
        <Image
          src={setlist.image.url}
          alt={setlist.title}
          width={setlist.image.width}
          height={setlist.image.height}
        />
      )}
      <h1>{setlist.title}</h1>
      {setlist.musics.map((music) => (
        <p key={music.id}>{music.title}</p>
      ))}
    </main>
  );
}
