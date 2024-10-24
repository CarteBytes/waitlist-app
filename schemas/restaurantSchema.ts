import { restaurants } from "@/models/restaurant";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// export const restaurantSchema = z.object({
//   org_id: z.string().min(1),
//   name: z.string().min(1),
//   phone: z.string(),
//   address: z.string(),
//   city: z.string(),
//   state: z.string().length(2),
//   zipCode: z.string().length(5),
//   currencyPrefix: z.string().optional(),
//   logo: z.string().url().optional(),
//   colors: z.object({
//     primary: z.string().length(7),
//     secondary: z.string().length(7),
//     primary_text: z.string().length(7),
//     secondary_text: z.string().length(7),
//     accent: z.string().length(7),
//   }),
//   socials: z.object({
//     facebookUrl: z.string().url().optional(),
//     instagramUrl: z.string().url().optional(),
//     tiktokUrl: z.string().url().optional(),
//     whatsappUrl: z.string().url().optional(),
//     twitterUrl: z.string().url().optional(),
//     youtubeUrl: z.string().url().optional(),
//   }),
// });

export const insertRestaurantSchema = createInsertSchema(restaurants);
