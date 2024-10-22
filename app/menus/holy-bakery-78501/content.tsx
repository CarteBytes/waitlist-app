import { MenuT } from "../playground/types/menu";
import { RestaurantT } from "../playground/types/restaurant";

export const RESTAURANT: RestaurantT = {
  id: "holy-bakery-78501",
  name: "Holy Bakery",
  phone: "(956) 777-2507",
  address: "701 E US HWY 83",
  city: "McAllen",
  state: "TX",
  zipCode: "78501",
  currencyPrefix: "$",
  logo: "https://scontent-dfw5-1.xx.fbcdn.net/v/t39.30808-6/231281157_244341884177172_5119711346654086510_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=oaM3hMXoh1UQ7kNvgFNzh6W&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=ADAnr01ihz1TaO8_7GZ4A6H&oh=00_AYCED_S2FVH_nhMeoFvbgHu8IqvrcRve9cwaLvdqd-P6RQ&oe=671A61A7",
  colors: {
    primary: "#F7B1CB",
    secondary: "#A0E5E1",
    primary_text: "#FFFFFF",
    secondary_text: "#000000",
    accent: "#B39E79",
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

export const MENU: MenuT = {
  id: "menuid" + Math.floor(Math.random() * 1000),
  type: "menu",
  pages: [
    {
      sections: [
        {
          type: "hero_image",
          src: "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/262789416_318587203419306_7199684635550512245_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=2fIQSAEE600Q7kNvgGx39l4&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=AqEUW5BZzu_NGR263gkPf2Z&oh=00_AYBg8oPV8a28OcBpIIMN7tRVQdkTcbc-W_6ly7t1YAxsKw&oe=671A3971",
        },
        {
          type: "food_items",
          group_title: "GLAZED LOOPS",
          group_price: "7",
          content: [
            {
              type: "food_item",
              name: "TOASTED MARSHMALLOW",
            },
            {
              type: "food_item",
              name: "CREME BRULEE",
            },
            {
              type: "food_item",
              name: "NUTELLA ALMOND",
            },
            {
              type: "food_item",
              name: "WHITE OREO",
            },
            {
              type: "food_item",
              name: "MARIAS CAJETA",
            },
            {
              type: "food_item",
              name: "STRAWBERRY SPRINKLES",
            },
            {
              type: "food_item",
              name: "LUCKY CHARMS",
            },
            {
              type: "food_item",
              name: "FRUITY PEBLLES",
            },
            {
              type: "food_item",
              name: "CINNAMON TOAST CRUNCH",
            },
          ],
        },
        {
          type: "food_items",
          group_title: "WAFFLE ON A STICK",
          group_price: "7.99",
          content: [
            {
              type: "food_item",
              name: "NUTELLA LECHERA STRAWBERRY",
            },
            {
              type: "food_item",
              name: "CAJETA LECHERA BANANA",
            },
            {
              type: "food_item",
              name: "STRAWBERRY JELLY LECHERA",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          type: "hero_image",
          src: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/69802317-da3e-4240-967c-a6d841f1f2f8.jpeg",
        },
        {
          type: "food_items",
          group_title: "HOLY CHURRDAES",
          group_price: "9",
          content: [
            {
              type: "food_item",
              name: "SMORES",
            },
            {
              type: "food_item",
              name: "CREME BRULEE",
            },
            {
              type: "food_item",
              name: "BIRTHDAY",
            },
            {
              type: "food_item",
              name: "FERRERO",
            },
            {
              type: "food_item",
              name: "COOKIES N' CREAM",
            },
            {
              type: "food_item",
              name: "STRAWBERRY SHORTCAKE",
            },
            {
              type: "food_item",
              name: "COOKIE MONSTER",
            },
            {
              type: "food_item",
              name: "MARIAS CAJETA",
            },
            {
              type: "food_item",
              name: "FRUITY PEBBLES",
            },
            {
              type: "food_item",
              name: "LUCKY CHARMS",
            },
            {
              type: "food_item",
              name: "CINNAMON TOAST CRUNCH",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          type: "hero_image",
          src: "https://scontent-dfw5-1.xx.fbcdn.net/v/t1.6435-9/174114776_184021343542560_6537986046360459884_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=UnpoFeNc6XMQ7kNvgEC4Fs6&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=ARYRG-NmVN92_rLY4gZkETe&oh=00_AYBGRfcFEiyM-fTjDciixK_FqM4aKwIcrJ06rwYUxEejcA&oe=673BF8D9",
        },
        {
          type: "food_items",
          group_title: "HOLY BOBA",
          group_price: "7",
          content: [
            {
              type: "food_item",
              name: "CHAI LOVER",
            },
            {
              type: "food_item",
              name: "OREO BLAST",
            },
            {
              type: "food_item",
              name: "NUTELLA DAZE",
            },
            {
              type: "food_item",
              name: "MANGO BLAST",
            },
            {
              type: "food_item",
              name: "TARO",
            },
            {
              type: "food_item",
              name: "PINA COLADA",
            },
            {
              type: "food_item",
              name: "CARAMEL TWIST",
            },
            {
              type: "food_item",
              name: "JAVA CHIP",
            },
            {
              type: "food_item",
              name: "DIRTY BOBA",
            },
          ],
        },
        {
          type: "food_items",
          group_title: "BEVERAGES",
          content: [
            {
              type: "food_item",
              name: "COFFEE",
              price: "3.50",
            },
            {
              type: "food_item",
              name: "ICED COFFEE",
              price: "3.99",
            },
            {
              type: "food_item",
              name: "WATER",
              price: "1.00",
            },
            {
              type: "food_item",
              name: "SODA",
              price: "2.00",
            },
            {
              type: "food_item",
              name: "HOT CHOCOLATE",
              price: "3.50",
            },
          ],
        },
        {
          type: "hero_image",
          src: "https://scontent-dfw5-1.xx.fbcdn.net/v/t39.30808-6/223158221_238167071461320_604384889337888654_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=LDxZIhIsEDoQ7kNvgEHtveg&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=AvV_KaakZo8f1z65gWNofCL&oh=00_AYAo249IEgxR2HZOfsZuxtLT7daOyygb72q6DhI_GoQK4g&oe=671A5A58",
        },
      ],
    },
  ],
};
