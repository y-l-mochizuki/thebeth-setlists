import { errorMessage } from "@/utils/error-message";
import canvasSize from "canvas-size";

type PixelCropType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

// Note: iOS だと canvas に表示できるサイズが制限されているため、画像が真っ黒になる
// https://gist.github.com/Cartman0/70393c046522461d241c
// https://github.com/ValentinH/react-easy-crop/issues/91#issuecomment-722925200
const getSafeArea = async (imageWidth: number, imageHeight: number) => {
  const maxSize = Math.max(imageWidth, imageHeight);
  const canvasLimitation = await canvasSize.maxArea({
    usePromise: true,
    useWorker: true,
  });

  let safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  if (safeArea > canvasLimitation.height) {
    safeArea *= canvasLimitation.height / safeArea;
  }

  return safeArea;
};
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // クロスオリジンの問題を回避
    image.src = url;
    return image;
  });

// Copy from "https://codesandbox.io/s/react-easy-crop-demo-with-cropped-output-q8q1mnr01w?from-embed=&file=/src/cropImage.js:0-2289"
async function getCroppedImg(imageSrc: string, pixelCrop: PixelCropType) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const safeArea = await getSafeArea(image.width, image.height);

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  return canvas.toDataURL("image/jpeg");
}

export const cropImage = async (
  image: string,
  croppedAreaPixels: PixelCropType,
) => {
  try {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    return croppedImage;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (typeof error === "string") {
      throw new Error(errorMessage(error));
    }
  }
};
