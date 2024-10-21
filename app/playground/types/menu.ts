export type MenuT = {
  id: string;
  type: string;
  pages: { sections: MenuPageSectionT[] }[];
};

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
