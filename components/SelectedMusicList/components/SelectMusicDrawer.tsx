import { useState } from "react";
import { Drawer } from "@/components";
import { Music } from "@/utils/api";
import { Button, Checkbox } from "@nextui-org/react";

type Props = {
  musics: Music[];
  isOpen: boolean;
  onOpenChange: () => void;
  onSelectMusicCompleted: (selectedMusic: Music[]) => void;
};

export const SelectMusicDrawer = ({
  musics,
  isOpen,
  onOpenChange,
  onSelectMusicCompleted,
}: Props) => {
  const [checked, setChecked] = useState<Music[]>([]);
  const handleSelectMusicCompleted = () => {
    onSelectMusicCompleted(checked);
    onOpenChange();
  };

  return (
    <Drawer title="曲一覧" isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {musics
            .filter((v) => v.title !== "リベンジャー")
            .map((v) => (
              <Checkbox
                size="sm"
                classNames={{
                  base: "w-full m-0 max-w-none flex",
                  label: "flex-1 justify-start",
                }}
                lineThrough
                key={v.id}
                value={v.id}
                onChange={() => {
                  setChecked((prev) => {
                    if (prev.includes(v)) {
                      return prev.filter((m) => m.id !== v.id);
                    }

                    return [...prev, v];
                  });
                }}
              >
                <span className="line-clamp-1">{v.title}</span>
              </Checkbox>
            ))}
        </div>
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
