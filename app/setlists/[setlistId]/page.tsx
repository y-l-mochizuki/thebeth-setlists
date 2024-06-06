import { getTheBethSetlist } from "@/utils/api";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { identifyURL, toJstDate } from "@/utils/format";
import { MusicTable } from "@/components";

type Props = {
  params: {
    setlistId: string;
  };
};

export default async function Home({ params }: Props) {
  const setlist = await getTheBethSetlist(params.setlistId);
  const musicLenght = setlist.musics.length;
  type Links = typeof setlist.purchase_links;
  const hasValidPurchaseLinks = (
    links: Links
  ): links is Exclude<Links, undefined> => {
    return !!links && links.length > 0;
  };

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
        <div className="grid gap-4 mt-4">
          <div>
            <h1 className="text-xl font-bold">{setlist.title}</h1>
            <div className="opacity-50 mt-1">
              {!!setlist.live_date && (
                <p>開催日: {toJstDate(setlist.live_date)}</p>
              )}
              <p>楽曲数: {musicLenght}</p>
            </div>
          </div>

          {hasValidPurchaseLinks(setlist.purchase_links) && (
            <div>
              <p>購入先</p>
              <ul className="flex flex-wrap gap-2">
                {setlist.purchase_links.map((v, i) => (
                  <li key={i}>
                    <a
                      className="text-yellow-500 underline"
                      href={v.link}
                      target="_blank"
                    >
                      #{identifyURL(v.link)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <MusicTable musics={setlist.musics} />
      </div>
    </>
  );
}
