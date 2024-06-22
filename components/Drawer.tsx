import React, { ComponentProps, PropsWithChildren } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { twMerge } from "@/utils/tailwind-merge";

type Props = PropsWithChildren<{
  title: string;
  fullHeight?: boolean;
}> &
  ComponentProps<typeof Modal>;

export const Drawer = ({
  title,
  fullHeight,
  isOpen,
  onOpenChange,
  children,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="bottom-center"
      scrollBehavior="inside"
      classNames={{
        base: twMerge("max-h-[95%] bg-opacity-90", fullHeight && "h-full"),
        header: "flex flex-col gap-1 text-white/95",
        body: "px-6 pt-0 pb-12 overflow-x-hidden",
        closeButton: "top-[30px] translate-y-[-50%] right-3 bg-default-100",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
