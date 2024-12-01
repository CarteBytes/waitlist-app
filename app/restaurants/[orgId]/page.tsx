// import { Metadata, ResolvingMetadata } from "next";
import { fetchOrgRestaurants } from "@/app/apiFunctions/restaurant";

// type Props = {
//   params: { restaurant_slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   // read route params
//   const id = (await params).restaurant_slug;

//   // fetch data
//   const { restaurant, menu } = await fetchRestaurantAndMenu(id);

//   // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []
//   return {
//     title: `${restaurant.name} | CarteBytes`,
//     description: `${menu.name} | ${menu.description}`,
//     openGraph: {
//       images: [restaurant.logo_url],
//     },
//   };
// }

export default async function Page({ params }: { params: { orgId?: string } }) {
  const data = await fetchOrgRestaurants(params.orgId!);

  return <div className={"flex justify-center"}>{JSON.stringify(data)}</div>;
}
