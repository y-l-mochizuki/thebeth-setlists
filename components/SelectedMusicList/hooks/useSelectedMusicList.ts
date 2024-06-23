import { Dispatch, SetStateAction } from "react";
import { useDisclosure } from "@nextui-org/react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Music } from "@/utils/api";

export const useSelectedMusicList = (
  setSelectedMusics: Dispatch<SetStateAction<Music[]>>,
) => {
  const getScrollElement = () => {
    const scrollElement = document.querySelector(
      "body > [data-overlay-container]",
    );

    return scrollElement;
  };

  const handleDragStart = () => {
    const scrollElement = getScrollElement();
    if (!(scrollElement instanceof HTMLElement)) {
      return;
    }

    scrollElement.style.overflow = "hidden";
  };

  const handleDragCompleted = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setSelectedMusics((items) => {
        // UniqueIdentifierをstring型に変換
        const activeId = String(active.id);
        const overId = String(over.id);
        const oldIndex = items.map((v) => v.id).indexOf(activeId);
        const newIndex = items.map((v) => v.id).indexOf(overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const scrollElement = getScrollElement();
    if (!(scrollElement instanceof HTMLElement)) {
      return;
    }

    scrollElement.style.overflow = "";
    handleDragCompleted(event);
  };

  const handleRemoveMusicButtonClick = (id: string) => {
    setSelectedMusics((v) => v.filter((m) => m.id !== id));
  };

  const handleSelectMusicCompleted = (selectedMusics: Music[]) => {
    setSelectedMusics((prev) => [...prev, ...selectedMusics]);
  };

  const {
    isOpen: isOpenMusicDrawer,
    onOpen: onOpenMusicDrawer,
    onOpenChange: onOpenChangeMusicDrawer,
  } = useDisclosure();

  return {
    handleDragStart,
    handleDragEnd,
    handleRemoveMusicButtonClick,
    handleSelectMusicCompleted,
    isOpenMusicDrawer,
    onOpenChangeMusicDrawer,
    onOpenMusicDrawer,
  };
};
