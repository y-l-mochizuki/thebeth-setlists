import { PropsWithChildren } from "react";
import { Card } from "@nextui-org/react";
import { Menu, X } from "tabler-icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = PropsWithChildren<{
  id: string;
  onRemoveMusicButton: (id: string) => void;
}>;

export function MusicItem({ id, onRemoveMusicButton, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div {...attributes} ref={setNodeRef} style={style}>
      <Card className="h-14 py-0 flex-row items-center">
        <button
          className="h-full px-2 flex items-center justify-center"
          type="button"
          onClick={() => onRemoveMusicButton(id)}
        >
          <X className="text-red-500" size={12} strokeWidth={1} />
        </button>
        <span className="flex-1 truncate">{children}</span>
        <div
          {...listeners}
          className="h-full aspect-square flex items-center justify-center"
        >
          <Menu className="text-white/50" size={12} strokeWidth={1} />
        </div>
      </Card>
    </div>
  );
}
