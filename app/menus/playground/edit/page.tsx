"use client";

import React, { useState } from "react";
import { MENU, RESTAURANT } from "../content";
import LiberoMenu from "../components/LiberoMenu";

export default function Page() {
  const [restaurantObject, setRestaurantObject] = useState(RESTAURANT);
  const [menuObject, setMenuObject] = useState(MENU);

  return (
    <div className="flex justify-center">
      <LiberoMenu
        restaurant={restaurantObject}
        menu={menuObject}
        isEdit
        onChangeMenu={setMenuObject}
        onChangeRestaurant={setRestaurantObject}
      />
    </div>
  );
}
