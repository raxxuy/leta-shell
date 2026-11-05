import AstalHyprland from "gi://AstalHyprland?version=0.1";
import type GObject from "gi://GObject?version=2.0";
import { type Annotations, gtype, property, register } from "gnim/gobject";
import { connect } from "@/decorators/connect";
import { emitNotify } from "@/decorators/emitNotify";
import { BaseService } from "./base";

type Workspaces = Record<number, AstalHyprland.Workspace>;

const getHyprland = () => AstalHyprland.get_default();

@register
export default class HyprlandService extends BaseService {
  declare readonly $readableProperties: GObject.Object.ReadableProperties &
    Annotations<HyprlandService, "workspaces">;

  #workspaces: Workspaces = Object.fromEntries(
    getHyprland().workspaces.map((workspace) => [workspace.id - 1, workspace]),
  );

  get internal(): AstalHyprland.Hyprland {
    return getHyprland();
  }

  @property(gtype<Workspaces>(Object))
  get workspaces(): Workspaces {
    return this.#workspaces;
  }

  @emitNotify<HyprlandService>("workspaces")
  private setWorkspaces(workspaces: Workspaces): void {
    this.#workspaces = workspaces;
  }

  @connect("workspace-added", getHyprland)
  protected onWorkspaceAdded(
    _: AstalHyprland.Hyprland,
    workspace: AstalHyprland.Workspace,
  ): void {
    this.setWorkspaces({ ...this.#workspaces, [workspace.id - 1]: workspace });
  }

  @connect("workspace-removed", getHyprland)
  protected onWorkspaceRemoved(_: AstalHyprland.Hyprland, id: number): void {
    const { [id - 1]: _removed, ...rest } = this.#workspaces;
    this.setWorkspaces(rest);
  }
}
