export const structuredClone = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));
