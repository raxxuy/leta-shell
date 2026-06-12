import { exec } from "../process";

export const focusWorkspace = (workspaceId: number) => {
  exec(`hyprctl dispatch 'hl.dsp.focus({ workspace = ${workspaceId} })'`);
};
