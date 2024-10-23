"use client";

import React, { useState } from "react";
import AvenidaMenu from "../components/AvenidaMenu";
import { MENU, RESTAURANT } from "../content";

export default function Page() {
  const [restaurantObject, setRestaurantObject] = useState(RESTAURANT);
  const [menuObject, setMenuObject] = useState(MENU);

  return (
    <div className="flex justify-center">
      <AvenidaMenu
        restaurant={restaurantObject}
        menu={menuObject}
        isEdit
        onChangeMenu={setMenuObject}
        onChangeRestaurant={setRestaurantObject}
      />
    </div>
  );
}
