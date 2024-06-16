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

type Props = {
  musics: Music[];
};
// crop参考: https://codesandbox.io/p/sandbox/react-image-upload-and-crop-9tvzs?file=%2Fsrc%2Findex.js
export const PageTemplate = ({ musics }: Props) => {
  const [imageList, setImageList] = useState<ImageListType>([]);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);
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
      <div className="grid gap-8">
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
        <section>
          <div className="flex justify-between items-center">
            <span>曲一覧</span>
            <Button onClick={onOpenMusicDrawer}>曲を追加する</Button>
          </div>
          <div>
            {selectedMusics.map((v) => (
              <p key={v.id}>{v.title}</p>
            ))}
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
        <div className="grid grid-cols-2 gap-2 overflow-y-scroll">
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
