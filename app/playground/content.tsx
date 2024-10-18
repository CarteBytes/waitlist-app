export const RESTAURANT = {
  id: "123",
  name: "Monterrey Mexican Restaurant",
  phone: "(615) 567-1848",
  address: "1800 Antioch Pike",
  city: "Nashville",
  state: "TN",
  zipCode: "37802",
  logo: "https://monterreycocina.com/wp-content/uploads/2024/04/logo-monterrey-color.png",
  colors: {
    primary: "#EF4544",
    secondary: "#45090B",
    primary_text: "#FFF4E8",
    secondary_text: "#000000",
    accent: "#F8B500",
  },
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
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
      ],
    },

    {
      sections: [
        {
          type: "hero_image",
          src: getImageBySection("POSTRES"),
        },
        { type: "section_title", text: "PARILLADAS" },
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

export const MENU = generateMenu();
