"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleUser,
  FaFloppyDisk,
  FaStore,
} from "react-icons/fa6";
import { RestaurantT, SupportedFontFamilies } from "../../types/restaurant";
import { MenuT } from "../../types/menu";
import EditRestaurantForm from "../EditRestaurantForm";
import { dynaPuff, oswald } from "@/app/ui/fonts";
import LiberoMenu from "../LiberoMenu";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import TitlePage from "./TitlePage";
import ContentPages from "./ContentPages";
import FooterPage from "./FooterPage";
import SlideMenu from "../SlideMenu";

const getFontFamily = (fontFamily: SupportedFontFamilies) => {
  if (fontFamily === "DynaPuff") return dynaPuff.className;
  return oswald.className;
};

export default function EditLiberoMenu({
  restaurant,
  menu,
  onChangeMenu,
  onChangeRestaurant,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
  onChangeMenu?: (newMenu: MenuT) => void;
  onChangeRestaurant?: (newRes: RestaurantT) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isSpanish = menu.language === "es";

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

  let content = (
    <>
      {/* <EditRestaurantForm
        restaurant={restaurant}
        onChangeRestaurant={onChangeRestaurant!}
      /> */}
      <div
        id="menu"
        className={`${getFontFamily(restaurant.font_family)} overflow-hidden antialiased`}
        style={{ color: restaurant.primary_text_color }}>
        <TitlePage restaurant={restaurant} isSpanish={isSpanish} />
        <ContentPages
          onChangeMenu={onChangeMenu}
          restaurant={restaurant}
          menu={menu}
        />
        <FooterPage restaurant={restaurant} />
        {/* <FooterLogoCTA lang={menu.language} /> */}
      </div>
    </>
  );

  if (showPreview) {
    content = <LiberoMenu restaurant={restaurant} menu={menu} />;
  }

  return (
    <div className="w-full max-w-xl">
      {!showPreview && (
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b-2 bg-[#F6FE9B] px-8 shadow-2xl">
          <button
            onClick={() => setShowMenu(true)}
            className="rounded-full bg-black p-2 text-xl text-[#F6FE9B]">
            <FaStore />
          </button>
          <img src="/logo.svg" className="mx-auto h-11 w-auto" />{" "}
          <FaCircleUser className="h-[36px] w-[36px] text-black" />
        </div>
      )}
      <SlideMenu isOpen={showMenu} onClose={() => setShowMenu(false)}>
        <EditRestaurantForm
          restaurant={restaurant}
          onChangeRestaurant={onChangeRestaurant!}
        />
      </SlideMenu>
      {content}

      <div
        className={
          "sticky bottom-0 flex h-16 items-center justify-between border-t-2 bg-[#F6FE9B] px-8 shadow-2xl"
        }>
        <EnhancedButton
          variant="expandIcon"
          Icon={showPreview ? FaArrowLeft : FaArrowRight}
          type="submit"
          iconPlacement={showPreview ? "left" : "right"}
          className="mr-2"
          onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Back to Editor" : "Show Preview"}
        </EnhancedButton>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaFloppyDisk}
          type="submit"
          iconPlacement="right"
          onClick={handleSave}>
          Save
        </EnhancedButton>
      </div>
    </div>
  );
}
