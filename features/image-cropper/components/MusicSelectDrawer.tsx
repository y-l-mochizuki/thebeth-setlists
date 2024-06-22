import { Drawer } from "@/components";
import { Music } from "@/utils/api";
import { Button, Checkbox } from "@nextui-org/react";
import { useState } from "react";

type Props = {
  musics: Music[];
  isOpen: boolean;
  onOpenChange: () => void;
  complete: (selectedMusic: Music[]) => void;
};

export const MusicSelectDrawer = ({
  musics,
  isOpen,
  onOpenChange,
  complete,
}: Props) => {
  const [checked, setChecked] = useState<Music[]>([]);
  const handleMusicsAddButton = () => {
    complete(checked);
    onOpenChange();
  };

  return (
    <Drawer title="曲一覧" isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {musics.map((v) => (
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
        <Button onClick={handleMusicsAddButton} size="lg">
          曲を追加する
        </Button>
      </div>
    </Drawer>
  );
};
