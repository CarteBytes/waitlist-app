import { MenuT } from "../playground/types/menu";
import { RestaurantT } from "../playground/types/restaurant";

export const RESTAURANT: RestaurantT = {
  id: "holy-bakery-78501",
  name: "Piki Dogs",
  phone: "+504 9449-7249",
  address: "Bazar del Sabado Blvd. Juan Pablo II",
  city: "Tegucigalpa",
  state: "HN",
  zip_code: "",
  logo: "/business-logos/pikidogs-logo.png",
  currency_prefix: "L. ",
  colors: {
    primary: "#E6C1FF",
    secondary: "#E6C1FF",
    primary_text: "#37046E",
    secondary_text: "#FFFFFF",
    accent: "#FEAD41",
  },
  socials: {
    facebookUrl: "https://www.facebook.com/profile.php?id=61556171714190",
    instagramUrl: "https://www.instagram.com/pikidogs.hn/",
    whatsappUrl:
      "https://api.whatsapp.com/send?phone=%2B50494497249&context=ARCPdqV9m1y3y4IXE3T0A1GUgJGVfmc24m4U_oVrWF1c5zFjC1cMDDNxPZ_33Yo1YjKu_xuYTTF3qEKJV9Dnm6Ri2CCkCV1D7vThkEIqbjWeRQPEjOJ40YR9k_obyIjpvqCwtGqrumgRk7oNAQOQCfo&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawGD19dleHRuA2FlbQIxMAABHeBHilbFvosPe03VZgsez4ApO_AKcUJxeL1Xh0tnfApVOnl6ypvRTfDHBg_aem_hNtYvOZtDYGiMwqLMdXjnQ",
  },
};

export const MENU: MenuT = {
  id: "menuid" + Math.floor(Math.random() * 1000),
  theme: "Libero",
  content: [
    {
      page_index: 0,
      hero_image:
        "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/448434942_122157456110205723_4929824613455055627_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=RQWgbovObgEQ7kNvgF5akpa&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=Afm-Ewbnxre-6NNBkbZ7i7d&oh=00_AYC72dudAsPObDe0FJ4MKOMmUASxoumKYOrtsHQNSu-PHw&oe=671CD5FF",
      group_price: "85 c/u",
      group_title: "PIKI DOGS",
      food_items: [
        {
          id: "1",
          name: "PIKIHOT",
          description:
            "Mitad queso mozzarela, mitad salchicha, envuelto en masa de trigo, empanado y cubierto de flaming hot.",
        },
        {
          id: "1",
          name: "PIKI CLASICO",
          description: "Salchicha, envuelto en masa de trigo, empanado.",
        },
        {
          id: "1",
          name: "PIKIPAPS",
          description:
            "Mitad queso mozzarela, mitad salchicha, envuelto en masa de trigo, empanado y cubierto de trozos de papa.",
        },
        {
          id: "1",
          name: "PIKIPOPS",
          description:
            "Queso mozzarela, envuelto en masa de trigo, empanado y cubierto de cereal afrutado.",
        },
        {
          id: "1",
          name: "PIKIRELA",
          description:
            "Queso mozzarela envuelto en masa de trigo, empanado mas 2 salsas.",
        },
        {
          id: "1",
          name: "PIKI CHEESE",
          description:
            "Queso mozzarela y salchicha, envuelto en masa de trigo, empanado y cubierto de Ruffles queso.",
        },
        {
          id: "1",
          name: "PIKI BLUE",
          description:
            "Salchicha jugosa, mozzarela derritido, envuelto en masa crujiente y empanado con Takis azules.",
        },
      ],
    },
    {
      page_index: 0,
      hero_image:
        "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/448359908_122157192476205723_7020524754990933909_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nJpB-nII-i0Q7kNvgGuQgoP&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=Afm-Ewbnxre-6NNBkbZ7i7d&oh=00_AYDuFXrrIHLbumjxKrWdW_-OkfF-wGNpIQ6QZhVjbsqrmw&oe=671CDB55",
    },
    {
      page_index: 0,
      hero_image:
        "https://scontent-dfw5-1.xx.fbcdn.net/v/t39.30808-6/455171482_122173706102205723_2337354666880462048_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=5ef8FGmWud0Q7kNvgEZ85MH&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=Afm-Ewbnxre-6NNBkbZ7i7d&oh=00_AYDeBZ0w9GjyZW-mRcF2wwwyVcEdzIjd06Fri9X3Q-CEkg&oe=671CD134",
    },
  ],
};
