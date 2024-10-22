import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { ZodError } from "zod";

// Define the table
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Define the types and schemas
export type TOrganization = typeof organizations.$inferInsert;
export const insertOrganizationSchema = createInsertSchema(organizations);

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    // Validate the request body using the schema
    const parsedData = insertOrganizationSchema.parse(body); // Will throw if validation fails

    const { name } = parsedData;

    // Validate the request
    if (!name) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 },
      );
    }

    // Insert organization into the database
    const [newOrganization] = await db
      .insert(organizations)
      .values(parsedData) // Insert the name into the table
      .returning(); // Get the inserted organization back

    // Return the newly created organization
    return NextResponse.json(newOrganization, { status: 201 });
  } catch (error) {
    console.error("Error creating organization:", error);
    if (error instanceof ZodError) {
      // Handle validation errors
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import {
//   pgTable,
//   text,
//   timestamp,
//   serial,
//   jsonb,
//   integer,
// } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { ZodError } from "zod";
// import { organizations } from "../organizations/route";
// import { eq, and } from "drizzle-orm";
// import { z } from "zod";

// // Define the table
// export const menus = pgTable("menus", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").default(""), // Optional description
//   pages: jsonb("pages").notNull(), // Storing the pages structure as JSONB
//   created_at: timestamp("created_at").defaultNow().notNull(),
//   org_id: integer("organization_id")
//     .references(() => organizations.id)
//     .notNull(), // Foreign key
// });

// // Define the schema for inserting menus
// export type TMenu = typeof menus.$inferInsert;
// export const insertMenuSchema = createInsertSchema(menus);

// export async function POST(req: NextRequest) {
//   const checkOrgExists = async (orgId: number) => {
//     const organizationExists = await db
//       .select()
//       .from(organizations)
//       .where(eq(organizations.id, orgId))
//       .limit(1);
//     if (organizationExists.length === 0) {
//       return NextResponse.json(
//         { error: "Organization not found" },
//         { status: 404 },
//       );
//     }
//   };

//   try {
//     // Parse request body
//     const body = await req.json();
//     // Validate the request body using the schema
//     const parsedData = insertMenuSchema.parse(body); // Will throw if validation fails

//     const { name, pages, org_id } = parsedData;

//     // Check if the organization exists
//     checkOrgExists(org_id);

//     // Validate the request
//     if (!name || !pages) {
//       return NextResponse.json(
//         { error: "Menu name and pages are required" },
//         { status: 400 },
//       );
//     }

//     // Insert menu into the database
//     const [newMenu] = await db.insert(menus).values(parsedData).returning(); // Return the inserted menu

//     // Return the newly created menu
//     return NextResponse.json(newMenu, { status: 201 });
//   } catch (error) {
//     console.error("Error creating menu:", error);
//     if (error instanceof ZodError) {
//       // Handle validation errors
//       return NextResponse.json({ error: error.errors }, { status: 400 });
//     }
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// // GET request to fetch a menu for an organization
// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const menuId = searchParams.get("id");
//   const orgId = searchParams.get("org_id");

//   try {
//     if (!menuId || !orgId) {
//       return NextResponse.json(
//         { error: "Menu ID and Org ID are required" },
//         { status: 400 },
//       );
//     }

//     const menu = await db
//       .select()
//       .from(menus)
//       .where(
//         and(eq(menus.id, parseInt(menuId)), eq(menus.org_id, parseInt(orgId))),
//       )
//       .limit(1);

//     if (menu.length === 0) {
//       return NextResponse.json({ error: "Menu not found" }, { status: 404 });
//     }

//     return NextResponse.json(menu[0], { status: 200 });
//   } catch (error) {
//     console.error("Error fetching menu:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// // PUT request to update a menu
// export const updateMenuSchema = z.object({
//   id: z
//     .number({ required_error: "Menu ID is required" })
//     .positive({ message: "Menu ID must be a positive number" }),
//   name: z.string().min(1, "Menu name is required").optional(), // Optional but must be at least 1 character if provided
//   description: z.string().optional(), // Optional description
//   pages: z
//     .array(
//       z.object({
//         sections: z.array(
//           z.object({
//             type: z.string().min(1, "Section type is required"),
//             src: z.string().optional(), // Optional for images
//             text: z.string().optional(), // Optional for text sections
//             content: z
//               .array(
//                 z.object({
//                   type: z.string().min(1, "Content type is required"),
//                   name: z.string().optional(),
//                   description: z.string().optional(),
//                   price: z.string().optional(),
//                   calories: z.string().optional(),
//                 }),
//               )
//               .optional(),
//           }),
//         ),
//       }),
//     )
//     .optional(), // Optional if you're not updating pages
//   organization_id: z
//     .number({ required_error: "Organization ID is required" })
//     .positive({ message: "Organization ID must be a positive number" }),
// });

// export async function PUT(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const menuId = searchParams.get("id");
//   const orgId = searchParams.get("org_id");

//   try {
//     if (!menuId || !orgId) {
//       return NextResponse.json(
//         { error: "Menu ID and Organization ID are required" },
//         { status: 400 },
//       );
//     }

//     const body = await req.json();
//     updateMenuSchema.parse(body); // Validate

//     const updatedMenu = await db
//       .update(menus)
//       .set(body)
//       .where(
//         and(eq(menus.id, parseInt(menuId)), eq(menus.org_id, parseInt(orgId))),
//       )
//       .returning();

//     if (!updatedMenu.length) {
//       return NextResponse.json({ error: "Menu not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedMenu[0], { status: 200 });
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return NextResponse.json({ error: error.errors }, { status: 400 });
//     }
//     console.error("Error updating menu:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// // DELETE request to delete a menu
// export async function DELETE(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const menuId = searchParams.get("id");
//   const orgId = searchParams.get("org_id");

//   try {
//     if (!menuId || !orgId) {
//       return NextResponse.json(
//         { error: "Menu ID and Organization ID are required" },
//         { status: 400 },
//       );
//     }

//     const deletedMenu = await db
//       .delete(menus)
//       .where(
//         and(eq(menus.id, parseInt(menuId)), eq(menus.org_id, parseInt(orgId))),
//       )
//       .returning();

//     if (!deletedMenu.length) {
//       return NextResponse.json({ error: "Menu not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Menu deleted successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error deleting menu:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
