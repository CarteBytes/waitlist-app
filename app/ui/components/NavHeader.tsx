import React, { useState } from "react";
import { FaCircleUser, FaSignal, FaStore } from "react-icons/fa6";
import SlideMenu from "./SlideMenu";
import EditRestaurantForm from "./EditRestaurantForm";
import { RestaurantT } from "../types/restaurant";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { useAuth } from "@/app/context/useAuth";

function NavHeader({
  originalRestaurant,
  restaurant,
  onChangeRestaurant,
}: {
  originalRestaurant?: RestaurantT;
  restaurant: RestaurantT;
  onChangeRestaurant: (newRes: RestaurantT) => void;
}) {
  const { logout } = useAuth();
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const restaurantFormIsDirty =
    JSON.stringify(restaurant) !== JSON.stringify(originalRestaurant);

  return (
    <>
      <div className="sticky top-0 z-10 flex h-20 items-center justify-between border-b-2 bg-[#F6FE9B] px-8 shadow-2xl">
        <button
          onClick={() => setShowRestaurantForm(true)}
          className="rounded-full bg-black p-2 text-xl text-[#F6FE9B]">
          <FaStore className="text-2xl" />
        </button>
        <img
          alt={`${restaurant.name} logo`}
          src="/logo.svg"
          className="mx-auto h-12 w-auto"
        />{" "}
        <button onClick={() => setShowUserForm(true)} className="">
          <FaCircleUser className="h-[40px] w-[40px] text-black" />
        </button>
      </div>
      <SlideMenu
        slideFrom="right"
        isOpen={showUserForm}
        onClose={() => setShowUserForm(false)}>
        <div className="px-8 pt-4">
          <h1 className="text-xl font-bold">User</h1>
          <div className="mt-3 flex flex-col gap-y-3">
            <EnhancedButton
              onClick={logout}
              variant="expandIcon"
              Icon={FaSignal}
              iconPlacement="right">
              Log out
            </EnhancedButton>
          </div>
        </div>
      </SlideMenu>
      <SlideMenu
        slideFrom="left"
        isOpen={showRestaurantForm}
        onClose={() => setShowRestaurantForm(false)}>
        <EditRestaurantForm
          restaurant={restaurant}
          onChangeRestaurant={onChangeRestaurant!}
          onSubmitCallback={() => setShowRestaurantForm(false)}
        />
        {originalRestaurant && restaurantFormIsDirty && (
          <div className="flex w-full justify-center">
            <button
              className="mx-auto mb-8 mt-16 cursor-pointer rounded-lg px-6 py-3 text-black underline"
              onClick={(e) => {
                e.preventDefault();
                onChangeRestaurant({ ...originalRestaurant });
              }}>
              Revert restaurant changes
            </button>
          </div>
        )}
      </SlideMenu>
    </>
  );
}

export default NavHeader;
