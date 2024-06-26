import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { Button, Card as NextUICard, Link } from "@nextui-org/react";
import { toJstDate } from "@/utils/format";

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
  return (
    <Button
      className="content-start grid h-auto bg-transparent border-0 p-0 justify-stretch rounded-none whitespace-pre-wrap"
      as={Link}
      href={href}
      target={isExternal ? "_blank" : undefined} // FIXME: ザ・ベストザベスFINALが終わったら削除する
    >
      <NextUICard className="w-full aspect-square relative">
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
      </NextUICard>
      <div>
        <h2 className="font-bold text-sm line-clamp-2 text-white/95">
          {title}
        </h2>
        {!!date && <p className="opacity-50 text-sm">{toJstDate(date)}</p>}
      </div>
    </Button>
  );
};

const CardList = ({ children }: PropsWithChildren) => {
  return <div className="w-full grid grid-cols-2 gap-4">{children}</div>;
};

Card.List = CardList;
