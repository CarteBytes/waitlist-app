import { Oswald, DynaPuff, Figtree } from "next/font/google";

export const figtree = Figtree({ subsets: ["latin"] });
export const oswald = Oswald({ subsets: ["latin"] });
export const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
