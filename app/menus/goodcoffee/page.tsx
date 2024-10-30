import { MENU, RESTAURANT } from "./content";
import { Metadata } from "next";
import LiberoMenu from "../playground/components/LiberoMenu";
import { oswald } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "The Good Coffee Co. | CarteBytes",
  description:
    "Reimagining menus, simplifying dining. Serving seamless digital experiences for modern restaurants.",
};

export default function Page() {
  return (
    <div className={`${oswald.className} flex justify-center antialiased`}>
      <LiberoMenu restaurant={RESTAURANT} menu={MENU} />
    </div>
  );
}
