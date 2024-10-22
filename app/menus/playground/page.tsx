import React from "react";
import { RESTAURANT, MENU } from "./content";
import AvenidaMenu from "./components/AvenidaMenu";

export default function Page() {
  return (
    <div className="flex justify-center">
      <AvenidaMenu restaurant={RESTAURANT} menu={MENU} />
    </div>
  );
}
