import Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Pango from "gi://Pango?version=1.0";

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
  ResponseType,
  RevealerTransitionType,
  StateFlags,
} = Gtk;
export const { DragAction, ModifierType } = Gdk;
export const { ApplicationFlags, FileMonitorEvent } = Gio;
export const { EllipsizeMode, WrapMode } = Pango;
export const { FileTest, UserDirectory } = GLib;
