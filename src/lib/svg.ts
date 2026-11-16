export const symbolic = (markup: string, fallback = "white") =>
  markup.replaceAll("currentColor", `url(#gpa:foreground) ${fallback}`);
