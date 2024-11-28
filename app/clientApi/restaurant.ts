export const fetchRestaurantAndMenu = async (restaurantSlug: string) => {
  const restaurantData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant/${restaurantSlug}`,
    {
      cache: "no-store",
    },
  );
  const restaurant = await restaurantData.json();
  const menuData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurants/${restaurant.id}/menus?default`,
    { cache: "no-store" },
  );
  const menu = await menuData.json();

  return { restaurant, menu };
};
