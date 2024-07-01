import { MusicTable } from "@/components/DetailPage/components/MusicTable";
import { getMusics } from "@/utils/api";
import { toJstDate } from "@/utils/format";
import { getPlaylist } from "@/utils/microcms";
import React from "react";

type Props = {
  params: {
    playlistId: string;
  };
};

export default async function Home({ params: { playlistId } }: Props) {
  const playlist = await getPlaylist(playlistId);
  const musics = await getMusics();
  const filteredMusics = musics.filter((music) =>
    playlist.music_ids.map((v) => v.music_id).includes(music.id),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 py-4">
        <h1 className="text-center text-2xl font-bold text-white/90">
          {playlist.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-1">
          <span className="text-center text-xs">@{playlist.poster}</span>
          <span className="text-center text-xs text-white/50">
            {toJstDate(playlist.publishedAt, true)}
          </span>
        </div>
      </div>
      <MusicTable musics={filteredMusics} />
    </div>
  );
}
