import { Accessor, createComputed } from "ags";

type ImageWrapper = JSX.IntrinsicElements["box" | "button"] & {
  src: string | Accessor<string>;
  type?: "box" | "button";
  file: boolean;
};

export default function ImageWrapper({
  src,
  type = "box",
  file,
  ...props
}: ImageWrapper) {
  const css = createComputed(() => {
    const url = src instanceof Accessor ? src() : src;

    return `
      background-color: #111111;
      background-image: url("${file ? "file://" : ""}${url}");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    `;
  });

  if (type === "box") {
    return <box {...(props as JSX.IntrinsicElements["box"])} css={css} />;
  }

  return <button {...(props as JSX.IntrinsicElements["button"])} css={css} />;
}
