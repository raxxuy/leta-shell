import AstalMpris from "gi://AstalMpris";
import { onCleanup } from "ags";
import type GObject from "ags/gobject";
import { getter, register } from "ags/gobject";
import Service from "./base";

interface MediaSignals extends GObject.Object.SignalSignatures {}

@register({ GTypeName: "MediaService" })
export class MediaService extends Service<MediaSignals> {
  private static instance: MediaService;
  private mpris: AstalMpris.Mpris = AstalMpris.get_default();
  #currentPlayerIndex = 0;

  static get_default(): MediaService {
    if (!MediaService.instance) MediaService.instance = new MediaService();
    return MediaService.instance;
  }

  @getter(Array<AstalMpris.Player>)
  get players() {
    return this.mpris.players;
  }

  @getter(AstalMpris.Player)
  get currentPlayer() {
    return this.players[this.#currentPlayerIndex] ?? null;
  }

  nextPlayer() {
    if (this.players.length === 0) return;

    this.#currentPlayerIndex =
      (this.#currentPlayerIndex + 1) % this.players.length;

    this.notify("current-player");
  }

  previousPlayer() {
    if (this.players.length === 0) return;

    this.#currentPlayerIndex =
      (this.#currentPlayerIndex - 1 + this.players.length) %
      this.players.length;

    this.notify("current-player");
  }

  constructor() {
    super();

    const handler = this.mpris.connect("notify::players", () => {
      this.notify("players");
      this.notify("current-player");
    });

    onCleanup(() => this.mpris.disconnect(handler));
  }
}
