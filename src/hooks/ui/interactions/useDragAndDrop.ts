import { createState } from "ags";
import { createDragAndDrop } from "@/lib/gtk";

export const useDragAndDrop = <T extends { id: string }>(
  initial: T[],
  onReorder?: (entries: T[]) => void,
) => {
  const [entries, setEntries] = createState(initial);

  const { move, makeDraggable } = createDragAndDrop(entries, (updated) => {
    setEntries(updated);
    onReorder?.(updated);
  });

  return {
    entries,
    move,
    makeDraggable,
  };
};
