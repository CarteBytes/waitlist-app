import { ItemT } from "./item";

export type MenuT = {
  id: string;
  language: "en" | "es";
  theme: string;
  name: string;
  description: string;
  content: MenuSectionT[];
};

export type MenuSectionT = {
  id?: string;
  page_index: number;
  section_index: number;
  hero_image?: string;
  items?: ItemT[];
  category?: MenuCategoryT;
  created_at?: number;
};

export type MenuCategoryT = {
  id?: string;
  org_id?: string;
  name?: string;
  price?: string;
  description?: string;
  image_url?: string;
};
