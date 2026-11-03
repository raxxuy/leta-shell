import AstalHyprland from "gi://AstalHyprland?version=0.1";
import type GObject from "gi://GObject?version=2.0";
import { type Annotations, gtype, property, register } from "gnim/gobject";
import { connect } from "@/decorators/connect";
import { emitNotify } from "@/decorators/emitNotify";
import { BaseService } from "./base";

@register
export default class HyprlandService extends BaseService {
  declare readonly $readableProperties: GObject.Object.ReadableProperties &
    Annotations<HyprlandService, "workspaces">;

  #workspaces: Record<number, AstalHyprland.Workspace> = {};

  get internal(): AstalHyprland.Hyprland {
    return AstalHyprland.get_default();
  }

  @property(gtype<Record<number, AstalHyprland.Workspace>>(Object))
  get workspaces(): Record<number, AstalHyprland.Workspace> {
    return this.#workspaces;
  }

  @emitNotify<HyprlandService>("workspaces")
  private setWorkspaces(
    workspaces: Record<number, AstalHyprland.Workspace>,
  ): void {
    this.#workspaces = workspaces;
  }

  @connect("workspace-added", () => AstalHyprland.get_default())
  protected onWorkspaceAdded(
    _: AstalHyprland.Hyprland,
    workspace: AstalHyprland.Workspace,
  ): void {
    this.setWorkspaces({ ...this.#workspaces, [workspace.id - 1]: workspace });
  }

  @connect("workspace-removed", () => AstalHyprland.get_default())
  protected onWorkspaceRemoved(_: AstalHyprland.Hyprland, id: number): void {
    const { [id - 1]: _removed, ...rest } = this.#workspaces;
    this.setWorkspaces(rest);
  }

  constructor() {
    super();

    const hyprland = AstalHyprland.get_default();

    for (const workspace of hyprland.workspaces) {
      this.#workspaces[workspace.id - 1] = workspace;
    }
  }
}
