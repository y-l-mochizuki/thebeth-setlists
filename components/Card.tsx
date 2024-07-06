import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { Card as BaseCard } from "@nextui-org/react";
import { toJstDate } from "@/utils/format";
import Link from "next/link";
import { twMerge } from "@/utils/tailwind-merge";

type Image = {
  url: string;
};

type CardProps = {
  href: string;
  image?: Image | null;
  title: string;
  date?: string;
  isExternal?: boolean; // FIXME: ザ・ベストザベスFINALが終わったら削除する
};

export const Card = ({ href, image, title, date, isExternal }: CardProps) => {
  const animationClassNames =
    "active:opacity-50 transition-all duration-250 active:scale-95";
  return (
    <Link
      className={twMerge("flex flex-col gap-1", animationClassNames)}
      href={href}
      target={isExternal ? "_blank" : undefined} // FIXME: ザ・ベストザベスFINALが終わったら削除する
    >
      <BaseCard className="w-full aspect-square relative">
        {!!image && (
          <Image
            className="w-full h-full object-cover"
            src={image.url}
            alt={title}
            fill
            sizes="168px"
            priority
          />
        )}
      </BaseCard>
      <div className="flex flex-col flex-1 justify-between">
        <h2 className="font-bold text-sm line-clamp-2 text-white/95">
          {title}
        </h2>
        {!!date && <p className="opacity-50 text-sm">{toJstDate(date)}</p>}
      </div>
    </Link>
  );
};

const CardList = ({ children }: PropsWithChildren) => {
  return <div className="w-full grid grid-cols-2 gap-4">{children}</div>;
};

Card.List = CardList;
