"use client";

import { EnhancedButton } from "@/components/ui/enhanced-btn";
import React, { useState } from "react";
import { FaArrowRight, FaBowlFood, FaImage } from "react-icons/fa6";
import { ItemCategoryT } from "../types/category";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUploadComponent from "./ImageUploadComponent";

function AddMenuEntity({
  availableCategories,
}: {
  availableCategories: ItemCategoryT[];
}) {
  const [addEntityKey, setAddEntityKey] = useState<null | "category" | "image">(
    null,
  );

  const getContent = () => {
    if (addEntityKey === "category") {
      return (
        <>
          <h1 className="text-xl font-bold">
            Select the categories you would like inserted
          </h1>
          <div className="mt-3 flex flex-col gap-y-3">
            {availableCategories?.map((ac) => (
              <div className="flex items-center space-x-2" key={ac.id}>
                <Checkbox className="relative h-7 w-7 appearance-none rounded border-2 border-black checked:border-black checked:bg-black checked:text-[#F6FE9B] focus:ring-0" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {ac.name}
                  </label>
                  {/* <p className="text-sm text-muted-foreground">
                    {ac.description}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
          <EnhancedButton
            variant="expandIcon"
            Icon={FaArrowRight}
            iconPlacement="right"
            className="my-8 w-full">
            Confirm
          </EnhancedButton>
        </>
      );
    } else if (addEntityKey === "image") {
      return (
        <>
          <h1 className="text-xl font-bold">
            Upload an image you would like to insert
          </h1>
          <div className="mt-3">
            <ImageUploadComponent />
          </div>
          <EnhancedButton
            variant="expandIcon"
            Icon={FaArrowRight}
            iconPlacement="right"
            className="my-8 w-full">
            Confirm
          </EnhancedButton>
        </>
      );
    }

    return (
      <>
        <h1 className="text-xl font-bold">What would you like to insert?</h1>
        <div className="mt-3 flex flex-col gap-y-3">
          <EnhancedButton
            onClick={() => setAddEntityKey("category")}
            variant="expandIcon"
            Icon={FaBowlFood}
            type="submit"
            iconPlacement="right">
            Category
          </EnhancedButton>
          <EnhancedButton
            onClick={() => setAddEntityKey("image")}
            variant="expandIcon"
            Icon={FaImage}
            type="submit"
            iconPlacement="right">
            Image
          </EnhancedButton>
        </div>
      </>
    );
  };

  return (
    <div className="max-w-xl bg-[#F6FE9B] px-8 pt-4 text-black">
      {getContent()}
    </div>
  );
}

export default AddMenuEntity;
