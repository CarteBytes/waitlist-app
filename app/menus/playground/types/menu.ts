import { FoodItemT } from "./foodItem";

export type MenuT = {
  id: string;
  pages: MenuPageT[];
  content: MenuContentT[];
};

export type MenuContentT = {
  page_index: number;
  hero_image?: string;
  sub_image?: string;
  group_title?: string;
  group_price?: string;
  food_items?: FoodItemT[];
};

export type MenuPageT = { sections: MenuPageSectionT[] };

export type MenuPageSectionT =
  | {
      type: "hero_image";
      src: string;
    }
  | {
      type: "food_items";
      group_title?: string;
      group_price?: string;
      content: {
        type: "food_item";
        name: string;
        price?: string;
        description?: string;
        calories?: string;
      }[];
    };
