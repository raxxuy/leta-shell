import Gio from "gi://Gio";
import { createMemo } from "ags";
import type { Reactive } from "@/types/reactive";
import { access } from "../reactive";

export const createImageFile = (
  srcProp: Reactive<string>,
  isFileProp: Reactive<boolean> = false,
) => {
  return createMemo(() => {
    const src = access(srcProp);
    const isFile = access(isFileProp);
    return isFile ? Gio.File.new_for_path(src) : Gio.File.new_for_uri(src);
  });
};
