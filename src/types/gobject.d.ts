export type KnownSignals<T> = T extends { $signals: infer S }
  ? Extract<keyof S, string>
  : never;

export type SignalOf<T> = KnownSignals<T> | (string & {});
