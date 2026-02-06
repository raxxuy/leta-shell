import { exec as _exec, execAsync } from "ags/process";

const run = (
  command: string | string[],
  async: boolean,
  shell: string = "bash",
): string | Promise<string> => {
  const cmd = Array.isArray(command) ? command.join(" ") : command;
  const args = [shell, "-c", cmd];

  try {
    return async ? execAsync(args) : _exec(args);
  } catch (error) {
    console.error(`Failed to execute: ${cmd}`, error);
    throw error;
  }
};

export const exec = (
  command: string | string[],
  shell?: string,
): Promise<string> => run(command, true, shell) as Promise<string>;

export const execSync = (command: string | string[], shell?: string): string =>
  run(command, false, shell) as string;
