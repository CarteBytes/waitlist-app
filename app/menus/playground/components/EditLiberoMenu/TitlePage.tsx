import chroma from "chroma-js";
import { RestaurantT } from "../../types/restaurant";
import ImageUpload from "../ImageUpload";
import AdminWrapper from "../AdminWrapper";
import SocialMediaGroup from "../SocialMediaGroup";
import { figtree } from "@/app/ui/fonts";

export default function TitlePage({
  restaurant,
  isSpanish,
}: {
  restaurant: RestaurantT;
  isSpanish?: boolean;
}) {
  const gradientColors = chroma
    .scale([
      chroma(restaurant.primary_color).brighten(0.2),
      restaurant.primary_color,
      chroma(restaurant.primary_color).darken(0.2),
    ])
    .mode("lab")
    .colors(5);
  const gradientString = `linear-gradient(90deg, ${gradientColors.join(", ")})`;

  return (
    <>
      <div
        className={`mt-16 flex h-full min-h-16 w-full items-center justify-center border-y-2 border-black bg-[#F6FE9B] font-bold text-black shadow-xl ${figtree.className}`}>
        Title Page
      </div>
      <section
        id="hero"
        className={`hero duration-2000 flex h-svh flex-col px-8 py-12 transition-all ease-linear`}
        style={{ background: gradientString }}>
        <div id="hero-header" className="flex justify-between">
          <h1 className="text-5xl font-semibold">
            {isSpanish ? (
              <>
                Menú <br />
                Digital{" "}
              </>
            ) : (
              <>
                Digital <br />
                Menu{" "}
              </>
            )}
          </h1>
        </div>
        <div className="flex h-full flex-col justify-center text-center">
          <img
            className="h-auto w-full"
            id="hero-logo"
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/asset_bucket/${restaurant.id}/logo-${restaurant.id}`}
          />
          <ImageUpload restaurantId={restaurant.id} />
          {/* <h2 className="mt-6 text-4xl font-semibold">{restaurant.name}</h2> */}
          {/* <h3 className="mt-2 text-xl font-semibold">{restaurant.phone}</h3> */}
          <AdminWrapper>
            <h3 className="mt-4 text-2xl font-semibold">
              {restaurant.city}, {restaurant.state}
            </h3>
          </AdminWrapper>
        </div>
        <SocialMediaGroup
          id="hero_socials"
          className="justify-end"
          primaryTextColor={restaurant.primary_text_color}
          secondaryTextColor={restaurant.secondary_text_color}
          facebookUrl={restaurant.facebook_url}
          instagramUrl={restaurant.instagram_url}
          whatsappUrl={restaurant.whatsapp_url}
          tiktokUrl={restaurant.tiktok_url}
        />
      </section>
    </>
  );
}
