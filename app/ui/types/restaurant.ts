export type RestaurantT = {
  id: string;
  org_id: string;
  name: string;
  phone: string;
  font_family: SupportedFontFamilies;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  primary_text_color: string;
  secondary_text_color: string;
  accent_color: string;
  currency_prefix: "$" | "L. ";
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  whatsapp_url?: string;
  twitter_url?: string;
  youtube_url?: string;
};

export type SupportedFontFamilies = "DynaPuff" | "Oswald" | "Libre Baskerville";
