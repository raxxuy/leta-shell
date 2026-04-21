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
    if (!MprisService.instance) {
      MprisService.instance = new MprisService();
    }
    return MprisService.instance;
  }

  @getter(Array<AstalMpris.Player>)
  get players() {
    return this.#players;
  }

  @getter(Array<AstalMpris.Player>)
  get queue() {
    return this.#queue;
  }

  @getter(AstalMpris.Player)
  get active() {
    return this.#queue[0] ?? null;
  }

  @emitNotify("queue", "active")
  setActive(player: AstalMpris.Player) {
    if (!this.#queue.includes(player)) return;

    this.#queue = [player, ...this.#queue.filter((p) => p !== player)];
  }

  @emitNotify("queue", "active")
  next() {
    if (this.#queue.length === 0) return;

    const [first, ...rest] = this.#queue;
    this.#queue = [...rest, first];
  }

  @emitNotify("queue", "active")
  previous() {
    if (this.#queue.length === 0) return;

    const last = this.#queue[this.#queue.length - 1];
    this.#queue = [last, ...this.#queue.slice(0, -1)];
  }

  @emitNotify("queue", "active")
  private addPlayer(player: AstalMpris.Player) {
    this.#players.push(player);
    this.#queue.push(player);
  }

  @emitNotify("queue", "active")
  private removePlayer(player: AstalMpris.Player) {
    this.#players = this.#players.filter((p) => p !== player);
    this.#queue = this.#queue.filter((p) => p !== player);
  }

  @connect("player-added", () => AstalMpris.get_default())
  private onPlayerAdded(_: AstalMpris.Mpris, player: AstalMpris.Player) {
    this.addPlayer(player);
  }

  @connect("player-closed", () => AstalMpris.get_default())
  private onPlayerRemoved(_: AstalMpris.Mpris, player: AstalMpris.Player) {
    this.removePlayer(player);
  }
}
