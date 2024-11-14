"use client";

import { RestaurantT } from "../../types/restaurant";
import { MenuT } from "../../types/menu";
import NavHeader from "../NavHeader";
import { useState } from "react";
import TogglePill from "../TogglePill";
import { ItemT } from "../../types/item";
import {
  FaCircleMinus,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import SlideMenu from "../SlideMenu";
import MenuItemForm from "../MenuItemForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import MenuCategoryForm from "../MenuCategoryForm";
import LiberoMenu from "../LiberoMenu";
import { ItemCategoryT } from "../../types/category";
import AddMenuEntity from "../AddMenuEntity";

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
  const [type, setType] = useState("categories");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showRemovalModal, setShowRemovalModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [restaurantObject, setRestaurantObject] = useState(restaurant);
  const [menuObject, setMenuObject] = useState(menu);

  const getData = () => {
    let data: any[] = [];
    if (type === "items") {
      data = items;
    } else if (type === "categories") {
      data = categories;
    } else if (type === "menu") {
      data = [];
    }

    return data ?? [];
  };

  const handleClickAdd = () => {
    setShowAddForm(true);
  };

  const handleRemoval = (e: any, entity: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (type === "items") {
      setSelectedItem(entity);
    } else if (type === "categories") {
      setSelectedCategory(entity);
    } else if (type === "menu") {
    }
    setShowRemovalModal(true);
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
          <h2 className="pb-3 pt-6 text-2xl capitalize">
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
                {item.image_url && (
                  <img
                    src={item.image_url}
                    className="h-16 w-auto object-cover"
                  />
                )}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">{item.name}</div>
                  {!!item.status && (
                    <div className="flex items-center gap-2 text-sm">
                      {/* Publish status: */}
                      <div
                        className={`h-3 w-3 rounded-full ${item.status === "published" ? "bg-green-400" : "bg-red-600"}`}
                      />
                    </div>
                  )}
                </div>
                <div className="opacity-70">{item.description}</div>
                {/* <div className="mt-1 flex justify-end">
                  <button
                    className="flex items-center gap-2 rounded-lg text-sm text-[#F6FE9B] underline disabled:text-gray-500"
                    onClick={(e) => handleRemoval(e, item)}>
                    {type === "menu" ? "Remove" : "Delete"}
                    {type === "menu" ? <FaCircleMinus /> : <FaTrash />}
                  </button>
                </div> */}
              </div>
            ))}
          </div>

          <div className="fixed bottom-6 left-3 z-10 transform">
            <TogglePill
              op1={{ label: "Categories", value: "categories" }}
              op2={{ label: "Items", value: "items" }}
              op3={{ label: "Menu", value: "menu" }}
              value={type}
              handleToggle={setType}
            />
          </div>
          <div className="fixed bottom-[22px] right-3 z-10 transform">
            <button
              onClick={handleClickAdd}
              className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-4">
              <FaPlus className="text-xl text-black" />
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
            {type === "menu" && (
              <AddMenuEntity availableCategories={categories} />
            )}
          </SlideMenu>
        </div>
      </>
    );
  };

  return (
    <div className={`min-h-svh w-full max-w-xl pb-24`}>
      <NavHeader
        restaurant={restaurant}
        onChangeRestaurant={setRestaurantObject}
      />
      {getContent()}
    </div>
  );
}

//-translate-x-1/2
