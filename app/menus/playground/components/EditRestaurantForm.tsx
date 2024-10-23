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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { FaFloppyDisk } from "react-icons/fa6";

const restaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  primaryTextColor: z.string().optional(),
  secondaryTextColor: z.string().optional(),
  accentColor: z.string().optional(),
  facebookUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  whatsappUrl: z.string().url().optional(),
});

const EditRestaurantForm = ({
  restaurant,
  onChangeRestaurant,
}: {
  restaurant: RestaurantT;
  onChangeRestaurant: (newRest: RestaurantT) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(restaurantSchema),
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
