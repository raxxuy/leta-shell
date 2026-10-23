import Gio from "gi://Gio";

import { createMemo } from "ags";

import type { Reactive } from "@/types/reactive";
import { access } from "../reactive";

export const createImageFile = (
  srcProp: Reactive<string | null>,
  isFileProp: Reactive<boolean> = false,
) => {
  return createMemo(() => {
    const src = access(srcProp) ?? "";
    const isFile = access(isFileProp);

    if (isFile) return Gio.File.new_for_path(src);

    Gio.File.new_for;
  });
};
