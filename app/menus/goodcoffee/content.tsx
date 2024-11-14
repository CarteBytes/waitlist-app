import { MenuT } from "../playground/types/menu";
import { RestaurantT } from "../playground/types/restaurant";

export const RESTAURANT: RestaurantT = {
  org_id: "123",
  id: "123",
  font_family: "Oswald",
  name: "The Good Coffee Company",
  phone: "(256)508-8925",
  address: "320 Arch St",
  city: "Philadelphia",
  currency_prefix: "$",
  state: "PA",
  zip_code: "19106",
  logo_url: "https://i.ibb.co/sHR6PzX/Logo-Color.png",
  primary_color: "#e1701d",
  secondary_color: "#ffffff",
  primary_text_color: "#e1701d",
  secondary_text_color: "#000000",
  accent_color: "#435e33",
  facebook_url: "",
  instagram_url: "",
  tiktok_url: "",
  whatsapp_url: "",
  twitter_url: "",
  youtube_url: "",
};

export const MENU: MenuT = {
  id: "menuid" + Math.floor(Math.random() * 1000),
  theme: "Libero",
  language: "en",
  name: "The Good Coffee Co. Menu",
  description: "The basic menu for our Coffee Shop",
  content: [
    {
      page_index: 0,
      section_index: 0,
      hero_image: "https://i.ibb.co/qJFHDGW/Logo-Mockup-Black.png",
      group_title: "THE CLASSICS",
      items: [
        {
          category_id: "2",
          id: "1",
          name: "DRIP",
          description:
            "Light roast drip coffee that will leave you feeling refreshed. Comes with a stick of gum to help that coffee breath ;) (12 oz.)",
          price: "2",
          calories: "0-ish",
        },
        {
          category_id: "2",
          id: "12",
          name: "POUR OVER",
          description:
            "Hot water poured over freshly ground coffee? sounds like a dream. (8 oz.)",
          price: "3",
          calories: "0-ish",
        },
        {
          category_id: "2",
          id: "13",
          name: "CAPPUCCINO",
          description: "Espresso + Steamed Milk = YUM. (6 oz.)",
          price: "4",
          calories: "112",
        },
        {
          category_id: "2",
          id: "14",
          name: "Vanilla Latte",
          description:
            "The classic Vanilla Latte with our house-made syrup. Hot or iced. (12 oz.)",
          price: "4.50",
          calories: "210",
        },
      ],
    },
    {
      page_index: 1,
      section_index: 0,
      hero_image: "https://i.ibb.co/8BM0VPW/Logo-Mockup-Black-copy.png",
      group_title: "HOUSE SIGNATURES",
      items: [
        {
          category_id: "2",
          id: "15",
          name: "Hidden Grounds",
          description: "Iced Vanilla latte with Cinnamon cold Foam (12 oz.)",
          price: "5",
        },
        {
          category_id: "2",
          id: "16",
          name: "S’mores Cookie Latte",
          description:
            "S’mores shaken espresso with Cookie crumbles on top of the cold foam. (12 oz).",
          price: "5",
        },
        {
          category_id: "2",
          id: "17",
          name: "The 1 and 1",
          description: "a cortado and an extra shot of espresso on the side",
          price: "4",
        },
        {
          category_id: "2",
          id: "18",
          name: "TopoSpresso",
          description:
            "Espresso and TopoChico tonic water. A classic combo. (6 oz)",
          price: "4",
        },
      ],
    },
    {
      page_index: 1,
      section_index: 1,
      group_title: "Everything Else",
      items: [
        {
          category_id: "2",
          id: "19",
          name: "Chai Tea Latte",
          description:
            "Notes of cinnamon and vanilla. Make it dirty and we’ll throw some espresso in it. (12 oz)",
          price: "5",
        },
        {
          category_id: "2",
          id: "110",
          name: "Maple Brown Sugar Shaken Espresso",
          description:
            "Notes of maple syrup and brown sugar with cinnamon cold foam. (12 oz.)",
          price: "5",
        },
        {
          category_id: "2",
          id: "111",
          name: "Matcha Latte",
          description: "Notes of grass (this is a joke.) and vanilla. (12 oz.)",
          price: "5",
        },
        {
          category_id: "2",
          id: "112",
          name: "Americano",
          description: "Classic espresso and water. (8 oz.)",
          price: "4",
        },
      ],
    },
    {
      page_index: 2,
      section_index: 0,
      hero_image: "https://i.ibb.co/ZzzQmYF/Logo-Black.png",
      group_title: "Bakery",
      items: [
        {
          category_id: "2",
          id: "113",
          name: "Egg Bites",
          description: "Eggs, cheese, bacon bits. What’s not to like?.",
          price: "4",
        },
        {
          category_id: "2",
          id: "114",
          name: "S’mores Cookie.",
          description: "House Made and delicious.",
          price: "3",
        },
        {
          category_id: "2",
          id: "115",
          name: "Oreo Cookie",
          description: "Cookies and cream!",
          price: "3",
        },
        {
          category_id: "2",
          id: "116",
          name: "Blueberry Muffin",
          description: "You can already taste this just thinking about it.",
          price: "3",
        },
        {
          category_id: "2",
          id: "117",
          name: "Chocolate Chip Muffin)",
          description: "Like the blueberry one but with chocolate.",
          price: "3",
        },
      ],
    },
    {
      page_index: 3,
      section_index: 0,
      hero_image: "https://i.ibb.co/CbvmPH7/Logo-White.png",
    },
  ],
};
