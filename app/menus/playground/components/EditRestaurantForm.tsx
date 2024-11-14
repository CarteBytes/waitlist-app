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
// import { EnhancedButton } from "@/components/ui/enhanced-btn";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import autoAnimate from "@formkit/auto-animate";
import ImageUploadComponent from "./ImageUploadComponent";
// import Link from "next/link";

const EditRestaurantForm = ({
  restaurant,
  onChangeRestaurant,
}: {
  restaurant: RestaurantT;
  onChangeRestaurant: (newRest: RestaurantT) => void;
}) => {
  const [File, setFile] = useState<null | File>(null);
  const [socialToggles, setSocialToggles] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    tiktok: false,
    youtube: false,
    whatsapp: false,
  });
  const parent = useRef(null);

  const form = useForm({
    resolver: zodResolver(insertRestaurantSchema),
    defaultValues: restaurant, // Set default values from the restaurant prop
  });

  useEffect(() => {
    setSocialToggles({
      facebook: !!restaurant?.facebook_url,
      instagram: !!restaurant?.instagram_url,
      whatsapp: !!restaurant?.whatsapp_url,
      youtube: !!restaurant?.youtube_url,
      tiktok: !!restaurant?.tiktok_url,
      twitter: !!restaurant?.twitter_url,
    });
  }, []);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRestaurant = {
      ...restaurant,
      [name]: value,
    };
    onChangeRestaurant(updatedRestaurant);
  };

  const handleToggleSocial = (socialKey: keyof typeof socialToggles) => {
    const newVal = !socialToggles[socialKey];

    const updatedKeys = {
      ...socialToggles,
      [socialKey]: newVal,
    };
    setSocialToggles(updatedKeys);

    if (!newVal) {
      const socialUrlKeyMap = {
        facebook: "facebook_url",
        instagram: "instagram_url",
        whatsapp: "whatsapp_url",
        youtube: "youtube_url",
        twitter: "twitter_url",
        tiktok: "tiktok_url",
      };

      const updatedRestaurant = {
        ...restaurant,
        [socialUrlKeyMap[socialKey]]: "",
      };
      onChangeRestaurant(updatedRestaurant);
    }
  };

  const onSubmit = (data: any) => {
    // Handle form submission logic
    console.log("Restaurant updated:", data);
  };
  return (
    <div className="min-h-screen w-full max-w-xl overflow-hidden bg-[#F6FE9B] px-8 pb-8 pt-4 text-black">
      <h1 className="text-xl font-bold">Edit Restaurant Details</h1>
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
                name="primary_color"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-0 w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.primary_color}
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

              <FormField
                control={form.control}
                name="secondary_color"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Secondary Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.secondary_color}
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
              <FormField
                control={form.control}
                name="accent_color"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Accent Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.accent_color}
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
              <FormField
                control={form.control}
                name="primary_text_color"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Primary Text Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.primary_text_color}
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
              <FormField
                control={form.control}
                name="secondary_text_color"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Secondary Text Color</FormLabel>
                    <FormControl>
                      <Input
                        className="w-12 p-0"
                        type="color"
                        {...field}
                        value={restaurant.secondary_text_color}
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
            <div className="mt-3 flex flex-col gap-y-3" ref={parent}>
              {socialToggles.facebook && (
                <FormField
                  control={form.control}
                  name="facebook_url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-0">
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Facebook URL"
                          {...field}
                          value={restaurant.facebook_url}
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
              )}

              {socialToggles.instagram && (
                <FormField
                  control={form.control}
                  name="instagram_url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-0">
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Instagram URL"
                          {...field}
                          value={restaurant.instagram_url}
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
              )}

              {socialToggles.twitter && (
                <FormField
                  control={form.control}
                  name="twitter_url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-0">
                      <FormLabel>Twitter URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Twitter URL"
                          {...field}
                          value={restaurant.twitter_url}
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
              )}

              {socialToggles.tiktok && (
                <FormField
                  control={form.control}
                  name="tiktok_url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-0">
                      <FormLabel>TikTok URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="TikTok URL"
                          {...field}
                          value={restaurant.tiktok_url}
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
              )}

              {socialToggles.youtube && (
                <FormField
                  control={form.control}
                  name="youtube_url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-0">
                      <FormLabel>Youtube URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Youtube URL"
                          {...field}
                          value={restaurant.youtube_url}
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
              )}

              {socialToggles.whatsapp && (
                <FormField
                  control={form.control}
                  name="whatsapp_url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-0">
                      <FormLabel>WhatsApp URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="WhatsApp URL"
                          {...field}
                          value={restaurant.whatsapp_url}
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
              )}
            </div>

            <ImageUploadComponent
              file_={restaurant?.logo_url}
              onFileChange={(newFile: any) => setFile(newFile)}
            />
          </div>

          {/* <Link href="/">
            <EnhancedButton
              variant="expandIcon"
              Icon={FaArrowRight}
              type="submit"
              iconPlacement="right"
              className="mt-12 w-full">
              Go to waitlist
            </EnhancedButton>
          </Link> */}
        </form>
      </Form>
    </div>
  );
};

export default EditRestaurantForm;
