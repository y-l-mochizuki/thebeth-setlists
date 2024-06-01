import { getTheBethSetlists } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const res = await getTheBethSetlists();

  return (
    <main>
      {res.map((setlist) => {
        return (
          <Link href={`/setlists/${setlist.id}`} key={setlist.id}>
            {!!setlist.image && (
              <Image
                src={setlist.image.url}
                alt={setlist.title}
                width={setlist.image.width}
                height={setlist.image.height}
              />
            )}
            <p className="text-white">{setlist.title}</p>
          </Link>
        );
      })}
    </main>
  );
}
