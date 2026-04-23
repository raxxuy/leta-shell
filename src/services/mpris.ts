import AstalMpris from "gi://AstalMpris";
import { getter, register } from "ags/gobject";
import { connect, emitNotify } from "@/decorators/gobject";
import Service from "./base";

@register({ GTypeName: "MprisService" })
export default class MprisService extends Service {
  private static instance: MprisService;

  #players: AstalMpris.Player[] = [];
  #queue: AstalMpris.Player[] = [];

  static get_default(): MprisService {
    if (!MprisService.instance) MprisService.instance = new MprisService();
    return MprisService.instance;
  }

  @getter(Array<AstalMpris.Player>)
  get players(): AstalMpris.Player[] {
    return this.#players;
  }

  @getter(Array<AstalMpris.Player>)
  get queue(): AstalMpris.Player[] {
    return this.#queue;
  }

  @getter(AstalMpris.Player)
  get active(): AstalMpris.Player {
    return this.#queue[0] ?? null;
  }

  @emitNotify("queue", "active")
  setActive(player: AstalMpris.Player): void {
    if (!this.#queue.includes(player)) return;

    this.#queue = [player, ...this.#queue.filter((p) => p !== player)];
  }

  @emitNotify("queue", "active")
  next(): void {
    if (this.#queue.length === 0) return;

    const [first, ...rest] = this.#queue;
    this.#queue = [...rest, first];
  }

  @emitNotify("queue", "active")
  previous(): void {
    if (this.#queue.length === 0) return;

    const last = this.#queue[this.#queue.length - 1];
    this.#queue = [last, ...this.#queue.slice(0, -1)];
  }

  @emitNotify("queue", "active")
  private addPlayer(player: AstalMpris.Player): void {
    this.#players.push(player);
    this.#queue.push(player);
  }

  @emitNotify("queue", "active")
  private removePlayer(player: AstalMpris.Player): void {
    this.#players = this.#players.filter((p) => p !== player);
    this.#queue = this.#queue.filter((p) => p !== player);
  }

  @connect("player-added", () => AstalMpris.get_default())
  protected onPlayerAdded(
    _: AstalMpris.Mpris,
    player: AstalMpris.Player,
  ): void {
    this.addPlayer(player);
  }

  @connect("player-closed", () => AstalMpris.get_default())
  protected onPlayerRemoved(
    _: AstalMpris.Mpris,
    player: AstalMpris.Player,
  ): void {
    this.removePlayer(player);
  }
}
