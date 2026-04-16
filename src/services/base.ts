import GObject, { register } from "ags/gobject";

@register({ GTypeName: "BaseService" })
export default class Service<
  TSignals extends
    GObject.Object.SignalSignatures = GObject.Object.SignalSignatures,
> extends GObject.Object {
  declare $signals: TSignals;

  override connect<S extends keyof TSignals>(
    signal: S,
    callback: GObject.SignalCallback<this, TSignals[S]>,
  ): number {
    return super.connect(signal as string, callback);
  }

  override disconnect(id: number): void {
    super.disconnect(id);
  }

  connectOnce<S extends keyof TSignals>(
    signal: S,
    callback: GObject.SignalCallback<this, TSignals[S]>,
  ): number {
    let id: number;
    id = this.connect(signal, ((source: this, ...args: never[]) => {
      this.disconnect(id);
      return (callback as (source: this, ...args: never[]) => unknown)(
        source,
        ...args,
      );
    }) as GObject.SignalCallback<this, TSignals[S]>);
    return id;
  }
}
