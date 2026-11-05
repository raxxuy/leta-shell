import type { Setup } from "./types";

const runCleanup = (cleanup: () => void): void => {
  try {
    cleanup();
  } catch (error) {
    console.error("Decorator cleanup failed:", error);
  }
};

export const createRegistry = () => {
  const setups = new Map<object, Setup[]>();

  const add = (prototype: object, setup: Setup): void => {
    setups.set(prototype, [...(setups.get(prototype) ?? []), setup]);
  };

  const activate = (instance: object): (() => void) => {
    const cleanups: (() => void)[] = [];
    const dispose = (): void =>
      cleanups.splice(0).reverse().forEach(runCleanup);

    try {
      for (
        let proto = Object.getPrototypeOf(instance);
        proto;
        proto = Object.getPrototypeOf(proto)
      ) {
        for (const setup of setups.get(proto) ?? []) {
          cleanups.push(setup(instance));
        }
      }
    } catch (error) {
      dispose();
      throw error;
    }

    return dispose;
  };

  return { add, activate };
};
