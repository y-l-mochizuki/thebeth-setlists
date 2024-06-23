import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { Area } from "react-easy-crop";
import { ImageListType } from "react-images-uploading";
import { getCropImage } from "../utils";

type UseImageCropperDrawerType = {
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const useImageCropperDrawer = ({
  setImage,
}: UseImageCropperDrawerType) => {
  const [imageList, setImageList] = useState<ImageListType>([]);
  const imageDataURL =
    (imageList.length > 0 && imageList[0].dataURL) || undefined;

  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined,
  );

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleUploadButtonClick = (imageList: ImageListType) => {
    onOpen();
    setImageList(imageList);
  };

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSubmitButtonClick = async () => {
    const image = imageList.length > 0 && imageList[0].dataURL;
    if (!image || !croppedAreaPixels) {
      return;
    }

    const cropImage = await getCropImage(image, croppedAreaPixels);
    if (!cropImage) {
      return;
    }

    const base64Data = cropImage?.split(",")[1];
    setImage(base64Data);
    setPreviewImage(cropImage);
    onClose();
  };

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return {
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
  };
};
