import { getTheBethAlbum } from "@/utils/api";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { identifyURL, toJstDate } from "@/utils/format";
import { MusicTable } from "@/components";

type Props = {
  params: {
    albumId: string;
  };
};

export default async function Home({ params }: Props) {
  const album = await getTheBethAlbum(params.albumId);
  const musicLength = album.musics.length;

  type Links = typeof album.purchase_links;
  const hasValidPurchaseLinks = (
    links: Links,
  ): links is Exclude<Links, undefined> => {
    return !!links && links.length > 0;
  };

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
                priority
              />
            )}
          </Card>
        </div>

        <div className="grid gap-4 mt-4">
          <div>
            <h1 className="text-xl font-bold text-white/95">{album.title}</h1>
            <div className="opacity-50 mt-1">
              {!!album.release_date && (
                <p>発売日: {toJstDate(album.release_date)}</p>
              )}
              <p>楽曲数: {musicLength}</p>
            </div>
          </div>

          {hasValidPurchaseLinks(album.purchase_links) && (
            <div>
              <p>購入先</p>
              <ul className="flex flex-wrap gap-2">
                {album.purchase_links.map((v, i) => (
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
        <MusicTable musics={album.musics} />
      </div>
    </>
  );
}
