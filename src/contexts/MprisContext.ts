import type AstalMpris from "gi://AstalMpris";
import { type Accessor, createContext } from "ags";

export interface MprisShape {
  activePlayer: Accessor<AstalMpris.Player>;
  hasPlayer: Accessor<boolean>;
  next: () => void;
  players: Accessor<AstalMpris.Player[]>;
  previous: () => void;
  queue: Accessor<AstalMpris.Player[]>;
}

export const MprisContext = createContext<MprisShape>({} as MprisShape);
