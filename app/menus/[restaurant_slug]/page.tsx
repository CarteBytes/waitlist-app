import { Metadata, ResolvingMetadata } from "next";
import LiberoMenu from "../playground/components/LiberoMenu";

type Props = {
  params: { restaurant_slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchRestaurantAndMenu = async (restaurantSlug: string) => {
  const restaurantData = await fetch(`/api/restaurants/${restaurantSlug}`, {
    cache: "no-store",
  });
  const restaurant = await restaurantData.json();
  const menuData = await fetch(
    `/api/restaurants/${restaurant.id}/menus?default`,
    { cache: "no-store" },
  );
  const menu = await menuData.json();

  return { restaurant, menu };
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
      images: [restaurant.logo],
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

  return (
    <div className={"flex justify-center"}>
      <LiberoMenu restaurant={restaurant} menu={menu} />
    </div>
  );
}
