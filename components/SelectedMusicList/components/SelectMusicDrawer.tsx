import { useState } from "react";
import { Drawer } from "@/components";
import { AlbumType, Music } from "@/utils/api";
import { Button, Checkbox } from "@nextui-org/react";

type Props = {
  musics: Music[];
  albums: AlbumType[];
  isOpen: boolean;
  onOpenChange: () => void;
  onSelectMusicCompleted: (selectedMusic: Music[]) => void;
};

export const SelectMusicDrawer = ({
  musics,
  albums,
  isOpen,
  onOpenChange,
  onSelectMusicCompleted,
}: Props) => {
  const [checked, setChecked] = useState<Music[]>([]);
  const handleSelectMusicCompleted = () => {
    onSelectMusicCompleted(checked);
    onOpenChange();
  };

  // TODO: 非公開のその他アルバムを作る
  const otherMusic = musics.find((v) => v.id === "jwxgns6g0kw");
  const otherMusics = {
    id: "other",
    title: "その他",
    musics: !!otherMusic ? [otherMusic] : [],
  };

  return (
    <Drawer title="曲一覧" isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-8">
        {[otherMusics, ...albums].map((v) => (
          <div key={v.id}>
            <div className="font-bold text-white/95">{v.title}</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {v.musics.map((v2) => (
                <Checkbox
                  size="sm"
                  classNames={{
                    base: "w-full m-0 max-w-none flex",
                    label: "flex-1 justify-start overflow-hidden",
                  }}
                  lineThrough
                  key={v2.id}
                  value={v2.id}
                  onChange={() => {
                    setChecked((prev) => {
                      if (prev.includes(v2)) {
                        return prev.filter((m) => m.id !== v2.id);
                      }

                      return [...prev, v2];
                    });
                  }}
                >
                  <div>{v2.title}</div>
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
        <Button
          onClick={handleSelectMusicCompleted}
          size="lg"
          color="primary"
          className="text-black"
        >
          曲を追加する
        </Button>
      </div>
    </Drawer>
  );
};
