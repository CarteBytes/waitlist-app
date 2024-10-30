import { MenuT } from "./types/menu";
import { RestaurantT } from "./types/restaurant";

export const RESTAURANT: RestaurantT = {
  id: "123",
  font_family: "Oswald",
  name: "Raising Cane's",
  phone: "(615) 882-3050",
  address: "36 White Bridge Pike",
  city: "Nashville",
  currency_prefix: "$",
  state: "TN",
  zip_code: "37205",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Raising_Cane%27s_Chicken_Fingers_logo.svg/1200px-Raising_Cane%27s_Chicken_Fingers_logo.svg.png",
  primary_color: "#E82531",
  secondary_color: "#E82531",
  primary_text_color: "#FFFFFF",
  secondary_text_color: "#0A0808",
  accent_color: "#FFF01B",
  facebook_url: "https://www.facebook.com/RaisingCanesChickenFingers",
  instagram_url: "https://www.instagram.com/raisingcanes/",
  tiktok_url: "https://www.tiktok.com/@raisingcanes",
  whatsapp_url: "",
  twitter_url: "https://twitter.com/raisingcanes",
  youtube_url: "https://www.youtube.com/user/RaisingCanesOneLove",
};

export const MENU: MenuT = {
  id: "menuid" + Math.floor(Math.random() * 1000),
  theme: "Libero",
  language: "en",
  name: "Raising Cane's General Menu",
  description: "The basic menu for Raising canes",
  content: [
    {
      page_index: 0,
      hero_image:
        "https://images.prismic.io/raisingcanes/MDMyNTQxNjQtMjAyMi00OTFjLTkxZWYtMmQzNDMzMmY0MmUx_d17f94cb-3ccb-48fd-92e4-ffde94917322_food-prep-basic-hero.jpg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C2500%2C1000&w=1280&h=512",
      group_title: "COMBOS",
      items: [
        {
          id: "1",
          name: "THE BOX COMBO®",
          description:
            "4 Chicken Fingers, Crinkle-Cut Fries, One Cane’s Sauce®, Texas Toast, Coleslaw, Regular Fountain Drink/Tea (22 oz.)",
          price: "10.98",
          calories: "1250 - 1440",
        },
        {
          id: "12",
          name: "THE CANIAC™ COMBO",
          description:
            "6 Chicken Fingers, Crinkle-Cut Fries, 2 Cane’s Sauce®, Texas Toast, Coleslaw, Large Fountain Drink/Tea (32 oz.)",
          price: "14.98",
          calories: "1250 - 1440",
        },
        {
          id: "13",
          name: "THE 3 FINGER COMBO®",
          description:
            "3 Chicken Fingers, Crinkle-Cut Fries, One Cane’s Sauce®, Texas Toast, Regular Fountain Drink/Tea (22 oz.)",
          price: "7.98",
          calories: "1250 - 1440",
        },
        {
          id: "14",
          name: "THE SANDWICH COMBO",
          description:
            "3 Chicken Fingers, Cane’s Sauce®, Lettuce, Toasted Bun, Crinkle-Cut Fries, Regular Fountain Drink/Tea (22 oz.)",
          price: "9.98",
          calories: "1250 - 1440",
        },
      ],
    },
    {
      page_index: 1,
      hero_image:
        "https://images.prismic.io/raisingcanes/3558ffdc-ea93-48c6-81a3-56a848ba9adf_Tailgate%20(1).png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C1681%2C1681&w=720&h=720",
      group_title: "TAILGATES™",
      items: [
        {
          id: "15",
          name: "25 Chicken Fingers",
          description: "25 of our fresh, never frozen Chicken Fingers.",
          price: "33.99",
        },
        {
          id: "16",
          name: "50 Chicken Fingers",
          description: "50 of our fresh, never frozen Chicken Fingers.",
          price: "65.99",
        },
        {
          id: "17",
          name: "75 Chicken Fingers",
          description: "75 of our fresh, never frozen Chicken Fingers.",
          price: "95.99",
        },
        {
          id: "18",
          name: "100 Chicken Fingers",
          description: "100 of our fresh, never frozen Chicken Fingers.",
          price: "127.99",
        },
      ],
    },
    {
      page_index: 1,
      group_title: "EXTRAS",
      items: [
        {
          id: "19",
          name: "Cane's Sauce®",
          description: "Our signature Cane's Sauce® made fresh daily.",
          price: "0.39",
        },
        {
          id: "110",
          name: "Crinkle-Cut Fries",
          description: "Golden, crinkle-cut fries made fresh.",
          price: "1.49",
        },
        {
          id: "111",
          name: "Texas Toast",
          description: "Thick-cut, buttered, and grilled Texas toast.",
          price: "0.99",
        },
        {
          id: "112",
          name: "Coleslaw",
          description: "Crispy, tangy coleslaw made fresh daily.",
          price: "0.99",
        },
      ],
    },
    {
      page_index: 2,
      hero_image:
        "https://gibbonsgazette.org/wp-content/uploads/2024/01/Screenshot-2024-01-30-3.24.48-PM.png",
      group_title: "DRINKS",
      items: [
        {
          id: "113",
          name: "Fountain Drink (22 oz.)",
          description: "A refreshing selection of fountain drinks.",
          price: "1.79",
        },
        {
          id: "114",
          name: "Fountain Drink (32 oz.)",
          description: "A large refreshing selection of fountain drinks.",
          price: "2.09",
        },
        {
          id: "115",
          name: "Sweet Tea (22 oz.)",
          description: "Freshly brewed sweet tea, southern style.",
          price: "1.79",
        },
        {
          id: "116",
          name: "Sweet Tea (32 oz.)",
          description: "Freshly brewed sweet tea, southern style.",
          price: "2.09",
        },
        {
          id: "117",
          name: "Lemonade (22 oz.)",
          description: "Freshly squeezed lemonade made daily.",
          price: "2.19",
        },
      ],
    },
    {
      page_index: 3,
      hero_image:
        "https://thumbs.dreamstime.com/b/raising-cane-s-joliet-il-joliet-il-usa-november-raising-cane-s-american-fast-food-restaurant-chain-specializes-262380147.jpg",
    },
  ],
};
