import { Metadata, ResolvingMetadata } from "next";
import EditRestaurantMenu from "../../playground/components/EditRestaurantMenu";
import { ItemT } from "../../playground/types/item";
import { ItemCategoryT } from "../../playground/types/category";

type Props = {
  params: { restaurant_slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchRestaurantAndMenu = async (restaurantSlug: string) => {
  const restaurantData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant/${restaurantSlug}`,
    {
      cache: "no-store",
    },
  );
  const restaurant = await restaurantData.json();
  const menuData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurants/${restaurant.id}/menus?default`,
    { cache: "no-store" },
  );
  const menu = await menuData.json();

  return { restaurant, menu };
};

const fetchOrgItems = async (orgId: string) => {
  const itemsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${orgId}/items`,
    {
      // cache: "no-store",
      next: { tags: ["orgItems"] },
    },
  );
  const items = await itemsData.json();
  return items;
};

const fetchOrgCategories = async (orgId: string) => {
  const categoriesData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${orgId}/categories`,
    {
      // cache: "no-store",
      next: { tags: ["orgCategories"] },
    },
  );
  const categories = await categoriesData.json();
  return categories;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).restaurant_slug;

  // fetch data
  const { restaurant, menu } = await fetchRestaurantAndMenu(id);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  return {
    title: `${restaurant.name} | CarteBytes`,
    description: `${menu.name} | ${menu.description}`,
    openGraph: {
      images: [restaurant.logo_url],
    },
  };
}

export default async function Page({
  params,
}: {
  params: { restaurant_slug?: string };
}) {
  const { restaurant, menu } = await fetchRestaurantAndMenu(
    params.restaurant_slug!,
  );
  const items: ItemT[] = await fetchOrgItems(restaurant.org_id);
  const categories: ItemCategoryT[] = await fetchOrgCategories(
    restaurant.org_id,
  );

  return (
    <div className={"flex justify-center"}>
      <EditRestaurantMenu
        restaurant={restaurant}
        menu={menu}
        items={items}
        categories={categories}
      />
    </div>
  );
}
