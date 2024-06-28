"use client";

import React, { useState } from "react";
import { Switch, Input, Button, DateValue, Calendar } from "@nextui-org/react";
import { AlbumType, Music } from "@/utils/api";
import { errorMessage } from "@/utils/error-message";
import { I18nProvider } from "@react-aria/i18n";
import { ImageCropper, SelectedMusicList } from "@/components";
import { dateValueToJSTISOString } from "@/utils/format";

type Props = {
  musics: Music[];
  albums: AlbumType[];
};

export const Template = ({ musics, albums }: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [liveDate, setLiveDate] = useState<DateValue | null>(null);
  const [isTaiban, setIsTaiban] = useState<boolean>(false);
  const [isSponsorship, setIsSponsorship] = useState<boolean>(false);
  const [selectedMusics, setSelectedMusics] = useState<Music[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const handleSubmitError = (alertTitle: string) => {
    alert(alertTitle);
    setIsSubmitLoading(false);
  };

  const handleSubmitButton = async () => {
    setIsSubmitLoading(true);

    if (!image) {
      handleSubmitError("画像を選択してください");
      return;
    }

    if (!title) {
      handleSubmitError("セットリスト名を入力してください");
      return;
    }

    const ToJSTISOString = dateValueToJSTISOString(liveDate);
    if (!ToJSTISOString) {
      handleSubmitError("開催日を選択してください");
      return;
    }

    if (selectedMusics.length === 0) {
      handleSubmitError("曲を選択してください");
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
            isSponsorship: isSponsorship,
          },
          live_date: dateValueToJSTISOString(liveDate),
          musics: selectedMusics.map((v) => v.id),
          purchase_links: [],
        }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      alert("セットリストが正常に作成されました。");
      window.location.reload();
    } catch (e: any) {
      handleSubmitError("セットリストの作成に失敗しました。");
      throw new Error(errorMessage(e));
    }
  };

  const submitButtonText = isSubmitLoading ? "投稿中..." : "投稿する";

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
            <span>主催</span>
            <Switch
              isSelected={isSponsorship}
              onValueChange={setIsSponsorship}
            />
          </div>
        </section>
        <section>
          <SelectedMusicList
            musics={musics}
            albums={albums}
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
            isLoading={isSubmitLoading}
          >
            {submitButtonText}
          </Button>
        </section>
      </div>
    </>
  );
};
