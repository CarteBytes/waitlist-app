import React from "react";
import FooterLogoCTA from "./FooterLogoCTA";
import { FaPhone, FaStore } from "react-icons/fa6";
import chroma from "chroma-js";
import { isLight } from "../utils";
import { RestaurantT, SupportedFontFamilies } from "../types/restaurant";
import { MenuT } from "../types/menu";
import SocialMediaGroup from "./SocialMediaGroup";
import AdminWrapper from "./AdminWrapper";
import Link from "next/link";
import { dynaPuff, oswald } from "@/app/ui/fonts";
import { ItemT } from "../types/item";

const getFontFamily = (fontFamily: SupportedFontFamilies) => {
  if (fontFamily === "DynaPuff") return dynaPuff.className;
  return oswald.className;
};

function LiberoMenu({
  restaurant,
  menu,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
}) {
  const isSpanish = menu.language === "es";

  return (
    <div>
      <div
        id="menu"
        className={`w-full max-w-xl overflow-hidden ${getFontFamily(restaurant.font_family)} antialiased`}
        style={{ color: restaurant.primary_text_color }}>
        <TitlePage restaurant={restaurant} isSpanish={isSpanish} />
        {/* <RusticEdge1
    color={restaurant.primary_color}
    className="relative z-10 mb-[-20%]"
  /> */}
        <ContentPages restaurant={restaurant} menu={menu} />
        <FooterPage restaurant={restaurant} />
        <FooterLogoCTA lang={menu.language} />
      </div>
    </div>
  );
}

const ContentPages = ({
  restaurant,
  menu,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
}) => {
  const sortedMenuContent = menu.content?.sort(
    (a, b) => a.page_index - b.page_index,
  );

  const getPageBackgroundColor = (index: number) => {
    if (index % 2 !== 0) return restaurant.primary_color;
    if (index % 4 === 0) return restaurant.secondary_color;
    return restaurant.primary_text_color;
  };

  const getPageBodyTextColor = (index: number) => {
    const backgroundColor = getPageBackgroundColor(index);
    // Body text should be primary_text except when the background is primary_text
    if (backgroundColor === restaurant.primary_text_color) {
      return restaurant.secondary_text_color; // Use secondary_text to avoid conflict with primary_text background
    }
    return restaurant.primary_text_color;
  };

  const getPageSectionTitleColor = (index: number) => {
    const backgroundColor = getPageBackgroundColor(index);
    if (restaurant.primary_color === restaurant.secondary_color) {
      if (isLight(restaurant.accent_color) && isLight(backgroundColor)) {
        if (backgroundColor !== restaurant.primary_color)
          return restaurant.primary_color;
        return restaurant.secondary_text_color;
      }
      return restaurant.accent_color;
    }

    // Title should be primary whenever the background is not primary
    if (backgroundColor !== restaurant.primary_color) {
      return restaurant.primary_color;
    }
    // Fallback title color when background is primary
    return restaurant.secondary_color;
  };

  return (
    <>
      {sortedMenuContent?.map((section) => {
        return (
          <section
            key={section.id}
            className="flex flex-col"
            style={{ background: getPageBackgroundColor(section.page_index) }}>
            {section.hero_image && (
              <img src={section.hero_image} className="h-auto w-full" />
            )}

            {section.group_title && (
              <div className="flex items-start justify-between px-8 pt-20">
                <h3
                  className="text-3xl font-semibold"
                  style={{
                    color: getPageSectionTitleColor(section.page_index),
                  }}>
                  {section.group_title}
                </h3>

                {section.group_price && (
                  <h3
                    className="ml-4 w-max text-nowrap text-3xl font-semibold"
                    style={{
                      color: getPageSectionTitleColor(section.page_index),
                    }}>
                    {restaurant.currency_prefix}
                    {section.group_price}
                  </h3>
                )}
              </div>
            )}

            {section.group_description && (
              <div
                className="px-8 text-lg leading-tight"
                style={{ color: getPageSectionTitleColor(section.page_index) }}>
                <p>{section.group_description}</p>
              </div>
            )}

            {(!!section.extra_details || (section?.items?.length ?? 0) > 0) && (
              <div className="flex flex-col gap-3 px-8 pb-20 pt-2">
                {section.items?.map((item: ItemT) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className="text-xl font-semibold"
                          style={{
                            color: getPageBodyTextColor(section.page_index),
                          }}>
                          {item.name}
                        </p>
                      </div>
                      {item.price && (
                        <div>
                          <p
                            className="ml-4 w-max text-nowrap text-lg font-semibold"
                            style={{
                              color: getPageBodyTextColor(section.page_index),
                            }}>
                            {restaurant.currency_prefix}
                            {item.price}
                          </p>
                        </div>
                      )}
                    </div>
                    {item.description && (
                      <p
                        className="text-md leading-tight"
                        style={{
                          color: getPageBodyTextColor(section.page_index),
                          opacity: 0.75,
                        }}>
                        {item.description}
                      </p>
                    )}
                    {item.calories && (
                      <p
                        className="text-md font-thin leading-tight"
                        style={{
                          color: getPageBodyTextColor(section.page_index),
                          opacity: 0.75,
                        }}>
                        {item.calories} Cal
                      </p>
                    )}
                  </div>
                ))}

                <div
                  className="flex items-start justify-between text-lg leading-tight"
                  style={{
                    color: getPageSectionTitleColor(section.page_index),
                  }}>
                  {section.extra_details && <p>{section.extra_details}</p>}
                  {section.extra_price && (
                    <p className="ml-4 w-max text-nowrap">
                      {restaurant.currency_prefix} {section.extra_price}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};

const TitlePage = ({
  restaurant,
  isSpanish,
}: {
  restaurant: RestaurantT;
  isSpanish?: boolean;
}) => {
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
          src={restaurant.logo_url}
        />
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
  );
};

const FooterPage = ({ restaurant }: { restaurant: RestaurantT }) => {
  return (
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
        src={restaurant.logo_url}
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
  );
};

export default LiberoMenu;
