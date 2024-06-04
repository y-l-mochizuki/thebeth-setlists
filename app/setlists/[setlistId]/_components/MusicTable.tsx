"use client";

import { Music } from "@/utils/api";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  Modal as NextUIModal,
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
      <Table hideHeader>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
        </TableHeader>
        <TableBody>
          {musics.map((v, i) => {
            const order = i + 1;
            const hasModalContent = v.iframe_strings !== null;
            return (
              <TableRow key={v.id}>
                <TableCell>
                  <button
                    type="button"
                    onClick={hasModalContent ? () => handleClick(v) : undefined}
                  >
                    {order}.{" "}
                    <span className={twMerge(hasModalContent && "underline")}>
                      {v.title}
                    </span>
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
  ComponentProps<typeof NextUIModal>,
  "isOpen" | "onOpenChange"
> & {
  music: Music;
};

const Modal = ({ music, ...props }: ModalProps) => {
  return (
    <NextUIModal
      {...props}
      backdrop="blur"
      placement="center"
      className="min-h-[25%] m-4"
      motionProps={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {music.title}
            </ModalHeader>
            <ModalBody className="pt-0 pb-6 gap-6 overflow-hidden">
              {music.iframe_strings !== null &&
                music.iframe_strings.map((v, i) => (
                  <IframeComponent
                    className="-mx-6"
                    iframeString={v.src}
                    key={i}
                  />
                ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </NextUIModal>
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
        className
      )}
      dangerouslySetInnerHTML={{ __html: iframeString }}
    />
  );
};
