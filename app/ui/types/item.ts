import { ItemCategoryT } from "./category";

export type ItemT = {
  id?: string;
  name: string;
  description?: string;
  price: number | null;
  category_id: string | null;
  calories?: string;
  category?: ItemCategoryT;
  allergens?: string;
  image_url?: string;
  dietary_labels?: string[];
  availability?: string; // AVAILABLE, UNAVAILABLE
  status?: string; // PUBLISHED, UNPUBLISHED, ARCHIVED
};
