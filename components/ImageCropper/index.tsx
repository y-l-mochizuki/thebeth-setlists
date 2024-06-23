"use client";

import React from "react";
import Image from "next/image";
import { Button, Card } from "@nextui-org/react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Cropper from "react-easy-crop";
import { Drawer } from "@/components";
import { useImageCropperDrawer } from "./hooks/useImageCropperDrawer";

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

// Cropper参考コード: https://codesandbox.io/p/sandbox/react-image-upload-and-crop-9tvzs?file=%2Fsrc%2Findex.js
export const ImageCropper = ({ setImage }: Props) => {
  const {
    imageList,
    imageDataURL,
    previewImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    handleUploadButtonClick,
    handleCropComplete,
    handleCropSubmitButtonClick,
    isOpen,
    onOpenChange,
  } = useImageCropperDrawer({
    setImage,
  });

  return (
    <>
      <div className="grid gap-4">
        <div className="w-2/4 mx-auto">
          <Card className="w-full aspect-square relative">
            {previewImage && (
              <Image
                className="w-full h-full object-cover"
                src={previewImage}
                alt="preview"
                fill
                priority
              />
            )}
          </Card>
        </div>
        <UploadButton value={imageList} onChange={handleUploadButtonClick} />
      </div>
      <Drawer
        title="編集"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        fullHeight
      >
        <div className="h-full flex flex-col justify-between">
          <div className="relative aspect-square">
            <Cropper
              image={imageDataURL}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 300, height: 300 }}
            />
          </div>
          <Button
            onClick={handleCropSubmitButtonClick}
            size="lg"
            fullWidth
            color="primary"
            className="text-black"
          >
            適用
          </Button>
        </div>
      </Drawer>
    </>
  );
};

type UploadButtonProps = {
  value: ImageListType;
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined,
  ) => void;
};

const UploadButton = ({ value, onChange }: UploadButtonProps) => {
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
