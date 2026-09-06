import { exec } from "../process";

export const focusWorkspace = (id: number) => {
  exec(`hyprctl dispatch 'hl.dsp.focus({ workspace = ${id} })'`);
};
