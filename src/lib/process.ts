import { execAsync, exec as runSync } from "@gnim-js/io/process";

type Command = string | string[];

const argv = (command: Command, shell: string): string[] =>
  typeof command === "string" ? [shell, "-c", command] : command;

export const exec = (command: Command, shell = "bash") =>
  execAsync(argv(command, shell));

export const execSync = (command: Command, shell = "bash") =>
  runSync(argv(command, shell));
