import { getTheBethSetlists } from "@/utils/api";
import Image from "next/image";

export default async function Home() {
  const res = await getTheBethSetlists();
  return (
    <main>
      {res.map(({ setlist }) => {
        return (
          <div key={setlist.id}>
            {!!setlist.image && (
              <Image
                src={setlist.image.url}
                alt={setlist.title}
                width={setlist.image.width}
                height={setlist.image.height}
              />
            )}
            <p className="text-white">{setlist.title}</p>
          </div>
        );
      })}
    </main>
  );
}
