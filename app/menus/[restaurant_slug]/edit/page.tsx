"use client";

import React, { useEffect, useState } from "react";
import EditLiberoMenu from "../../playground/components/EditLiberoMenu";
import { MenuT } from "../../playground/types/menu";
import { RestaurantT } from "../../playground/types/restaurant";

const fetchRestaurantAndMenu = async (restaurantSlug: string) => {
  const restaurantData = await fetch(`/api/restaurants/${restaurantSlug}`, {
    cache: "no-store",
  });
  const restaurant = await restaurantData.json();
  const menuData = await fetch(
    `/api/restaurants/${restaurant.id}/menus?default`,
    { cache: "no-store" },
  );
  const menu = await menuData.json();

  return { restaurant, menu };
};

export default function Page({
  params,
}: {
  params: { restaurant_slug?: string };
}) {
  const [restaurantObject, setRestaurantObject] = useState<RestaurantT | null>(
    null,
  );
  const [menuObject, setMenuObject] = useState<MenuT | null>(null);

  useEffect(() => {
    const inititalFetch = async () => {
      const { restaurant, menu } = await fetchRestaurantAndMenu(
        params.restaurant_slug!,
      );

      setMenuObject(menu);
      setRestaurantObject(restaurant);
    };
    inititalFetch();
  }, []);

  return (
    <div className="flex justify-center">
      {!restaurantObject && !menuObject ? (
        <>Loading...</>
      ) : (
        <EditLiberoMenu
          restaurant={restaurantObject!}
          menu={menuObject!}
          onChangeMenu={setMenuObject}
          onChangeRestaurant={setRestaurantObject}
        />
      )}
    </div>
  );
}
