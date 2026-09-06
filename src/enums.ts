import Gio from "gi://Gio";
import GLib from "gi://GLib";
import Pango from "gi://Pango";

import { Astal, Gdk, Gtk } from "ags/gtk4";

export const { Exclusivity, Keymode, Layer, WindowAnchor } = Astal;
export const {
  Align,
  ContentFit,
  EventControllerScrollFlags,
  InputHints,
  Justification,
  NaturalWrapMode,
  Orientation,
  Overflow,
  PolicyType,
  PositionType,
  PropagationLimit,
  PropagationPhase,
  RevealerTransitionType,
  StateFlags,
  ResponseType,
} = Gtk;
export const { ModifierType, DragAction } = Gdk;
export const { ApplicationFlags, FileMonitorEvent } = Gio;
export const { EllipsizeMode, WrapMode } = Pango;
export const { UserDirectory, FileTest } = GLib;
