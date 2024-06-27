import React from "react";
import { getMusics, getTheBethAlbums } from "@/utils/api";
import { Template } from "./_template";

export default async function Page() {
  const musics = await getMusics();
  const albums = await getTheBethAlbums();
  return <Template musics={musics} albums={albums} />;
}
