"use client";

import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import {
  ExternalLink as ExternalLinkIcon,
  Menu as MenuIcon,
} from "tabler-icons-react";
import { Drawer } from "@/components";

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
        <MenuIcon size={24} strokeWidth={1} className="text-white/80" />
      </button>
      <Drawer title="MENU" isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className="grid gap-4">
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
        </div>
      </Drawer>
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
