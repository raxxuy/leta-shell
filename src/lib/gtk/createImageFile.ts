import Gio from "gi://Gio";
import { createMemo } from "ags";
import { access } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

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
