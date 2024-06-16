"use client";

import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Cropper, { Area } from "react-easy-crop";
import { cropImage } from "./utils";
import { Button } from "@nextui-org/react";
import { Drawer } from "@/components";

type ImageUploadingButtonProps = {
  value: ImageListType;
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined,
  ) => void;
};

export const ImageUploadingButton = ({
  value,
  onChange,
}: ImageUploadingButtonProps) => {
  return (
    <ImageUploading value={value} onChange={onChange}>
      {({ onImageUpload, onImageUpdate }) => (
        <Button onClick={value ? onImageUpload : () => onImageUpdate(0)}>
          画像をアップロード
        </Button>
      )}
    </ImageUploading>
  );
};

type ImageCropperProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  image: string | undefined;
  onComplete: (imagePromise: Promise<string>) => void;
};

export const ImageCropper = ({
  isOpen,
  onOpenChange,
  image,
  onComplete,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleComplete = () => {
    if (image && croppedAreaPixels) {
      const imagePromise = cropImage(image, croppedAreaPixels);
      onComplete(imagePromise as Promise<string>);
    }
  };

  return (
    <Drawer title="編集" isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="relative h-full">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={(_, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
          }}
          onZoomChange={setZoom}
          cropSize={{ width: 300, height: 300 }}
        />
      </div>
      <Button onClick={handleComplete} size="lg">
        適用
      </Button>
    </Drawer>
  );
};
