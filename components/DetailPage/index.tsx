import React from "react";
import Image from "next/image";
import { Button, Card } from "@nextui-org/react";
import { AlbumType, Setlist } from "@/utils/api";
import { identifyURL, toJstDate } from "@/utils/format";
import { MusicTable } from "./components/MusicTable";
import {
  hasValidPurchaseLinks,
  isAlbumTypeWithReleaseDate,
  isSetlistTypeWithLiveDate,
} from "./helper";
import { SUBSCRIPTION_INFO } from "@/const";
import {
  BrandApple,
  BrandSpotify,
  BrandTiktok,
  BrandYoutube,
} from "tabler-icons-react";

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

          <div className="text-center">SUBSCRIPTION & SNS</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(SUBSCRIPTION_INFO).map((v) => {
              const Icon = (() => {
                switch (v.NAME) {
                  case "Apple Music":
                    return BrandApple;
                  case "Spotify":
                    return BrandSpotify;
                  case "YouTube":
                    return BrandYoutube;
                  case "TikTok":
                    return BrandTiktok;
                  default:
                    return BrandYoutube;
                }
              })();

              return (
                <Button
                  key={v.NAME}
                  as="a"
                  target="_blank"
                  href={v.URL}
                  className="gap-1 text-black/90 font-bold"
                  size="lg"
                  color="primary"
                >
                  <Icon size={24} strokeWidth={2} /> {v.NAME}
                </Button>
              );
            })}
          </div>
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
      <p className="text-center text-white/95">{title}</p>
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
