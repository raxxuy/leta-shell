import { createComputed, createState } from "ags";
import { timeout } from "ags/time";

export const useSliderDrag = (
  onRelease: (value: number) => void,
  floor?: boolean,
) => {
  const [isDragging, setIsDragging] = createState(false);
  const [dragPosition, setDragPosition] = createState(0);

  const displayPosition = (livePosition: () => number) =>
    createComputed(() => (isDragging() ? dragPosition() : livePosition()));

  const handleChange = ({ value }: { value: number }) => {
    setDragPosition(floor ? Math.floor(value) : value);
  };

  const handleDrag = () => {
    if (isDragging.peek()) {
      onRelease(dragPosition.peek());
      timeout(100, () => setIsDragging(false));
    } else {
      setIsDragging(true);
    }
  };

  return { displayPosition, handleChange, handleDrag };
};
