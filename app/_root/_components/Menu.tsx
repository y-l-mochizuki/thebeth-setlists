"use client";

import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import {
  ExternalLink as ExternalLinkIcon,
  Menu as MenuIcon,
} from "tabler-icons-react";
import { Drawer } from "@/components";
import { OFFICIAL_INFO, PAGE_INFO, SUBSCRIPTION_INFO } from "@/const";

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
        <div className="grid gap-4 justify-items-start">
          {Object.values(PAGE_INFO).map((v, i) => (
            <MenuItem onClick={() => handleClick(v.URL)} key={i}>
              {v.NAME}
            </MenuItem>
          ))}

          <Heading>OFFICIAL</Heading>
          {Object.values(OFFICIAL_INFO).map((v, i) => (
            <ExternalLink href={v.URL} key={i}>
              {v.NAME}
            </ExternalLink>
          ))}

          <Heading>SUBSCRIPTION</Heading>
          {Object.values(SUBSCRIPTION_INFO).map((v, i) => (
            <ExternalLink href={v.URL} key={i}>
              {v.NAME}
            </ExternalLink>
          ))}
        </div>
      </Drawer>
    </>
  );
};

const Heading = ({ children }: PropsWithChildren) => (
  <p className="font-bold pt-4 text-white/95">{children}</p>
);

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
