"use client";

import React from "react";
import Link from "next/link";
import { Playlist } from "@/utils/microcms";
import { toJstDate } from "@/utils/format";
import { Button, Card } from "@nextui-org/react";

type Props = {
  playlists: Playlist[];
};

export const Template = ({ playlists }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white/90">PLAYLIST</h1>
        <Button size="sm" as={Link} href="/playlist/new">
          投稿する
        </Button>
      </div>
      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          href={`/playlist/${playlist.id}`}
          className="flex flex-col text-white/90"
        >
          <span className="text-base font-bold">{playlist.title}</span>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="text-xs">@{playlist.poster}</span>
            <span className="text-xs text-white/50">
              {toJstDate(playlist.publishedAt, true)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
