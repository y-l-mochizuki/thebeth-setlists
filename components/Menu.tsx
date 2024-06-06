"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { ExternalLink as ExternalLinkIcon, Menu2 } from "tabler-icons-react";

export const Menu = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleClick = (url: string) => {
    onClose();
    setTimeout(() => {
      router.push(url);
    }, 500);
  };

  return (
    <>
      <button onClick={onOpen} type="button">
        <Menu2 size={24} strokeWidth={1} className="text-white/80" />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        classNames={{
          base: "min-h-full",
          wrapper: "justify-end [&>*]:m-0",
        }}
        radius="none"
        size="xs"
        motionProps={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">MENU</ModalHeader>
              <ModalBody className="p-6 gap-6 overflow-hidden">
                <MenuItem onClick={() => handleClick("/setlists")}>
                  セットリスト一覧
                </MenuItem>
                <MenuItem onClick={() => handleClick("/albums")}>
                  アルバム一覧
                </MenuItem>
                <ExternalLink href="https://thebeth.jp/">
                  オフィシャルサイト
                </ExternalLink>
                <ExternalLink href="https://thebeth.official.ec/">
                  オフィシャル WEB ショップ
                </ExternalLink>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const MenuItem = ({
  onClick,
  children,
}: PropsWithChildren & {
  onClick: () => void;
}) => (
  <button className="text-left text-sm" onClick={onClick} type="button">
    {children}
  </button>
);

const ExternalLink = ({
  href,
  children,
}: PropsWithChildren & {
  href: string;
}) => {
  return (
    <a
      className="flex items-center gap-0.5 text-sm"
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon
        size={16}
        strokeWidth={1}
        className="text-white/80 -mt-0.25"
      />
    </a>
  );
};
