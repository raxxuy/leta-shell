import { execAsync, exec as runSync } from "ags/process";

type Command = string | string[];

const format = (command: Command) =>
  Array.isArray(command) ? command.join(" ") : command;

export const exec = (command: Command, shell = "bash") =>
  execAsync([shell, "-c", format(command)]);

export const execSync = (command: Command, shell = "bash") =>
  runSync([shell, "-c", format(command)]);
