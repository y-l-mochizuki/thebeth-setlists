import { getPlaylists } from "@/utils/microcms";
import React from "react";
import { Template } from "./_template";

export default async function Home() {
  const playlists = await getPlaylists();
  return <Template playlists={playlists} />;
}
