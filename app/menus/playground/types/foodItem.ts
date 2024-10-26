export type FoodItemT = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  min_calories?: number;
  max_calories?: number;
  category?: string;
  allergens?: string;
  image_url?: string;
  dietary_labels?: string[];
  availability?: string; // AVAILABLE, UNAVAILABLE
  status?: string; // ACTIVE, DRAFT, ARCHIVED
};
