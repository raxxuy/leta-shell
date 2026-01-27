export type Mouse = {
  address: string;
  name: string;
  defaultSpeed: number;
  scrollFactor: number;
};

export type Keyboard = {
  address: string;
  name: string;
  rules: string;
  layout: string;
  variant: string;
  options: string;
  active_layout_index: number;
  active_keymap: string;
  capsLock: boolean;
  numLock: boolean;
  main: boolean;
};
