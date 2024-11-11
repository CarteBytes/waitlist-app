"use client";

import { RestaurantT } from "../../types/restaurant";
import { MenuT } from "../../types/menu";
import NavHeader from "../NavHeader";
import { useState } from "react";
import TogglePill from "../TogglePill";
import { ItemT } from "../../types/item";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa6";
import SlideMenu from "../SlideMenu";
import MenuItemForm from "../MenuItemForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import MenuCategoryForm from "../MenuCategoryForm";
import LiberoMenu from "../LiberoMenu";
import { ItemCategoryT } from "../../types/category";

export default function EditRestaurantMenu({
  restaurant,
  menu,
  items,
  categories,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
  items: ItemT[];
  categories: ItemCategoryT[];
}) {
  const [parent] = useAutoAnimate();
  const [type, setType] = useState("items");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [restaurantObject, setRestaurantObject] = useState(restaurant);
  const [menuObject, setMenuObject] = useState(menu);

  const getData = () => {
    if (type === "items") {
      return items;
    } else if (type === "categories") {
      return categories;
    } else if (type === "menu") {
      return categories.filter((c) => c.status === "published");
    }

    return [];
  };

  const handleClickMainCTA = () => {
    if (type === "menu") {
      setShowPreview(true);
    } else {
      setShowAddForm(true);
    }
  };

  const handleClickCard = (entity: any) => {
    if (type === "items") {
      setSelectedItem(entity);
    } else if (type === "categories") {
      setSelectedCategory(entity);
    } else if (type === "menu") {
    }
    setShowAddForm(true);
  };

  const getContent = () => {
    if (showPreview)
      return (
        <>
          <LiberoMenu restaurant={restaurantObject} menu={menuObject} />
          <div className="fixed bottom-5 right-3 z-10 transform">
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-4">
              <FaEyeSlash className="text-xl text-black" />
            </button>
          </div>
        </>
      );

    return (
      <>
        <div className="px-4">
          <h2 className="py-6 text-2xl capitalize">
            {type} ({getData()?.length ?? 0})
          </h2>

          <div className="flex flex-col gap-3" ref={parent}>
            {getData()?.map((item) => (
              <div
                key={item.id}
                className="w-full cursor-pointer rounded-lg border-2 border-[#F6FE9B] p-4"
                onClick={() => {
                  handleClickCard(item);
                }}>
                <div className="text-lg font-bold">{item.name}</div>
                <div className="opacity-70">{item.description}</div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-6 left-3 z-10 transform">
            <TogglePill
              op1={{ label: "Items", value: "items" }}
              op2={{ label: "Categories", value: "categories" }}
              op3={{ label: "Menu", value: "menu" }}
              value={type}
              handleToggle={setType}
            />
          </div>
          <div className="fixed bottom-5 right-3 z-10 transform">
            <button
              onClick={handleClickMainCTA}
              className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-4">
              {type === "menu" ? (
                <FaEye className="text-xl text-black" />
              ) : (
                <FaPlus className="text-xl text-black" />
              )}
            </button>
          </div>
        </div>
        <div>
          <SlideMenu
            isOpen={showAddForm}
            onClose={() => {
              setShowAddForm(false);
              setSelectedItem(undefined);
              setSelectedCategory(undefined);
            }}>
            {type === "items" && (
              <MenuItemForm
                categories={categories}
                item={selectedItem}
                orgId={restaurant.org_id}
              />
            )}
            {type === "categories" && (
              <MenuCategoryForm
                category={selectedCategory}
                orgId={restaurant.org_id}
              />
            )}
          </SlideMenu>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-svh w-full max-w-xl pb-24">
      <NavHeader
        restaurant={restaurant}
        onChangeRestaurant={setRestaurantObject}
      />
      {getContent()}
    </div>
  );
}

//-translate-x-1/2
