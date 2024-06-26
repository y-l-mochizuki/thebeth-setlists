"use client";

import { Music } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { ComponentProps, useState } from "react";
import { twMerge } from "@/utils/tailwind-merge";
import { Drawer } from "@/components";
import { PlayerPlay } from "tabler-icons-react";

type Props = {
  musics: Music[];
};

export const MusicTable = ({ musics }: Props) => {
  const [music, setMusic] = useState<Music | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClick = (music: Music) => {
    setMusic(music);
    onOpen();
  };

  return (
    <>
      <Table
        hideHeader
        classNames={{
          wrapper: "bg-opacity-50 px-0",
        }}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
        </TableHeader>
        <TableBody>
          {musics.map((v, i) => {
            const order = i + 1;
            const hasModalContent =
              v.iframe_strings !== null && v.iframe_strings.length > 0;

            return (
              <TableRow key={v.id}>
                <TableCell className="text-white/95 flex gap-1">
                  <span className="inline-block min-w-[1.5em] text-white/50 text-center">
                    {order}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1"
                    onClick={hasModalContent ? () => handleClick(v) : undefined}
                  >
                    <span className={twMerge(hasModalContent && "underline")}>
                      {v.title}
                    </span>
                    {hasModalContent && <PlayableIcon />}
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!!music && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} music={music} />
      )}
    </>
  );
};

type ModalProps = Pick<
  ComponentProps<typeof Drawer>,
  "isOpen" | "onOpenChange"
> & {
  music: Music;
};

const Modal = ({ music, ...props }: ModalProps) => {
  return (
    <Drawer {...props} title={music.title}>
      {music.iframe_strings !== null &&
        music.iframe_strings.map((v, i) => (
          <IframeComponent className="-mx-6" iframeString={v.src} key={i} />
        ))}
    </Drawer>
  );
};

type IframeComponentProps = {
  iframeString: string;
  className: string;
};

const IframeComponent = ({ iframeString, className }: IframeComponentProps) => {
  const isIframeString = (str: string) => {
    const iframeRegex = /<iframe[^>]*>(.*?)<\/iframe>/i;
    return iframeRegex.test(str);
  };

  if (!isIframeString(iframeString)) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "[&>iframe]:w-full [&>iframe]:h-auto [&>iframe]:aspect-video",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: iframeString }}
    />
  );
};

const PlayableIcon = () => (
  <div className="border rounded-full bg-white/95">
    <PlayerPlay
      className="translate-x-[0.25px]"
      size={14}
      strokeWidth={1}
      fill="black"
    />
  </div>
);
