import { timeout } from "ags/time";

export const useScrollLock = (cooldown = 200) => {
  let locked = false;

  const handle = (direction: number, onScroll: (direction: number) => void) => {
    if (!direction || locked) return;

    locked = true;
    onScroll(direction);
    timeout(cooldown, () => (locked = false));
  };

  return handle;
};
