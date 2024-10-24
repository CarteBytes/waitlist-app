// export const RESTAURANT = {
//   id: "123",
//   name: "Monterrey Mexican Restaurant",
//   phone: "(615) 567-1848",
//   address: "1800 Antioch Pike",
//   city: "Nashville",
//   state: "TN",
//   zip_code: "37802",
//   logo: "https://monterreycocina.com/wp-content/uploads/2024/04/logo-monterrey-color.png",
//   colors: {
//     primary: "#EF4544",
//     secondary: "#45090B",
//     primary_text: "#FFF4E8",
//     secondary_text: "#000000",
//     accent: "#F8B500",
//   },
//   socials: {
//     facebook: "",
//     instagram: "",
//     tiktok: "",
//     whatsapp: "",
//   },
// };

import { MenuT } from "./types/menu";
import { RestaurantT } from "./types/restaurant";

export const RESTAURANT: RestaurantT = {
  id: "123",
  name: "Raising Cane's",
  phone: "(615) 567-1848",
  address: "1800 Antioch Pike",
  city: "Nashville",
  currency_prefix: "$",
  state: "TN",
  zip_code: "37802",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Raising_Cane%27s_Chicken_Fingers_logo.svg/1200px-Raising_Cane%27s_Chicken_Fingers_logo.svg.png",
  colors: {
    primary: "#E82531",
    secondary: "#E82531",
    primary_text: "#FFFFFF",
    secondary_text: "#0A0808",
    accent: "#FFF01B",
  },
  socials: {
    facebookUrl: "https://www.facebook.com/RaisingCanesChickenFingers",
    instagramUrl: "https://www.instagram.com/raisingcanes/",
    tiktokUrl: "https://www.tiktok.com/@raisingcanes",
    whatsappUrl: "",
    twitterUrl: "https://twitter.com/raisingcanes",
    youtubeUrl: "https://www.youtube.com/user/RaisingCanesOneLove",
  },
};

function getRandomImage() {
  const images = [
    "https://cdn.sanity.io/images/bs9rmafh/main/01d3971a4ed2b314478887f8585cd22b2799e1d2-2335x3500.jpg?w=2335&h=3500&auto=format",
    "https://wheelhousegrandrapids.com/wp-content/uploads/2022/03/Restaurant-Food-1000x615.jpg",
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  ];
  return images[Math.floor(Math.random() * images.length)];
}

function getRandomFood() {
  const foods = [
    "Costilla de Cerdo",
    "Chorizo Criollo",
    "Ensalada Mixta",
    "Bife de Chorizo",
    "Milanesa de Pollo",
    "Empanadas",
    "Asado de Tira",
  ];
  return foods[Math.floor(Math.random() * foods.length)];
}

function getRandomPrice() {
  const hasPrice = Math.random() > 0.5; // 50% chance to have a price
  if (hasPrice) {
    return (Math.random() * 30 + 10).toFixed(2); // Price between 10.00 and 40.00
  }
  return null; // No price
}

function getRandomDescription() {
  const descriptions = [
    "A succulent grilled pork rib.",
    "Freshly made with traditional Argentine spices.",
    "A mix of fresh vegetables with a light vinaigrette.",
    "A classic Argentine steak, cooked to perfection.",
    "Crispy breaded chicken cutlet, golden fried.",
    "Homemade empanadas with a flaky crust.",
    "Slow-cooked short ribs, juicy and tender.",
  ];
  const hasDescription = Math.random() > 0.5; // 50% chance to have a description
  return hasDescription
    ? descriptions[Math.floor(Math.random() * descriptions.length)]
    : null;
}

function getRandomSection() {
  const sectionTypes = [
    { type: "hero_image", src: getRandomImage() },
    { type: "foods_title", text: "PARILLA DON MARIO" },
    { type: "section_title", text: "PARILLADAS" },
    {
      type: "food_items",
      content: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => {
        const foodItem: any = { type: "food_item", name: getRandomFood() };

        // Optionally add price
        const price = getRandomPrice();
        if (price) {
          foodItem.price = price;
        }

        // Optionally add description
        const description = getRandomDescription();
        if (description) {
          foodItem.description = description;
        }

        return foodItem;
      }),
    },
  ];

  // Randomly select a section type
  return sectionTypes[Math.floor(Math.random() * sectionTypes.length)];
}

function generateRandomMenu(pagesCount = 3, sectionsPerPage = 3) {
  const pages = [];

  for (let i = 0; i < pagesCount; i++) {
    const sections = Array.from({ length: sectionsPerPage }, getRandomSection);
    pages.push({ sections });
  }

  return {
    id: "menuid" + Math.floor(Math.random() * 1000),
    type: "menu",
    pages,
  };
}

// export const MENU = generateRandomMenu(
//   Math.floor(Math.random() * 10) + 1,
//   Math.floor(Math.random() * 3) + 1,
// );

function getImageBySection(sectionName: string) {
  const sectionImages = {
    PARILLADAS:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg",
    ENTRADAS:
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640772.jpg&fm=jpg",
    POSTRES:
      "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=",
  };
  return (
    sectionImages[sectionName as "PARILLADAS"] ||
    "https://default-image-url.com"
  ); // Fallback in case section name isn't found
}

function getFoodsForSection(sectionName: string) {
  const sectionFoods = {
    PARILLADAS: [
      {
        name: "Costilla de Cerdo",
        description: "Juicy pork ribs, grilled to perfection.",
        price: "22.99",
      },
      {
        name: "Asado de Tira",
        description: "Classic Argentine short ribs.",
        price: "25.50",
      },
      {
        name: "Bife de Chorizo",
        description: "Prime Argentine steak with bold flavors.",
        price: "29.00",
      },
    ],
    ENTRADAS: [
      {
        name: "Chorizo Criollo",
        description: "Traditional Argentine sausage.",
        price: "7.50",
      },
      {
        name: "Empanadas",
        description: "Homemade empanadas with beef filling.",
        price: "3.99",
      },
    ],
    POSTRES: [
      {
        name: "Flan Casero",
        description: "Classic caramel flan.",
        price: "6.99",
      },
      {
        name: "Chocotorta",
        description: "Argentine layered chocolate cake.",
        price: "8.50",
      },
    ],
  };

  return sectionFoods[sectionName as "PARILLADAS"] || [];
}

function generateMenu() {
  const pages = [
    {
      sections: [
        {
          type: "hero_image",
          src: getImageBySection("ENTRADAS"),
        },

        {
          type: "food_items",
          content: getFoodsForSection("ENTRADAS"),
          title: "ENTRADAS",
        },
      ],
    },
    {
      sections: [
        {
          type: "hero_image",
          src: getImageBySection("PARILLADAS"),
        },
        {
          type: "food_items",
          content: getFoodsForSection("PARILLADAS"),
          title: "PARILLADAS",
        },
        {
          type: "food_items",
          content: getFoodsForSection("PARILLADAS"),
          title: "TACOS",
        },
        {
          type: "food_items",
          content: getFoodsForSection("PARILLADAS"),
          title: "PLATILLOS",
        },
      ],
    },

    {
      sections: [
        {
          type: "hero_image",
          src: getImageBySection("POSTRES"),
        },
        { type: "section_title", text: "DESSERTS" },
        {
          type: "food_items",
          content: getFoodsForSection("POSTRES"),
        },
      ],
    },
  ];

  return {
    id: "menuid" + Math.floor(Math.random() * 1000),
    type: "menu",
    pages,
  };
}

// export const MENU = generateMenu();

export const MENU: MenuT = {
  id: "menuid" + Math.floor(Math.random() * 1000),
  type: "menu",
  pages: [
    {
      sections: [
        {
          type: "hero_image",
          src: "https://images.prismic.io/raisingcanes/MDMyNTQxNjQtMjAyMi00OTFjLTkxZWYtMmQzNDMzMmY0MmUx_d17f94cb-3ccb-48fd-92e4-ffde94917322_food-prep-basic-hero.jpg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C2500%2C1000&w=1280&h=512",
        },
        // { type: "section_title", text: "COMBOS" },
        {
          type: "food_items",
          group_title: "COMBOS",
          content: [
            {
              type: "food_item",
              name: "THE BOX COMBO®",
              description:
                "4 Chicken Fingers, Crinkle-Cut Fries, One Cane’s Sauce®, Texas Toast, Coleslaw, Regular Fountain Drink/Tea (22 oz.)",
              price: "10.98",
              calories: "1250 - 1440",
            },
            {
              type: "food_item",
              name: "THE CANIAC™ COMBO",
              description:
                "6 Chicken Fingers, Crinkle-Cut Fries, 2 Cane’s Sauce®, Texas Toast, Coleslaw, Large Fountain Drink/Tea (32 oz.)",
              price: "14.98",
              calories: "1790 - 2040",
            },
            {
              type: "food_item",
              name: "THE 3 FINGER COMBO®",
              description:
                "3 Chicken Fingers, Crinkle-Cut Fries, One Cane’s Sauce®, Texas Toast, Regular Fountain Drink/Tea (22 oz.)",
              price: "7.98",
              calories: "1020 - 1210",
            },
            {
              type: "food_item",
              name: "THE SANDWICH COMBO",
              description:
                "3 Chicken Fingers, Cane’s Sauce®, Lettuce, Toasted Bun, Crinkle-Cut Fries, Regular Fountain Drink/Tea (22 oz.)",
              price: "9.98",
              calories: "1020 - 1210",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          type: "hero_image",
          src: "https://images.prismic.io/raisingcanes/3558ffdc-ea93-48c6-81a3-56a848ba9adf_Tailgate%20(1).png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C1681%2C1681&w=720&h=720",
        },
        // { type: "section_title", text: "TAILGATES™" },
        {
          type: "food_items",
          group_title: "TAILGATES™",
          content: [
            {
              type: "food_item",
              name: "25 Chicken Fingers",
              description: "25 of our fresh, never frozen Chicken Fingers.",
              price: "33.99",
            },
            {
              type: "food_item",
              name: "50 Chicken Fingers",
              description: "50 of our fresh, never frozen Chicken Fingers.",
              price: "65.99",
            },
            {
              type: "food_item",
              name: "75 Chicken Fingers",
              description: "75 of our fresh, never frozen Chicken Fingers.",
              price: "95.99",
            },
            {
              type: "food_item",
              name: "100 Chicken Fingers",
              description: "100 of our fresh, never frozen Chicken Fingers.",
              price: "127.99",
            },
          ],
        },
        // { type: "section_title", text: "EXTRAS" },
        {
          type: "food_items",
          group_title: "EXTRAS",
          content: [
            {
              type: "food_item",
              name: "Cane's Sauce®",
              description: "Our signature Cane's Sauce® made fresh daily.",
              price: "0.39",
            },
            {
              type: "food_item",
              name: "Crinkle-Cut Fries",
              description: "Golden, crinkle-cut fries made fresh.",
              price: "1.49",
            },
            {
              type: "food_item",
              name: "Texas Toast",
              description: "Thick-cut, buttered, and grilled Texas toast.",
              price: "0.99",
            },
            {
              type: "food_item",
              name: "Coleslaw",
              description: "Crispy, tangy coleslaw made fresh daily.",
              price: "0.99",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          type: "hero_image",
          src: "https://gibbonsgazette.org/wp-content/uploads/2024/01/Screenshot-2024-01-30-3.24.48-PM.png",
        },
        {
          group_title: "DRINKS",
          type: "food_items",
          content: [
            {
              type: "food_item",
              name: "Fountain Drink (22 oz.)",
              description: "A refreshing selection of fountain drinks.",
              price: "1.79",
            },
            {
              type: "food_item",
              name: "Fountain Drink (32 oz.)",
              description: "A large refreshing selection of fountain drinks.",
              price: "2.09",
            },
            {
              type: "food_item",
              name: "Sweet Tea (22 oz.)",
              description: "Freshly brewed sweet tea, southern style.",
              price: "1.79",
            },
            {
              type: "food_item",
              name: "Sweet Tea (32 oz.)",
              description: "Freshly brewed sweet tea, southern style.",
              price: "2.09",
            },
            {
              type: "food_item",
              name: "Lemonade (22 oz.)",
              description: "Freshly squeezed lemonade made daily.",
              price: "2.19",
            },
          ],
        },
        {
          type: "hero_image",
          src: "https://thumbs.dreamstime.com/b/raising-cane-s-joliet-il-joliet-il-usa-november-raising-cane-s-american-fast-food-restaurant-chain-specializes-262380147.jpg",
        },
      ],
    },
  ],
};
