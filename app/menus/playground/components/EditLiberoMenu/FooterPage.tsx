import { FaPhone, FaStore } from "react-icons/fa6";
import { RestaurantT } from "../../types/restaurant";
import Link from "next/link";
import SocialMediaGroup from "../SocialMediaGroup";
import { figtree } from "@/app/ui/fonts";

export default function FooterPage({
  restaurant,
}: {
  restaurant: RestaurantT;
}) {
  return (
    <>
      <div
        className={`flex h-full min-h-16 w-full items-center justify-center border-y-2 border-black bg-[#F6FE9B] font-bold text-black shadow-xl ${figtree.className}`}>
        Footer Page
      </div>
      <section
        id="footer"
        className="flex flex-col items-center gap-12 px-8 py-24"
        style={{
          background: restaurant.secondary_color, //getPageBackgroundColor(menu.pages.length + 2),
          color: restaurant.primary_text_color, //getPageBodyTextColor(menu.pages.length + 2),
        }}>
        <img
          className="h-auto w-full"
          id="footer-logo"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/asset_bucket/${restaurant.id}/logo-${restaurant.id}`}
        />
        <div className="flex h-full flex-col justify-center">
          {/* <h2 className="mt-6 text-4xl font-semibold">{restaurant.name}</h2> */}
          {restaurant.phone && (
            <h3 className="mt-2 flex items-start gap-4 text-2xl font-semibold">
              <div className="mt-1">
                <FaPhone />
              </div>
              <div>{restaurant.phone}</div>
            </h3>
          )}
          {restaurant.address && (
            <h3 className="mt-2 flex items-start gap-4 text-2xl font-semibold">
              <div className="mt-1">
                <FaStore />
              </div>
              <Link
                href={`http://maps.google.com/?q=${restaurant.address}%20${restaurant.city}%20${restaurant.state}%20${restaurant.zip_code}`}
                target="_blank">
                <div>
                  {" "}
                  {restaurant.address} <br /> {restaurant.city},{" "}
                  {restaurant.state} {restaurant.zip_code}
                </div>
              </Link>
            </h3>
          )}
        </div>
        <SocialMediaGroup
          id="hero_socials"
          className="justify-center"
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
