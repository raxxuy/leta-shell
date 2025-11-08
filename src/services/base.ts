import GObject, { register } from "ags/gobject";

interface ServiceSignals extends GObject.Object.SignalSignatures {}

@register()
export default class BaseService<
  TSignals extends ServiceSignals = ServiceSignals,
> extends GObject.Object {
  declare $signals: TSignals;

  override connect<S extends keyof TSignals>(
    signal: S,
    callback: GObject.SignalCallback<this, TSignals[S]>,
  ): number {
    return super.connect(signal as string, callback);
  }
}
