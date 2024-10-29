import { ItemT } from "./item";

export type MenuT = {
  id: string;
  theme: string;
  name: string;
  description: string;
  content: MenuContentT[];
};

export type MenuContentT = {
  page_index: number;
  // section_index: number; // for more fine grained ordering within a page?
  hero_image?: string;
  sub_image?: string;
  group_title?: string;
  group_price?: string;
  group_description?: string;
  items?: ItemT[];
  extra_details?: string;
  extra_price?: string;
};
