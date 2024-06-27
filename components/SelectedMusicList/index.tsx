"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";
import { SelectMusicDrawer } from "./components/SelectMusicDrawer";
import { MusicList } from "./components/MusicList";
import { MusicItem } from "./components/MusicItem";
import { useSelectedMusicList } from "./hooks/useSelectedMusicList";
import { AlbumType, Music } from "@/utils/api";

type Props = {
  musics: Music[];
  albums: AlbumType[];
  selectedMusics: Music[];
  setSelectedMusics: Dispatch<SetStateAction<Music[]>>;
};

export const SelectedMusicList = ({
  musics,
  albums,
  selectedMusics,
  setSelectedMusics,
}: Props) => {
  const {
    handleDragStart,
    handleDragEnd,
    handleRemoveMusicButtonClick,
    handleSelectMusicCompleted,
    isOpenMusicDrawer,
    onOpenChangeMusicDrawer,
    onOpenMusicDrawer,
  } = useSelectedMusicList(setSelectedMusics);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span>曲一覧</span>
        <Button onClick={onOpenMusicDrawer}>曲を追加する</Button>
      </div>
      {selectedMusics.length === 0 && (
        <p className="text-white/50 font-bold text-center py-4">
          曲を追加してください
        </p>
      )}
      <MusicList
        selectedMusics={selectedMusics}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        renderMusicItem={(music) => (
          <MusicItem
            id={music.id}
            key={music.id}
            onRemoveMusicButton={handleRemoveMusicButtonClick}
          >
            {music.title}
          </MusicItem>
        )}
      />
      <SelectMusicDrawer
        albums={albums}
        musics={musics}
        isOpen={isOpenMusicDrawer}
        onOpenChange={onOpenChangeMusicDrawer}
        onSelectMusicCompleted={handleSelectMusicCompleted}
      />
    </div>
  );
};
