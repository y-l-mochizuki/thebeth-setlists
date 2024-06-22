"use client";

import React, { useState } from "react";
import {
  Switch,
  Input,
  DatePicker,
  useDisclosure,
  Button,
  Card,
} from "@nextui-org/react";
import { Music } from "@/utils/api";
import Image from "next/image";
import { ImageListType } from "react-images-uploading";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MusicSelectDrawer } from "./components/MusicSelectDrawer";
import { SortableItem } from "./components/SortableItem";
import { ImageCropper } from "./components/ImageCropper";

type Props = {
  musics: Music[];
};

// crop参考: https://codesandbox.io/p/sandbox/react-image-upload-and-crop-9tvzs?file=%2Fsrc%2Findex.js
export const PageTemplate = ({ musics }: Props) => {
  const [imageList, setImageList] = useState<ImageListType>([]);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);

  const handleSelectMusicRemoveButton = (id: string) => {
    setSelectedMusics((v) => v.filter((m) => m.id !== id));
  };

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
          <ImageCropper.UploadButton
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
        <section className="flex flex-col gap-2">
          <span>カテゴリ</span>
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
                  {selectedMusics.map((music) => (
                    <SortableItem
                      key={music.id}
                      id={music.id}
                      handleSelectMusicRemoveButton={
                        handleSelectMusicRemoveButton
                      }
                    >
                      {music.title}
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
