import { MENU, RESTAURANT } from "./content";
import AvenidaMenu from "../playground/components/AvenidaMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Piki Dogs HN | CarteBytes",
  description:
    "Reimagining menus, simplifying dining. Serving seamless digital experiences for modern restaurants.",
};

export default function Page() {
  return (
    <div className="flex justify-center">
      <AvenidaMenu restaurant={RESTAURANT} menu={MENU} lang="esp" />
    </div>
  );
}
