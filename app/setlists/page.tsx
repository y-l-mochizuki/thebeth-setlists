import { Setlist, getTheBethSetlists } from "@/utils/api";
import { Button, Card, Link } from "@nextui-org/react";

import Image from "next/image";

export default async function Home() {
  const setlists = await getTheBethSetlists();
  return <Setlists setlists={setlists} />;
}

const Setlists = ({ setlists }: { setlists: Setlist[] }) => (
  <div className="w-full grid grid-cols-2 gap-4">
    {setlists.map((setlist) => (
      <Button
        className="grid h-auto bg-transparent border-0 p-0 justify-stretch rounded-none"
        as={Link}
        href={`/setlists/${setlist.id}`}
        key={setlist.id}
      >
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
        <h2 className="text-white font-bold">{setlist.title}</h2>
      </Button>
    ))}
  </div>
);
