import { Metadata, ResolvingMetadata } from "next";
import LiberoMenu from "../playground/components/LiberoMenu";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  return {
    title: `${"hi"} | CarteBytes`,
    description:
      "Reimagining menus, simplifying dining. Serving seamless digital experiences for modern restaurants.",
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default async function Page({ params }: { params: { id?: string } }) {
  const menuData = await fetch(
    "http://localhost:3000/api/menus/fc6229eb-1b4f-4420-b0db-ed7fa0df63b6",
  );
  const menu = await menuData.json();
  const restaurantData = await fetch(
    `http://localhost:3000/api/restaurants/${menu.restaurant_id}`,
  );
  const restaurant = await restaurantData.json();

  return (
    <div className="flex justify-center">
      <LiberoMenu restaurant={restaurant} menu={menu} lang="esp" />
    </div>
  );
}
