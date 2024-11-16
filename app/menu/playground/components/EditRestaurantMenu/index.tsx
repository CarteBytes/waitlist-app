"use client";

import { RestaurantT } from "../../types/restaurant";
import { MenuSectionT, MenuT } from "../../types/menu";
import NavHeader from "../NavHeader";
import { useState } from "react";
import TogglePill from "../TogglePill";
import { ItemT } from "../../types/item";
import { FaEye, FaEyeSlash, FaFloppyDisk, FaPlus } from "react-icons/fa6";
import SlideMenu from "../SlideMenu";
import MenuItemForm from "../MenuItemForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import MenuCategoryForm from "../MenuCategoryForm";
import LiberoMenu from "../LiberoMenu";
import { ItemCategoryT } from "../../types/category";
import AddMenuEntity from "../AddMenuEntity";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { isObjectURL, retrieveFile } from "@/lib/utils";
import ContentCard from "./ContentCard";
import ItemCard from "./ItemCard";

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
  const [modPageIndex, setModPageIndex] = useState<null | number>(null);
  const menuFormIsDirty = JSON.stringify(menuObject) !== JSON.stringify(menu);
  const restaurantFormIsDirty =
    JSON.stringify(restaurantObject) !== JSON.stringify(restaurant);

  const onResetSideMenu = () => {
    setShowAddForm(false);
    setModPageIndex(null);
    setSelectedItem(undefined);
    setSelectedCategory(undefined);
  };

  const getData = () => {
    let data: any[] = [];
    if (type === "items") {
      data = items;
    } else if (type === "categories") {
      data = categories;
    } else if (type === "menu") {
      data = menuObject.content.sort((a, b) => a.page_index - b.page_index);
    }

    return data ?? [];
  };

  const switchIndices = (indexA: number, indexB: number) => {
    const newMenuContent = menuObject.content.map((section) => {
      const newSection = { ...section };
      if (newSection.page_index === indexA) {
        newSection.page_index = indexB;
      } else if (newSection.page_index === indexB) {
        newSection.page_index = indexA;
      }
      return newSection;
    });

    const newMenu = { ...menu, content: newMenuContent };
    setMenuObject(newMenu);
  };

  const handleClickPreview = () => {
    setShowPreview(true);
  };

  const handleClickAdd = () => {
    setShowAddForm(true);
  };

  const handleDeletePage = (deletePageIndex: number) => {
    let newMenuContent = menuObject.content.filter(
      (section) => section.page_index !== deletePageIndex,
    );

    newMenuContent = newMenuContent.map((section) => {
      const newSection = { ...section };
      if (newSection.page_index >= deletePageIndex) {
        newSection.page_index = newSection.page_index - 1;
      }
      return newSection;
    });

    const newMenu = { ...menuObject, content: newMenuContent };
    setMenuObject(newMenu);
  };

  const handleAddPage = (page: any) => {
    const newMenuContent = menuObject.content.map((section) => {
      const newSection = { ...section };
      if (newSection.page_index >= modPageIndex!) {
        newSection.page_index = newSection.page_index + 1;
      }
      return newSection;
    });

    const newPage: MenuSectionT = {
      id: uuidv4(),
      page_index: modPageIndex!,
      section_index: 0,
      ...page,
    };

    newMenuContent.push(newPage);
    const newMenu = {
      ...menuObject,
      content: newMenuContent,
    };
    setModPageIndex(null);
    setMenuObject(newMenu);
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

  const handleSave = async () => {
    const saveRestaurant = async () => {
      return fetch(`/api/restaurants/${restaurant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isObjectURL(restaurantObject.logo_url)
            ? {
                ...restaurant,
                ...restaurantObject,
                file: await retrieveFile(restaurantObject.logo_url, true),
              }
            : { ...restaurant, ...restaurantObject },
        ),
      });
    };

    const saveMenu = () => {
      return fetch(`/api/menus/${menu.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...menu,
          ...menuObject,
        }),
      });
    };

    toast.promise(
      () => {
        return saveMenu();
      },
      {
        loading: "Saving your changes...",
        success: (data) => {
          return "Changes have been saved! 🎉";
        },
        error: (error) => {
          return "An error occurred while saving. Please try again 😢.";
        },
      },
    );
  };

  const handleClickCard = (entity: any) => {
    if (type === "items") {
      setSelectedItem(entity);
    } else if (type === "categories") {
      setSelectedCategory(entity);
    } else if (type === "menu") {
      return;
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
          <div className="flex items-center justify-between">
            <h2 className="pb-3 pt-6 text-2xl capitalize">
              {type} ({getData()?.length ?? 0})
            </h2>
            {(menuFormIsDirty || restaurantFormIsDirty) && (
              <EnhancedButton
                variant="expandIcon"
                Icon={FaFloppyDisk}
                onClick={handleSave}
                iconPlacement="right"
                className="my-8 w-max bg-[#F6FE9B] text-black">
                Publish
              </EnhancedButton>
            )}
          </div>

          <div className="flex flex-col gap-3" ref={parent}>
            {getData().length === 0 && (
              <p className="px-10 text-center text-lg text-[#F6FE9B]">
                Here you can add your first{" "}
                {type === "menu"
                  ? "piece of content to your menu and preview it"
                  : type === "items"
                    ? "item and assign it to a category"
                    : "category, you should do so before continuing"}
              </p>
            )}
            {getData()?.map((item, idx) =>
              type === "menu" ? (
                <ContentCard
                  switchIndices={switchIndices}
                  index={idx}
                  handleDelete={handleDeletePage}
                  key={item.id}
                  handleClickAdd={handleClickAdd}
                  handleClickCard={handleClickCard}
                  setModPageIndex={setModPageIndex}
                  el={item}
                  isLast={idx === getData()?.length - 1}
                />
              ) : (
                <ItemCard
                  key={item.id}
                  handleClickCard={handleClickCard}
                  item={item}
                />
              ),
            )}

            {type === "menu" && menuFormIsDirty && (
              <button
                className="mt-16 cursor-pointer rounded-lg px-6 py-3 text-[#F6FE9B] underline"
                onClick={(e) => {
                  e.preventDefault();
                  menuObject.content.forEach(
                    (c) =>
                      c.category?.image_url &&
                      URL.revokeObjectURL(c.category?.image_url),
                  );
                  setMenuObject(menu);
                }}>
                Revert menu changes
              </button>
            )}
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
              onClick={
                type === "menu" && menuObject.content.length > 0
                  ? handleClickPreview
                  : handleClickAdd
              }
              className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-4 text-xl text-black">
              {type === "menu" && menuObject.content.length > 0 ? (
                <FaEye />
              ) : (
                <FaPlus />
              )}
            </button>
          </div>
        </div>
        <div>
          <SlideMenu isOpen={showAddForm} onClose={onResetSideMenu}>
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
              <AddMenuEntity
                availableCategories={categories}
                handleAddPage={handleAddPage}
                onResetSideMenu={onResetSideMenu}
              />
            )}
          </SlideMenu>
        </div>
      </>
    );
  };

  return (
    <div
      className={`min-h-svh w-full max-w-xl ${showPreview ? "pb-0" : "pb-24"}`}>
      <NavHeader
        originalRestaurant={restaurant}
        restaurant={restaurantObject}
        onChangeRestaurant={setRestaurantObject}
      />
      {getContent()}
    </div>
  );
}

//-translate-x-1/2
