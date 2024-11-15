import React, { useState } from "react";
import { FaCircleUser, FaStore } from "react-icons/fa6";
import SlideMenu from "./SlideMenu";
import EditRestaurantForm from "./EditRestaurantForm";
import { RestaurantT } from "../types/restaurant";
import Image from "next/image";

function NavHeader({
  restaurant,
  onChangeRestaurant,
}: {
  restaurant: RestaurantT;
  onChangeRestaurant: (newRes: RestaurantT) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10 flex h-20 items-center justify-between border-b-2 bg-[#F6FE9B] px-8 shadow-2xl">
        <button
          onClick={() => setShowMenu(true)}
          className="rounded-full bg-black p-2 text-xl text-[#F6FE9B]">
          <FaStore />
        </button>
        <img
          alt={`${restaurant.name} logo`}
          src="/logo.svg"
          className="mx-auto h-12 w-auto"
        />{" "}
        <FaCircleUser className="h-[36px] w-[36px] text-black" />
      </div>
      <SlideMenu
        slideFrom="left"
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}>
        <EditRestaurantForm
          restaurant={restaurant}
          onChangeRestaurant={onChangeRestaurant!}
        />
      </SlideMenu>
    </>
  );
}

export default NavHeader;
