"use client";

import { EnhancedButton } from "@/components/ui/enhanced-btn";
import React, { useState } from "react";
import { FaArrowRight, FaBowlFood, FaImage } from "react-icons/fa6";
import { ItemCategoryT } from "../types/category";
import ImageUploadComponent from "./ImageUploadComponent";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddMenuEntity({
  availableCategories,
  handleAddPage,
  onResetSideMenu,
}: {
  availableCategories: ItemCategoryT[];
  handleAddPage: (newPage: any) => void;
  onResetSideMenu: () => void;
}) {
  const [file, setFile] = useState<null | File>(null);
  const [addEntityKey, setAddEntityKey] = useState<null | "category" | "image">(
    null,
  );
  const [entity, setEntity] = useState();

  const onConfirm = () => {
    let newPage: any = {
      category: entity,
    };
    if (addEntityKey === "image") {
      newPage = {
        category: {
          image_url: file ? URL.createObjectURL(file) : null,
        },
      };
    }

    handleAddPage(newPage);
    onResetSideMenu();
  };

  const getContent = () => {
    if (addEntityKey === "category") {
      return (
        <>
          <h1 className="text-xl font-bold">
            Select the category you would like inserted
          </h1>
          <div className="mt-3">
            <Select
              onValueChange={(newVal: string) => {
                setEntity(
                  availableCategories.find((c) => c.id === newVal) as any,
                );
              }}
              value={entity ? (entity as any).id : undefined}>
              <SelectTrigger className="text-yellow-100">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup className="text-yellow-100">
                  {availableCategories?.map((ac) => (
                    <SelectItem key={ac.id} value={ac.id!}>
                      {ac.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <EnhancedButton
            onClick={onConfirm}
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
            <ImageUploadComponent
              onFileChange={(newFile) => setFile(newFile)}
            />
          </div>
          <EnhancedButton
            onClick={onConfirm}
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
            iconPlacement="right">
            Category
          </EnhancedButton>
          <EnhancedButton
            onClick={() => setAddEntityKey("image")}
            variant="expandIcon"
            Icon={FaImage}
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
