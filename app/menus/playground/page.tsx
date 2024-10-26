import React from "react";
import { RESTAURANT, MENU } from "./content";
import LiberoMenu from "./components/LiberoMenu";

export default function Page() {
  return (
    <div className="flex justify-center">
      <LiberoMenu restaurant={RESTAURANT} menu={MENU} />
    </div>
  );
}
