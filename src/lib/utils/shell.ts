import { exec as _exec, execAsync } from "ags/process";

const run = (
  command: string | string[],
  async: boolean,
): string | Promise<string> => {
  const cmd = Array.isArray(command) ? command.join(" ") : command;
  const args = ["bash", "-c", cmd];

  try {
    return async ? execAsync(args) : _exec(args);
  } catch (error) {
    console.error(`Failed to execute: ${cmd}`, error);
    throw error;
  }
};

export const exec = (command: string | string[]): Promise<string> =>
  run(command, true) as Promise<string>;

export const execSync = (command: string | string[]): string =>
  run(command, false) as string;
