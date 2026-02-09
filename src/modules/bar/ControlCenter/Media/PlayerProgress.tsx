import type { Accessor } from "ags";
import { createComputed, createState } from "ags";
import { timeout } from "ags/time";
import { Orientation } from "@/enums";

interface PlayerProgressProps {
  position: Accessor<number>;
  length: Accessor<number>;
  onSeek: (position: number) => void;
}

export default function PlayerProgress({
  position,
  length,
  onSeek,
}: PlayerProgressProps) {
  const [isDragging, setIsDragging] = createState(false);
  const [dragPosition, setDragPosition] = createState(0);

  const displayPosition = createComputed(() =>
    isDragging() ? dragPosition() : position(),
  );

  const handleSliderChange = ({ value }: { value: number }) => {
    setDragPosition(Math.floor(value));
  };

  const handleSliderInteraction = () => {
    if (isDragging.peek()) {
      onSeek(dragPosition.peek());
      timeout(100, () => setIsDragging(false));
    } else {
      setIsDragging(true);
    }
  };

  return (
    <slider
      max={length}
      min={0}
      onChangeValue={handleSliderChange}
      onNotify={(_, event) => {
        if (event.name === "css-classes") {
          handleSliderInteraction();
        }
      }}
      orientation={Orientation.HORIZONTAL}
      value={displayPosition}
    />
  );
}
