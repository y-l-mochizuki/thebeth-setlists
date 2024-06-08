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
import { SUBSCRIPTION_INFO } from "@/const";

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
            <TagList
              title="WEB SHOP"
              list={content.purchase_links.map((v) => ({
                href: v.link,
                name: identifyURL(v.link),
              }))}
            />
          )}

          <TagList
            title="SUBSCRIPTION"
            list={Object.values(SUBSCRIPTION_INFO).map((v) => ({
              href: v.URL,
              name: v.NAME,
            }))}
          />
        </div>
      </div>

      <div className="mt-8">
        <MusicTable musics={content.musics} />
      </div>
    </>
  );
};

type TagListProps = {
  title: string;
  list: {
    href: string;
    name: string;
  }[];
};

const TagList = ({ title, list }: TagListProps) => {
  return (
    <div>
      <p className="text-center">{title}</p>
      <ul className="flex flex-wrap gap-2 justify-center">
        {list.map((v, i) => (
          <li key={i}>
            <a
              className="text-yellow-500 underline"
              href={v.href}
              target="_blank"
            >
              #{v.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
