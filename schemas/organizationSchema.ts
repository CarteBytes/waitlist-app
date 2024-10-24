import { organizations } from "@/models/organization";
import { createInsertSchema } from "drizzle-zod";

export const insertOrganizationSchema = createInsertSchema(organizations);
