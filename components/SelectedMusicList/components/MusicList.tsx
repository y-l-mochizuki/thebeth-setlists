import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Music } from "@/utils/api";

type Props = {
  selectedMusics: Music[];
  renderMusicItem: (music: Music) => JSX.Element;
  onDragStart: () => void;
  onDragEnd: (event: DragEndEvent) => void;
};

export const MusicList = ({
  selectedMusics,
  renderMusicItem,
  onDragStart,
  onDragEnd,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="flex">
      <div className="flex flex-col gap-1">
        {selectedMusics.map((_, i) => (
          <span
            className="w-6 h-14 flex items-center text-lg text-white/95"
            key={i}
          >
            {i + 1}.
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1 flex-1 max-w-[calc(100%_-_24px)]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={selectedMusics}
            strategy={verticalListSortingStrategy}
          >
            {selectedMusics.map((music) => renderMusicItem(music))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
