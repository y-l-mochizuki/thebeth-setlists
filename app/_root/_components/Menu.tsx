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
      router.push(url, { scroll: false });
    }, 500);
  };

  return (
    <>
      <button onClick={onOpen} type="button">
        <MenuIcon size={24} strokeWidth={1} className="text-white/80" />
      </button>
      <Drawer title="MENU" isOpen={isOpen} onOpenChange={onOpenChange}>
        <div className="grid gap-4 justify-items-start">
          <MenuItem onClick={() => handleClick("/setlists")}>SETLISTS</MenuItem>
          <MenuItem onClick={() => handleClick("/albums")}>ALBUMS</MenuItem>
          <ExternalLink href="https://thebeth.jp/">
            OFFICIAL WEB SITE
          </ExternalLink>
          <ExternalLink href="https://thebeth.official.ec/">
            OFFICIAL WEB SHOP
          </ExternalLink>
          <ExternalLink href="https://www.youtube.com/@THEBETHOffcial-">
            OFFICIAL YouTube CHANNEL
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
  <button
    className="text-left text-white/50 font-bold"
    onClick={onClick}
    type="button"
  >
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
      className="flex items-center gap-1 text-white/50 font-bold"
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon
        size={20}
        strokeWidth={2}
        className="text-white/50 -mt-0.5"
      />
    </a>
  );
};
