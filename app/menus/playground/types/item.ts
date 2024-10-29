export type ItemT = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  calories?: string;
  category?: string;
  allergens?: string;
  image_url?: string;
  dietary_labels?: string[];
  availability?: string; // AVAILABLE, UNAVAILABLE
  status?: string; // ACTIVE, DRAFT, ARCHIVED
};
