import { Metadata, ResolvingMetadata } from "next";
import LiberoMenu from "../../ui/components/LiberoMenu";
import { fetchRestaurantAndMenu } from "@/app/clientApi/restaurant";

type Props = {
  params: { restaurant_slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
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

  return (
    <div className={"flex justify-center"}>
      <LiberoMenu restaurant={restaurant} menu={menu} />
    </div>
  );
}
