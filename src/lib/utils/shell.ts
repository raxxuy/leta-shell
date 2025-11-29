import { execAsync } from "ags/process";

export const exec = async (
  command: string | string[],
  shell: string = "bash",
): Promise<string> => {
  const cmd = Array.isArray(command) ? command.join(" ") : command;

  try {
    return await execAsync([shell, "-c", cmd]);
  } catch (error) {
    console.error(`Failed to execute: ${cmd}`, error);
    return "";
  }
};

export const bash = exec;

export const zsh = async (command: string | string[]): Promise<string> => {
  return await exec(command, "zsh");
};

export const fish = async (command: string | string[]): Promise<string> => {
  return await exec(command, "fish");
};
