import { Oswald, DynaPuff, Figtree, Libre_Baskerville } from "next/font/google";

export const figtree = Figtree({ subsets: ["latin"] });
export const oswald = Oswald({ subsets: ["latin"] });
export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
