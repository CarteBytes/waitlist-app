"use client";

import React, { useState } from "react";
import { MENU, RESTAURANT } from "../content";
import EditLiberoMenu from "../components/EditLiberoMenu";

export default function Page() {
  const [restaurantObject, setRestaurantObject] = useState(RESTAURANT);
  const [menuObject, setMenuObject] = useState(MENU);

  return (
    <div className="flex justify-center">
      <EditLiberoMenu
        restaurant={restaurantObject}
        menu={menuObject}
        onChangeMenu={setMenuObject}
        onChangeRestaurant={setRestaurantObject}
      />
    </div>
  );
}
