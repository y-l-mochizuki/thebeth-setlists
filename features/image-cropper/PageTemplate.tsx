"use client";

import React, { useState } from "react";
import { Switch, Input, Button, DateValue, Calendar } from "@nextui-org/react";
import { Music } from "@/utils/api";
import { dateValueToJSTISOString } from "./utils";
import { errorMessage } from "@/utils/error-message";
import { I18nProvider } from "@react-aria/i18n";
import { ImageCropper, SelectedMusicList } from "@/components";

type Props = {
  musics: Music[];
};

export const PageTemplate = ({ musics }: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [liveDate, setLiveDate] = useState<DateValue | null>(null);
  const [isTaiban, setIsTaiban] = useState<boolean>(false);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);

  const handleSubmitButton = async () => {
    if (!image) {
      alert("画像を選択してください");
      return;
    }

    if (!title) {
      alert("セットリスト名を入力してください");
      return;
    }

    const ToJSTISOString = dateValueToJSTISOString(liveDate);
    if (!ToJSTISOString) {
      alert("開催日を選択してください");
      return;
    }

    if (selectedMusics.length === 0) {
      alert("曲を選択してください");
      return;
    }

    try {
      const res = await fetch("/api/setlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          title,
          category: {
            fieldId: "category",
            thebest_thebeth: false,
            taiban: isTaiban,
          },
          live_date: dateValueToJSTISOString(liveDate),
          musics: selectedMusics.map((v) => v.id),
          purchase_links: [],
        }),
      });

      if (!res.ok) {
        throw new Error("セットリストの作成に失敗しました。");
      }

      alert("セットリストが正常に作成されました。");
      window.location.reload();
    } catch (e: any) {
      alert("セットリストの作成に失敗しました。");
      throw new Error(errorMessage(e));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <section>
          <ImageCropper setImage={setImage} />
        </section>
        <section>
          <Input
            labelPlacement="outside"
            label="セットリスト名"
            placeholder="セットリスト名"
            type="text"
            size="lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>
        <section className="relative flex flex-col gap-2">
          <span>開催日</span>
          <I18nProvider locale="ja-JP">
            <Calendar
              classNames={{
                base: "w-screen",
                gridHeaderRow: "flex",
                gridHeaderCell: "flex-1 aspect-square",
                gridBodyRow: "px-4 flex",
                cell: "flex-1 aspect-square",
                cellButton:
                  "text-xl w-full h-full data-[selected=true]:text-black",
              }}
              value={liveDate}
              onChange={(date) => setLiveDate(date)}
            />
          </I18nProvider>
        </section>
        <section className="flex flex-col gap-2">
          <span>カテゴリ</span>
          <div className="flex justify-between">
            <span>対バン</span>
            <Switch isSelected={isTaiban} onValueChange={setIsTaiban} />
          </div>
        </section>
        <section>
          <SelectedMusicList
            musics={musics}
            selectedMusics={selectedMusics}
            setSelectedMusics={setSelectedMusics}
          />
        </section>
        <section className="mt-8">
          <Button
            size="lg"
            fullWidth
            className="bg-yellow-500 text-black"
            onClick={handleSubmitButton}
          >
            投稿する
          </Button>
        </section>
      </div>
    </>
  );
};
