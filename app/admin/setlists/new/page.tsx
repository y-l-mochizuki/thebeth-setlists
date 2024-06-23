import React from "react";
import { getMusics } from "@/utils/api";
import { Template } from "./_template";

export default async function Page() {
  const musics = await getMusics();
  return <Template musics={musics} />;
}
