// @ts-nocheck
import { watch } from "node:fs";

import { debounce } from "es-toolkit";

const ENTRY_POINT = "./app.ts";

let proc: Bun.Subprocess | null = null;

const startAgs = () => {
  proc = Bun.spawn(["ags", "run", ENTRY_POINT, "--define", "ENV='dev'"], {
    stdout: "inherit",
    stderr: "inherit",
  });
};

const buildAndReload = async () => {
  console.clear();
  console.log("AGS running...");

  Bun.spawnSync(["ags", "quit"]);
  if (proc) await proc.exited;

  startAgs();
};

const debouncedReload = debounce(buildAndReload, 1000);

startAgs();

console.log("Watching ./src...");
watch("./src", { recursive: true }, (_, filename) => {
  if (filename) debouncedReload();
});
