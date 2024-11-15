"use client";

import { RestaurantT } from "../../types/restaurant";
import { MenuSectionT, MenuT } from "../../types/menu";
import NavHeader from "../NavHeader";
import { useState } from "react";
import TogglePill from "../TogglePill";
import { ItemT } from "../../types/item";
import {
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa6";
import SlideMenu from "../SlideMenu";
import MenuItemForm from "../MenuItemForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import MenuCategoryForm from "../MenuCategoryForm";
import LiberoMenu from "../LiberoMenu";
import { ItemCategoryT } from "../../types/category";
import AddMenuEntity from "../AddMenuEntity";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

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

  const handleClickAdd = () => {
    if (type === "menu") {
      setShowPreview(true);
    } else {
      setShowAddForm(true);
    }
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
    toast.promise(
      () =>
        fetch(`/api/menus/${menu.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...menu,
            content: menu.content.map((section) => ({
              ...section,
              items: section.items?.map((item) => item.id),
            })),
          }),
        }),
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
            {type === "menu" &&
              JSON.stringify(menuObject) !== JSON.stringify(menu) && (
                <button
                  className="bg-black text-[#F6FE9B]"
                  onClick={(e) => {
                    e.preventDefault();
                    menuObject.content.forEach(
                      (c) =>
                        c.category?.image_url &&
                        URL.revokeObjectURL(c.category?.image_url),
                    );
                    setMenuObject(menu);
                  }}>
                  Revert all changes
                </button>
              )}
          </div>

          <div className="flex flex-col gap-3" ref={parent}>
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
              className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-4 text-xl text-black">
              {type === "menu" ? <FaEye /> : <FaPlus />}
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
        restaurant={restaurant}
        onChangeRestaurant={setRestaurantObject}
      />
      {getContent()}
    </div>
  );
}

const ContentCard = ({
  el,
  index,
  handleClickCard,
  handleDelete,
  setModPageIndex,
  handleClickAdd,
  isLast,
  switchIndices,
}: {
  el: any;
  handleDelete: (pageIndex: number) => void;
  index: number;
  handleClickCard: Function;
  handleClickAdd: () => void;
  isLast?: boolean;
  setModPageIndex: (page: number | null) => void;
  switchIndices: (idxA: number, idxB: number) => void;
}) => {
  const imageUrl = el?.hero_image ?? el?.category?.image_url ?? null;

  return (
    <>
      <div className={`flex h-8 items-center justify-center`}>
        <button
          className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-2"
          onClick={() => {
            handleClickAdd();
            setModPageIndex(index);
          }}>
          <FaPlus className="text-lg text-black" />
        </button>
      </div>
      <div className="relative">
        <div
          className="flex w-full cursor-pointer rounded-lg border-2 border-[#F6FE9B] p-4"
          onClick={() => {
            handleClickCard(el);
          }}>
          {/* Image Section */}
          {imageUrl && (
            <div className="mr-4 flex-shrink-0">
              <img
                alt={"content image"}
                src={imageUrl}
                className="h-16 w-16 rounded-lg object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{el.category?.name}</div>
              {!!el.status && (
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      el.status === "published" ? "bg-green-400" : "bg-red-600"
                    }`}
                  />
                </div>
              )}
            </div>
            <div className="opacity-70">{el.category?.description}</div>
          </div>

          <div className="flex items-center">
            {index !== 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  switchIndices(index, index - 1);
                }}
                className="mr-2 rounded-full bg-[#F6FE9B] p-2 text-xl text-black">
                <FaArrowUp />
              </button>
            )}
            {!isLast && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  switchIndices(index, index + 1);
                }}
                className="rounded-full bg-[#F6FE9B] p-2 text-xl text-black">
                <FaArrowDown />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-[-24px] right-2">
          <button
            className="mr-1 mt-[-9px] text-sm text-[#F6FE9B] underline disabled:text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(index);
            }}>
            Remove
          </button>
        </div>
      </div>
      {isLast && (
        <div className={`flex h-10 items-center justify-center`}>
          <button
            className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-2"
            onClick={() => {
              handleClickAdd();
              setModPageIndex(index + 1);
            }}>
            <FaPlus className="text-lg text-black" />
          </button>
        </div>
      )}
    </>
  );
};

const ItemCard = ({
  item,
  handleClickCard,
}: {
  item: ItemCategoryT | ItemT;
  handleClickCard: (i: ItemCategoryT | ItemT) => void;
}) => {
  return (
    <div
      className="flex w-full cursor-pointer rounded-lg border-2 border-[#F6FE9B] p-4"
      onClick={() => {
        handleClickCard(item);
      }}>
      {/* Image Section */}
      {item.image_url && (
        <div className="mr-4 flex-shrink-0">
          <img
            alt={`${item.name} image`}
            src={item.image_url}
            className="h-16 w-16 rounded-lg object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{item.name}</div>
          {!!(item as ItemT).status && (
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`h-3 w-3 rounded-full ${
                  (item as ItemT).status === "published"
                    ? "bg-green-400"
                    : "bg-red-600"
                }`}
              />
            </div>
          )}
        </div>
        <div className="opacity-70">{item.description}</div>
      </div>
      {/* <div className="mt-1 flex justify-end">
                  <button
                    className="flex items-center gap-2 rounded-lg text-sm text-[#F6FE9B] underline disabled:text-gray-500"
                    onClick={(e) => handleRemoval(e, item)}>
                    {type === "menu" ? "Remove" : "Delete"}
                    {type === "menu" ? <FaCircleMinus /> : <FaTrash />}
                  </button>
                </div> */}
    </div>
  );
};

//-translate-x-1/2
