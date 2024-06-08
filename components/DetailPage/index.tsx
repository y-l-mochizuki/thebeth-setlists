import React from "react";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { AlbumType, Setlist } from "@/utils/api";
import { identifyURL, toJstDate } from "@/utils/format";
import { MusicTable } from "./components/MusicTable";
import {
  hasValidPurchaseLinks,
  isAlbumTypeWithReleaseDate,
  isSetlistTypeWithLiveDate,
} from "./helper";

type Props = {
  content: AlbumType | Setlist;
};

export const DetailPage = ({ content }: Props) => {
  const musicLength = content.musics.length;

  return (
    <>
      <div className="w-full">
        <div className="w-2/4 mx-auto">
          <Card className="w-full aspect-square relative">
            {!!content.image && (
              <Image
                className="w-full h-full object-cover"
                src={content.image.url}
                alt={content.title}
                fill
                priority
              />
            )}
          </Card>
        </div>

        <div className="grid gap-4 mt-4">
          <div className="text-center text-sm">
            <h1 className="text-xl font-bold text-white/95">{content.title}</h1>
            <div className="opacity-50 mt-1">
              <p>
                {isAlbumTypeWithReleaseDate(content) &&
                  `発売日: ${toJstDate(content.release_date)}`}
                {isSetlistTypeWithLiveDate(content) &&
                  `開催日: ${toJstDate(content.live_date)}`}
              </p>
              <p>楽曲数: {musicLength}</p>
            </div>
          </div>

          {hasValidPurchaseLinks(content.purchase_links) && (
            <div>
              <p className="text-center">購入先リンク</p>
              <ul className="flex flex-wrap gap-2 justify-center">
                {content.purchase_links.map((v, i) => (
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
        <MusicTable musics={content.musics} />
      </div>
    </>
  );
};
