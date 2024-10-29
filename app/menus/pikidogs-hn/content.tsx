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
  name: "Piki Dog Menu Octubre",
  description: "Menu especial para el mes de Octubre",
  content: [
    {
      page_index: 2, // Todo: page indices out of order to get the halloween colors on first
      hero_image: "https://i.ibb.co/tcw4yZV/IMG-8670.jpg",
      group_title: "PIKI BOO",
      group_description:
        "Queso cheddar y salchicha, envuelto en masa de trigo, cubierto de papas fritas, panko y Takis fuego.",
      extra_details: "Edicion Limitada",
      items: [{ id: "1", name: "", description: "Acompañado de salsa ranch" }],
      group_price: "95",
    },
    {
      page_index: 1,
      hero_image: "https://i.ibb.co/3vLGnmQ/IMG-8668.jpg",
      group_price: "85 c/u",
      group_title: "PIKI DOGS",
      group_description: "Korean Corn Dogs",
      items: [
        {
          id: "1",
          name: "PIKIRELA",
          description:
            "Queso mozzarela envuelto en masa de trigo, empanado con panko.",
        },
        {
          id: "1",
          name: "PIKI PAPS",
          description:
            "Mitad queso mozzarela, mitad salchicha, envuelto en masa de trigo, empanado con panko y cubierto con trozos de papa.",
        },
        {
          id: "1",
          name: "PIKI POPS",
          description:
            "Queso mozzarela, envuelto en masa de trigo, empanado con panko y cereal.",
        },
        {
          id: "1",
          name: "PIKI CLASICO",
          description:
            "Salchicha, envuelto en masa de trigo, empanado con panko.",
        },
        {
          id: "1",
          name: "PIKI HOT",
          description:
            "Mitad queso mozzarela, mitad salchicha, envuelto en masa de trigo, empanado con panko y cubierto con flaming hot.",
        },
        {
          id: "1",
          name: "PIKI BLUE",
          description:
            "Mitad queso mozzarela, mitad salchicha, envuelto en masa de trigo, empanado con panko y cubierto con Takis azules.",
        },
        {
          id: "1",
          name: "PIKI CHEESE",
          description:
            "Mitad queso mozzarela, mitad salchicha, envuelto en masa de trigo, empanado con panko y cubierto con Ruffles queso.",
        },
      ],
      extra_details: "Toppings Extra: Ruffles queso, Flaming Hot, Takis Azul",
      extra_price: "15",
    },
    {
      page_index: 1,
      hero_image:
        "https://i.ibb.co/cLYmDpd/448359908-122157192476205723-7020524754990933909-n.jpg",
      // group_title: "SALSAS",
      // group_description: "Cada Piki viene con 2 salsas",
      // items: [
      //   {
      //     id: "1",
      //     name: "GOCHUJANG",
      //     description: "Picante",
      //   },
      //   {
      //     id: "1",
      //     name: "CAJUN",
      //     description: "Poco picante",
      //   },
      //   {
      //     id: "1",
      //     name: "BARBACOA COREANA",
      //     description: "Poco Picante",
      //   },
      //   {
      //     id: "1",
      //     name: "RAINBOW",
      //     description: "Dulce",
      //   },
      //   {
      //     id: "1",
      //     name: "MAYONESA",
      //   },
      //   {
      //     id: "1",
      //     name: "MOSTAZA",
      //   },
      //   {
      //     id: "1",
      //     name: "KETCHUP",
      //   },
      // ],
    },
  ],
};
