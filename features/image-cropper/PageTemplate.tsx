"use client";

import React, { useState } from "react";
import {
  Switch,
  Input,
  DatePicker,
  Checkbox,
  useDisclosure,
  Button,
  Card,
} from "@nextui-org/react";
import { Music } from "@/utils/api";
import { Drawer } from "@/components";
import Image from "next/image";
import { ImageCropper, ImageUploadingButton } from "@/features/image-cropper";
import { ImageListType } from "react-images-uploading";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "tabler-icons-react";

type Props = {
  musics: Music[];
};

// crop参考: https://codesandbox.io/p/sandbox/react-image-upload-and-crop-9tvzs?file=%2Fsrc%2Findex.js
export const PageTemplate = ({ musics }: Props) => {
  const [imageList, setImageList] = useState<ImageListType>([]);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);

  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handleDragEnd(event: DragEndEvent) {
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
  }

  const handleMusicSelectDrawerComplete = (selectedMusics: Music[]) => {
    setSelectedMusics((prev) => [...prev, ...selectedMusics]);
  };

  const {
    isOpen: isOpenMusicDrawer,
    onOpen: onOpenMusicDrawer,
    onOpenChange: onOpenChangeMusicDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenImageCropper,
    onOpen: onOpenImageCropper,
    onClose: onCloseCropper,
    onOpenChange: onOpenChangeImageCropper,
  } = useDisclosure();

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="grid gap-4">
          <div className="w-2/4 mx-auto">
            <Card className="w-full aspect-square relative">
              {croppedImage && (
                <Image
                  className="w-full h-full object-cover"
                  src={croppedImage}
                  alt="preview"
                  fill
                  priority
                />
              )}
            </Card>
          </div>
          <ImageUploadingButton
            value={imageList}
            onChange={(imageList) => {
              onOpenImageCropper();
              setImageList(imageList);
            }}
          />
        </section>
        <section>
          <Input
            labelPlacement="outside"
            label="セットリスト名"
            placeholder="セットリスト名"
            type="text"
            size="lg"
          />
        </section>
        <section className="relative">
          <DatePicker labelPlacement="outside" size="lg" label="開催日" />
        </section>
        <section>
          <div className="flex justify-between">
            <span>対バン</span>
            <Switch />
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>曲一覧</span>
            <Button onClick={onOpenMusicDrawer}>曲を追加する</Button>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              {selectedMusics.map((_, i) => (
                <span className="w-6 h-14 flex items-center text-lg text-white/95">
                  {i + 1}.
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-1 flex-1 max-w-[calc(100%_-_24px)]">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={() => {
                  const scrollElement = document.querySelector("body > *");
                  if (!(scrollElement instanceof HTMLElement)) {
                    return;
                  }

                  scrollElement.style.overflow = "hidden";
                }}
                onDragEnd={(e) => {
                  const scrollElement = document.querySelector("body > *");
                  if (!(scrollElement instanceof HTMLElement)) {
                    return;
                  }

                  scrollElement.style.overflow = "";
                  handleDragEnd(e);
                }}
              >
                <SortableContext
                  items={selectedMusics}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedMusics.map((music, i) => (
                    <SortableItem key={music.id} id={music.id} className="flex">
                      <div className="flex items-center gap-4">
                        <span className="flex-1 truncate">{music.title}</span>
                        <Menu
                          className="text-white/50"
                          size={12}
                          strokeWidth={1}
                        />
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </section>
      </div>
      <ImageCropper
        isOpen={isOpenImageCropper}
        onOpenChange={onOpenChangeImageCropper}
        image={(imageList.length > 0 && imageList[0].dataURL) || undefined}
        onComplete={(imagePromise) => {
          imagePromise.then((image) => {
            setCroppedImage(image);
            onCloseCropper();
          });
        }}
      />
      <MusicSelectDrawer
        musics={musics}
        isOpen={isOpenMusicDrawer}
        onOpenChange={onOpenChangeMusicDrawer}
        complete={handleMusicSelectDrawerComplete}
      />
    </>
  );
};

{
  /* <DndContext
sensors={sensors}
collisionDetection={closestCenter}
onDragEnd={handleDragEnd}
>
<SortableContext
  items={selectedMusics}
  strategy={verticalListSortingStrategy}
>
  {selectedMusics.map((v, i) => (
    <SortableItem key={v.id} id={v.id}>
      {i}. {v.title}
    </SortableItem>
  ))}
</SortableContext>
</DndContext> */
}

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="p-4">{props.children}</Card>
    </div>
  );
}

type MusicSelectDrawerProps = {
  musics: Music[];
  isOpen: boolean;
  onOpenChange: () => void;
  complete: (selectedMusic: Music[]) => void;
};

const MusicSelectDrawer = ({
  musics,
  isOpen,
  onOpenChange,
  complete,
}: MusicSelectDrawerProps) => {
  const [checked, setChecked] = useState<Music[]>([]);
  const handleMusicsAddButton = () => {
    complete(checked);
    onOpenChange();
  };

  return (
    <Drawer title="曲一覧" isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="grid h-full">
        <div className="grid grid-cols-2 gap-4 overflow-y-scroll">
          {musics.map((v) => (
            <Checkbox
              className="w-full m-0 max-w-none"
              lineThrough
              key={v.id}
              value={v.id}
              onChange={() => {
                setChecked((prev) => {
                  if (prev.includes(v)) {
                    return prev.filter((m) => m.id !== v.id);
                  }

                  return [...prev, v];
                });
              }}
            >
              {v.title}
            </Checkbox>
          ))}
        </div>
        <Button
          onClick={handleMusicsAddButton}
          size="lg"
          className="translate-y-[50%]"
        >
          曲を追加する
        </Button>
      </div>
    </Drawer>
  );
};

// POST例 nullは使えない
// {
//   "image": "https://images.microcms-assets.io/assets/29e4ee16780c4731b686e98c0446379c/89ac1ea1487443e28f3bfb543dff2c9d/GQChfKIbkAApV8q.jpg",
//   "title": "投稿機能テスト",
//   "category": {
//     "fieldId": "category",
//     "thebest_thebeth": false,
//     "taiban": true
//   },
//   "live_date": "2024-06-15T15:46:19.119Z",
//   "musics": [
//     "jbg_pwk52hf"
//   ],
//   "purchase_links": []
// }
