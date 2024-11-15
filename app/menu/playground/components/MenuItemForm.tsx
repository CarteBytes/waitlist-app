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
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
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
import ImageUploadComponent from "./ImageUploadComponent";
import { convertToBase64 } from "@/lib/utils";

const MenuItemForm = ({
  item,
  categories,
  orgId,
}: {
  orgId: string;
  item?: ItemT;
  categories: ItemCategoryT[]; // List of categories
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [menuItemForm, setMenuItemForm] = useState<ItemT>(
    item ?? {
      name: "",
      description: "",
      calories: "",
      price: null,
      category_id: null,
      status: "unpublished",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    const updatedMenuItem = {
      ...menuItemForm,
      [name]: value, // Ensure numbers for calories and price
    };
    onChangeMenuItem(updatedMenuItem);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let base64 = null;
    if (file) {
      base64 = await convertToBase64(file);
    }

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
              price: price ? +price : null,
              status,
              file: base64,
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
            revalidateTag("orgItems");
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
    <div className="max-w-xl bg-[#F6FE9B] px-8 pt-4 text-black">
      <h1 className="text-xl font-bold">{!!item ? "Edit" : "Add"} Menu Item</h1>
      <Form {...form}>
        <form onSubmit={onSubmit}>
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
                    <Textarea
                      {...field}
                      className="text-yellow-100"
                      value={menuItemForm.description}
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
                      value={menuItemForm.price ?? ""}
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

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }: any) => (
                <FormItem className="text-white">
                  <FormLabel className="text-black">Category</FormLabel>
                  <Select
                    onValueChange={(newVal: string) => {
                      field.onChange(newVal);
                      onChangeMenuItem({ ...menuItemForm, status: newVal });
                    }}
                    value={menuItemForm.category_id ?? undefined}>
                    <FormControl className="text-yellow-100">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for this item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup className="text-yellow-100">
                        {categories?.map((c) => (
                          <SelectItem key={c.id} value={c.id!}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage categories in the categories section.
                  </FormDescription>
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
                    onValueChange={(newVal: string) => {
                      field.onChange(newVal);
                      onChangeMenuItem({ ...menuItemForm, status: newVal });
                    }}
                    defaultValue={field.value}>
                    <FormControl className="text-yellow-100">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for this item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup className="text-yellow-100">
                        <SelectItem value={"unpublished"}>
                          Unpublished
                        </SelectItem>
                        <SelectItem value={"published"}>Published</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-600">
                    Control if your content is visible to users or not.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <ImageUploadComponent
              file_={item?.image_url}
              onFileChange={(newFile: any) => setFile(newFile)}
            /> */}
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

export default MenuItemForm;
