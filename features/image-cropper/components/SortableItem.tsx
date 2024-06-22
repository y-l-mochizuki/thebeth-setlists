import { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@nextui-org/react";
import { Menu, X } from "tabler-icons-react";

type Props = PropsWithChildren<{
  id: string;
  handleSelectMusicRemoveButton: (id: string) => void;
}>;

export function SortableItem({
  id,
  handleSelectMusicRemoveButton,
  children,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div {...attributes} ref={setNodeRef} style={style}>
      <Card className="h-14 p-0 relative flex-row items-center gap-4">
        <button
          className="h-full aspect-square flex items-center justify-center"
          type="button"
          onClick={() => handleSelectMusicRemoveButton(id)}
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
