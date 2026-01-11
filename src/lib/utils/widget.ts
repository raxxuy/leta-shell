import { Accessor } from "ags";

export const access = <T>(object: T | Accessor<T>): T => {
  return object instanceof Accessor ? object() : object;
};
