import chroma from "chroma-js";

export function isLight(color: string) {
  const luminance = chroma(color).luminance();
  return luminance > 0.5;
}
