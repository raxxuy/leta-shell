export type Anchor =
  | "none"
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-full"
  | "bottom-full"
  | "center"
  | "center-inline";

export type ConvertOptions = {
  memoryLimit?: string;
  mapLimit?: string;
  quality?: number;
  resize?: string;
  gravity?: string;
};
