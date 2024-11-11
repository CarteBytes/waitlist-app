"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { insertItemSchema } from "@/schemas/item"; // Adjust the schema for MenuItem
import { ItemCategoryT } from "../types/category";
import { useState } from "react";
import { ItemT } from "../types/item";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { FaArrowRight } from "react-icons/fa6";

const MenuItemForm = ({
  item,
  categories,
  orgId,
}: {
  orgId: string;
  item?: ItemT;
  categories: ItemCategoryT[]; // List of categories
}) => {
  const [menuItemForm, setMenuItemForm] = useState<ItemT>(
    item ?? {
      name: "",
      description: "",
      calories: "",
      price: null,
      category_id: null,
    },
  );

  const onChangeMenuItem = (updatedMenuItem: ItemT) => {
    setMenuItemForm(updatedMenuItem);
  };

  const form = useForm({
    resolver: zodResolver(insertItemSchema), // Use a MenuItem schema
    defaultValues: menuItemForm,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updatedMenuItem = {
      ...menuItemForm,
      [name]: name === "price" ? Number(value) : value, // Ensure numbers for calories and price
    };
    onChangeMenuItem(updatedMenuItem);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(item);

    const {
      name,
      description,
      calories,
      category_id,
      image_url,
      price,
      status,
    } = menuItemForm;
    if (!!item) {
      console.log("hiho");
      toast.promise(
        () =>
          fetch(`/api/items/${item.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              org_id: orgId,
              name,
              description,
              calories,
              category_id,
              image_url,
              price,
              status,
            }),
          }),
        {
          loading: "Updating item...",
          success: (data) => {
            return "Your item has been updated! 🎉";
          },
          error: (error) => {
            return "An error occurred while updating. Please try again 😢.";
          },
        },
      );
    } else {
      toast.promise(
        () =>
          fetch(`/api/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ org_id: orgId, ...menuItemForm }),
          }),
        {
          loading: "Creating item...",
          success: (data) => {
            return "Your item has been created! 🎉";
          },
          error: (error) => {
            return "An error occurred while creating. Please try again 😢.";
          },
        },
      );
    }
  };

  return (
    <div className="h-full max-w-xl overflow-hidden bg-[#F6FE9B] px-8 pt-4 text-black">
      <h1 className="text-xl font-bold">{!!item ? "Edit" : "Add"} Menu Item</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="mt-3 flex flex-col gap-y-3">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Item name"
                      {...field}
                      value={menuItemForm.name}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Item description"
                      {...field}
                      value={menuItemForm.description}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Calories */}
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Calories"
                      {...field}
                      value={menuItemForm.calories}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      value={menuItemForm.price!}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      name="category"
                      value={menuItemForm.category}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                      className="border p-2">
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <EnhancedButton
            variant="expandIcon"
            Icon={FaArrowRight}
            type="submit"
            iconPlacement="right"
            className="mt-12 w-full">
            Submit
          </EnhancedButton>
        </form>
      </Form>
    </div>
  );
};

export default MenuItemForm;
