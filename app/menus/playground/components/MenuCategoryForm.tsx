"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ChangeEvent, FormEvent, useState } from "react";
import { ItemT } from "../types/item";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { FaArrowRight } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { revalidateTag } from "next/cache";
import { Textarea } from "@/components/ui/textarea";

const MenuCategoryForm = ({
  category,
  orgId,
}: {
  orgId: string;
  category?: ItemCategoryT;
}) => {
  const [menuCategoryForm, setMenuCategoryForm] = useState<ItemCategoryT>(
    category ?? {
      name: "",
      description: "",
      price: null,
      status: "unpublished",
    },
  );

  const onChangeMenuItem = (updatedMenuItem: ItemCategoryT) => {
    setMenuCategoryForm(updatedMenuItem);
  };

  const form = useForm({
    resolver: zodResolver(insertItemSchema), // Use a MenuItem schema
    defaultValues: menuCategoryForm,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    const updatedMenuItem = {
      ...menuCategoryForm,
      [name]: value, // Ensure numbers for calories and price
    };
    onChangeMenuItem(updatedMenuItem);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, description, image_url, price } = menuCategoryForm;
    if (!!category) {
      toast.promise(
        () =>
          fetch(`/api/categories/${category.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              org_id: orgId,
              name,
              description,
              image_url,
              price: price ? +price : null,
            }),
          }),
        {
          loading: "Updating category...",
          success: (data) => {
            return "Your category has been updated! 🎉";
          },
          error: (error) => {
            return "An error occurred while updating. Please try again 😢.";
          },
        },
      );
    } else {
      toast.promise(
        () =>
          fetch(`/api/categories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ org_id: orgId, ...menuCategoryForm }),
          }),
        {
          loading: "Creating category...",
          success: (data) => {
            return "Your category has been created! 🎉";
          },
          error: (error) => {
            return "An error occurred while creating. Please try again 😢.";
          },
        },
      );
    }
  };

  return (
    <div className="max-w-xl bg-[#F6FE9B] px-8 pt-4 text-black">
      <h1 className="text-xl font-bold">
        {!!category ? "Edit" : "Add"} Menu Category
      </h1>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="mt-3 flex flex-col gap-y-3">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={menuCategoryForm.name}
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
                    <Textarea
                      {...field}
                      value={menuCategoryForm.description}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
            {/* <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={menuCategoryForm.calories}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={menuCategoryForm.price ?? ""}
                      onChange={(e: any) => {
                        // Remove non-numeric characters except for decimal points
                        let formattedValue = e.target.value.replace(
                          /[^0-9.]/g,
                          "",
                        );

                        // Limit to one decimal point in the input
                        if ((formattedValue.match(/\./g) || []).length > 1)
                          return;

                        // If there's a decimal point, restrict to two decimal places
                        if (formattedValue.includes(".")) {
                          const [integerPart, decimalPart] =
                            formattedValue.split(".");
                          formattedValue =
                            decimalPart.length > 2
                              ? `${integerPart}.${decimalPart.slice(0, 2)}`
                              : formattedValue;
                        }

                        const formattedEvent = {
                          ...e,
                          target: {
                            ...e.target,
                            value: formattedValue,
                            name: "price",
                          },
                        };

                        // Set value to the formatted string
                        field.onChange(formattedEvent);
                        handleInputChange(formattedEvent);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="text-white placeholder:text-gray-600">
                  <FormLabel className="text-black">Publish Status</FormLabel>
                  <Select
                    onValueChange={(newVal: "published" | "unpublished") => {
                      field.onChange(newVal);
                      onChangeMenuItem({ ...menuCategoryForm, status: newVal });
                    }}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for this item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"unpublished"}>
                          Unpublished
                        </SelectItem>
                        <SelectItem value={"published"}>Published</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Control if your content is visible to users or not.
                  </FormDescription>
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
            className="my-8 w-full">
            Submit
          </EnhancedButton>
        </form>
      </Form>
    </div>
  );
};

export default MenuCategoryForm;
