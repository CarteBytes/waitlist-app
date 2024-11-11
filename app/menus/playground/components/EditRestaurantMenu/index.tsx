"use client";

import { RestaurantT } from "../../types/restaurant";
import { MenuT } from "../../types/menu";
import NavHeader from "../NavHeader";
import { useState } from "react";
import TogglePill from "../TogglePill";
import { ItemT } from "../../types/item";
import { FaPlus } from "react-icons/fa6";
import SlideMenu from "../SlideMenu";
import MenuItemForm from "../MenuItemForm";

export default function EditRestaurantMenu({
  restaurant,
  menu,
  items,
  categories,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
  items: ItemT[];
  categories: any[];
}) {
  const [type, setType] = useState("items");
  const [showItemForm, setShowItemForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [restaurantObject, setRestaurantObject] = useState(restaurant);

  const getData = () => {
    if (type === "items") {
      return items;
    } else if (type === "categories") {
      return categories;
    } else if (type === "menu") {
      return [];
    }

    return [];
  };

  const handleClickAdd = () => {
    if (type === "items") {
      setShowItemForm(true);
    }
  };

  return (
    <div className="min-h-svh w-full max-w-xl">
      <NavHeader
        restaurant={restaurant}
        onChangeRestaurant={setRestaurantObject}
      />

      <div className="px-4">
        <h2 className="py-6 text-2xl capitalize">{type}</h2>

        <div className="flex flex-col gap-3">
          {getData()?.map((item) => (
            <div
              key={item.id}
              className="w-full cursor-pointer rounded-lg border-2 border-[#F6FE9B] p-4"
              onClick={() => {
                setSelectedItem(item);
                setShowItemForm(true);
              }}>
              <div className="text-lg font-bold">{item.name}</div>
              <div className="opacity-70">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-8 left-2 z-10 transform">
          <TogglePill
            op1={{ label: "Items", value: "items" }}
            op2={{ label: "Categories", value: "categories" }}
            op3={{ label: "Menu", value: "menu" }}
            value={type}
            handleToggle={setType}
          />
        </div>
        <div className="fixed bottom-7 right-2 z-10 transform">
          <button
            onClick={handleClickAdd}
            className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-5">
            <FaPlus className="text-xl text-black" />
          </button>
        </div>
      </div>
      <div>
        <SlideMenu
          isOpen={showItemForm}
          onClose={() => {
            setShowItemForm(false);
            setSelectedItem(undefined);
          }}>
          <MenuItemForm
            categories={categories}
            item={selectedItem}
            orgId={restaurant.org_id}
          />
        </SlideMenu>
      </div>
    </div>
  );
}

//-translate-x-1/2
