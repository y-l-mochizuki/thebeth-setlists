import React, { ComponentProps, PropsWithChildren } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

type Props = PropsWithChildren<{
  title: string;
}> &
  ComponentProps<typeof Modal>;

export const Drawer = ({ title, isOpen, onOpenChange, children }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="bottom-center"
      scrollBehavior="inside"
      classNames={{
        base: "min-h-[90%] bg-opacity-50",
        header: "flex flex-col gap-1",
        body: "px-6 pt-0 pb-12",
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
