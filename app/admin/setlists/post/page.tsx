import React from "react";
import { getMusics } from "@/utils/api";
import { PageTemplate } from "@/features/image-cropper";

export default async function Page() {
  const musics = await getMusics();
  return <PageTemplate musics={musics} />;
}
