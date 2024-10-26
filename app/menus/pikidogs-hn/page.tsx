import { MENU, RESTAURANT } from "./content";
import { Metadata } from "next";
import LiberoMenu from "../playground/components/LiberoMenu";

export const metadata: Metadata = {
  title: "Piki Dogs HN | CarteBytes",
  description:
    "Reimagining menus, simplifying dining. Serving seamless digital experiences for modern restaurants.",
};

export default function Page() {
  return (
    <div className="flex justify-center">
      <LiberoMenu restaurant={RESTAURANT} menu={MENU} lang="esp" />
    </div>
  );
}
