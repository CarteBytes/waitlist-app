import React from "react";

import { MENU, RESTAURANT } from "./content";
import AvenidaMenu from "../playground/components/AvenidaMenu";

export default function Page() {
  return (
    <div className="flex justify-center">
      <AvenidaMenu restaurant={RESTAURANT} menu={MENU} />
    </div>
  );
}
