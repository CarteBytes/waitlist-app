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
  sub_image?: string;
  group_title?: string;
  group_price?: string;
  group_description?: string;
  items?: ItemT[];
  extra_details?: string;
  extra_price?: string;
};
