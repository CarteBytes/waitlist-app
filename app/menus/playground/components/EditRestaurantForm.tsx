"use client";

import { RestaurantT } from "../types/restaurant";
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
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import {
  FaFacebook,
  FaFloppyDisk,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { useState } from "react";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";

const EditRestaurantForm = ({
  restaurant,
  onChangeRestaurant,
}: {
  restaurant: RestaurantT;
  onChangeRestaurant: (newRest: RestaurantT) => void;
}) => {
  const [socialToggles, setSocialToggles] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    tiktok: false,
    youtube: false,
    whatsapp: false,
  });

  const form = useForm({
    resolver: zodResolver(insertRestaurantSchema),
    defaultValues: restaurant, // Set default values from the restaurant prop
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRestaurant = {
      ...restaurant,
      [name]: value,
    };
    onChangeRestaurant(updatedRestaurant);
  };

  const handleSocialsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    socialKey: string,
  ) => {
    const { value } = e.target;
    const updatedRestaurant = {
      ...restaurant,
      socials: { ...restaurant.socials, [socialKey]: value },
    };
    onChangeRestaurant(updatedRestaurant);
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorKey: string,
  ) => {
    const { value } = e.target;
    const updatedRestaurant = {
      ...restaurant,
      colors: { ...restaurant.colors, [colorKey]: value },
    };
    onChangeRestaurant(updatedRestaurant);
  };

  const handleToggleSocial = (socialKey: keyof typeof socialToggles) => {
    const updatedKeys = {
      ...socialToggles,
      [socialKey]: !socialToggles[socialKey],
    };
    setSocialToggles(updatedKeys);
  };

  const onSubmit = (data: any) => {
    // Handle form submission logic
    console.log("Restaurant updated:", data);
  };
  return (
    <div className="min-h-screen w-full max-w-xl overflow-hidden bg-[#F6FE9B] p-8 text-black">
      <img src="/logo.svg" className="mx-auto h-12 w-auto" />

      <h1 className="mt-8 text-xl font-bold">Edit Restaurant Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Restaurant Details */}
          <div className="mt-3 flex flex-col gap-y-3">
            {/* <h1 className="text-xl font-bold">Edit Restaurant Details</h1> */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Restaurant name"
                      {...field}
                      value={restaurant.name}
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      {...field}
                      value={restaurant.phone}
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

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Restaurant address"
                      {...field}
                      value={restaurant.address}
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

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      value={restaurant.city}
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

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-0">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="State"
                      {...field}
                      value={restaurant.state}
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
          </div>

          {/* Colors */}
          <div>
            <h2 className="text-lg font-semibold">Colors</h2>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="colors.primary"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-0 w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.colors.primary}
                        onChange={(e) => {
                          field.onChange(e);
                          handleColorChange(e, "primary");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors.secondary"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Secondary Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.colors.secondary}
                        onChange={(e) => {
                          field.onChange(e);
                          handleColorChange(e, "secondary");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors.accent"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Accent Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.colors.accent}
                        onChange={(e) => {
                          field.onChange(e);
                          handleColorChange(e, "accent");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors.primary_text"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Primary Text Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.colors.primary_text}
                        onChange={(e) => {
                          field.onChange(e);
                          handleColorChange(e, "primary_text");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors.secondary_text"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Secondary Text Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.colors.secondary_text}
                        onChange={(e) => {
                          field.onChange(e);
                          handleColorChange(e, "secondary_text");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold">Social Media Links</h2>
            <div className="my-6 flex justify-between">
              <FaFacebook
                size="1.5em"
                className={
                  socialToggles.facebook ? "opacity-100" : "opacity-40"
                }
                onClick={() => handleToggleSocial("facebook")}
              />
              <FaInstagram
                size="1.5em"
                className={
                  socialToggles.instagram ? "opacity-100" : "opacity-40"
                }
                onClick={() => handleToggleSocial("instagram")}
              />
              <FaTwitter
                size="1.5em"
                className={socialToggles.twitter ? "opacity-100" : "opacity-40"}
                onClick={() => handleToggleSocial("twitter")}
              />
              <FaTiktok
                size="1.5em"
                className={socialToggles.tiktok ? "opacity-100" : "opacity-40"}
                onClick={() => handleToggleSocial("tiktok")}
              />
              <FaYoutube
                size="1.5em"
                className={socialToggles.youtube ? "opacity-100" : "opacity-40"}
                onClick={() => handleToggleSocial("youtube")}
              />
              <FaWhatsapp
                size="1.5em"
                className={
                  socialToggles.whatsapp ? "opacity-100" : "opacity-40"
                }
                onClick={() => handleToggleSocial("whatsapp")}
              />
            </div>
            <div className="mt-3 flex flex-col gap-y-3">
              <FormField
                control={form.control}
                name="socials.facebookUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-0">
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Facebook URL"
                        {...field}
                        value={restaurant.socials.facebookUrl}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSocialsChange(e, "facebookUrl");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.instagramUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-0">
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Instagram URL"
                        {...field}
                        value={restaurant.socials.instagramUrl}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSocialsChange(e, "instagramUrl");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.twitterUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-0">
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Twitter URL"
                        {...field}
                        value={restaurant.socials.twitterUrl}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSocialsChange(e, "twitterUrl");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.tiktokUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-0">
                    <FormLabel>TikTok URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TikTok URL"
                        {...field}
                        value={restaurant.socials.tiktokUrl}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSocialsChange(e, "tiktokUrl");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.youtubeUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-0">
                    <FormLabel>Youtube URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Youtube URL"
                        {...field}
                        value={restaurant.socials.youtubeUrl}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSocialsChange(e, "youtubeUrl");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.whatsappUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-0">
                    <FormLabel>WhatsApp URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="WhatsApp URL"
                        {...field}
                        value={restaurant.socials.whatsappUrl}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSocialsChange(e, "whatsappUrl");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <EnhancedButton
            variant="expandIcon"
            Icon={FaFloppyDisk}
            type="submit"
            iconPlacement="right"
            className="w-full">
            Save changes
          </EnhancedButton>
        </form>
      </Form>
    </div>
  );
};

export default EditRestaurantForm;
