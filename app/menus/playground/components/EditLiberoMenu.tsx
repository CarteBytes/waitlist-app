"use client";

import React, { useState } from "react";
import FooterLogoCTA from "./FooterLogoCTA";
import {
  FaArrowRight,
  FaBowlFood,
  FaDollarSign,
  FaFloppyDisk,
  FaGripLines,
  FaImage,
  FaPhone,
  FaStore,
  FaUtensils,
} from "react-icons/fa6";
import chroma from "chroma-js";
import { doesNotExist, isLight } from "../utils";
import { RestaurantT, SupportedFontFamilies } from "../types/restaurant";
import { MenuSectionT, MenuT } from "../types/menu";
import SocialMediaGroup from "./SocialMediaGroup";
import AdminWrapper from "./AdminWrapper";
import EditRestaurantForm from "./EditRestaurantForm";
import Link from "next/link";
import { dynaPuff, oswald } from "@/app/ui/fonts";
import ExpandingTextArea from "./ExpandingTextArea";
import LiberoMenu from "./LiberoMenu";
import { EnhancedButton } from "@/components/ui/enhanced-btn";

const getFontFamily = (fontFamily: SupportedFontFamilies) => {
  if (fontFamily === "DynaPuff") return dynaPuff.className;
  return oswald.className;
};

function EditLiberoMenu({
  restaurant,
  menu,
  onChangeMenu,
  onChangeRestaurant,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
  onChangeMenu?: (newMenu: MenuT) => void;
  onChangeRestaurant?: (newRes: RestaurantT) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  // const [showSave, setShowSave] = useState(false);

  const isSpanish = menu.language === "es";

  let content = (
    <>
      <EditRestaurantForm
        restaurant={restaurant}
        onChangeRestaurant={onChangeRestaurant!}
      />
      <div
        id="menu"
        className={`w-full max-w-xl overflow-hidden ${getFontFamily(restaurant.font_family)} antialiased`}
        style={{ color: restaurant.primary_text_color }}>
        <TitlePage restaurant={restaurant} isSpanish={isSpanish} />
        <ContentPages
          onChangeMenu={onChangeMenu}
          restaurant={restaurant}
          menu={menu}
        />
        <FooterPage restaurant={restaurant} />
        {/* <FooterLogoCTA lang={menu.language} /> */}
      </div>
    </>
  );

  if (showPreview) {
    content = <LiberoMenu restaurant={restaurant} menu={menu} />;
  }

  return (
    <div>
      {content}

      <div
        className={
          "sticky bottom-0 flex h-16 items-center justify-center border-t-2 bg-[#F6FE9B] shadow-2xl"
        }>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRight}
          type="submit"
          iconPlacement="right"
          className="mr-2"
          onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Hide" : "Show"} Preview
        </EnhancedButton>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaFloppyDisk}
          type="submit"
          iconPlacement="right">
          Save now
        </EnhancedButton>
      </div>
    </div>
  );
}

const ContentPages = ({
  restaurant,
  menu,
  onChangeMenu,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
  onChangeMenu?: (newMenu: MenuT) => void;
}) => {
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

  const handleChangeSection = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    section: MenuSectionT,
    sectionIdx: number,
  ) => {
    const newMenu = { ...menu };
    const newSection = {
      ...section,
      [e.target.name]: e.target.value,
    };
    newMenu.content[sectionIdx] = newSection;
    onChangeMenu && onChangeMenu(newMenu);
  };

  const handleEditSectionField = (
    field: keyof MenuSectionT,
    value: string,
    section: MenuSectionT,
    sectionIdx: number,
  ) => {
    const newMenu = { ...menu };
    const newSection = {
      ...section,
      [field]: "",
    };
    newMenu.content[sectionIdx] = newSection;
    onChangeMenu && onChangeMenu(newMenu);
  };

  return (
    <>
      {menu.content?.map((section, i) => {
        return (
          <React.Fragment key={i}>
            <div className="mt-16 flex h-full min-h-16 w-full items-center justify-center border-y-2 border-black bg-[#F6FE9B] font-bold text-black shadow-xl">
              Page {section.page_index + 1}, Section {section.section_index + 1}
            </div>
            <section
              className="flex flex-col"
              style={{
                background: getPageBackgroundColor(section.page_index),
              }}>
              {section.hero_image && (
                <img src={section.hero_image} className="h-auto w-full" />
              )}

              <div className="px-8 pt-20">
                <div>
                  {!section.hero_image && (
                    <EditButton
                      className="mb-2 w-full"
                      preIcon={<FaImage className="text-xl" />}>
                      Add Image
                    </EditButton>
                  )}
                </div>

                <div className="flex items-start justify-between">
                  {doesNotExist(section.group_title) ? (
                    <EditButton
                      className="w-1/2"
                      preIcon={<FaUtensils className="text-xl" />}
                      onClick={() =>
                        handleEditSectionField("group_title", "", section, i)
                      }>
                      Add Group Name
                    </EditButton>
                  ) : (
                    <ExpandingTextArea
                      name="group_title"
                      id={`group_title_${i}`}
                      placeholder="Group Name"
                      value={section.group_title!}
                      className={`${getFontFamily(restaurant.font_family)} text-3xl font-semibold`}
                      style={{
                        color: getPageSectionTitleColor(section.page_index),
                        background: getPageBackgroundColor(section.page_index),
                      }}
                      onChange={(e) => handleChangeSection(e, section, i)}
                    />
                  )}

                  {doesNotExist(section.group_price) ? (
                    <EditButton
                      preIcon={<FaDollarSign className="text-xl" />}
                      onClick={() =>
                        handleEditSectionField("group_price", "", section, i)
                      }>
                      Add Group Price
                    </EditButton>
                  ) : (
                    <ExpandingTextArea
                      name="group_price"
                      id={`group_price_${i}`}
                      placeholder={restaurant.currency_prefix}
                      value={section.group_price!}
                      className={`ml-4 text-right ${getFontFamily(restaurant.font_family)} ml-4 w-max text-nowrap text-3xl font-semibold`}
                      style={{
                        color: getPageSectionTitleColor(section.page_index),
                        background: getPageBackgroundColor(section.page_index),
                      }}
                      onChange={(e) => handleChangeSection(e, section, i)}
                    />
                    // <h3
                    //   className="ml-4 w-max text-nowrap text-3xl font-semibold"
                    //   style={{
                    //     color: getPageSectionTitleColor(section.page_index),
                    //   }}>
                    //   {restaurant.currency_prefix}
                    //   {section.group_price}
                    // </h3>
                  )}
                </div>
              </div>

              <div className="px-8 text-lg leading-tight">
                {doesNotExist(section.group_description) ? (
                  <EditButton
                    className="mt-2 w-full"
                    preIcon={<FaGripLines className="text-xl" />}
                    onClick={() =>
                      handleEditSectionField(
                        "group_description",
                        "",
                        section,
                        i,
                      )
                    }>
                    Add Group Description
                  </EditButton>
                ) : (
                  <ExpandingTextArea
                    name="group_description"
                    id={`group_description_${i}`}
                    placeholder="Group Description"
                    value={section.group_description!}
                    className={`${getFontFamily(restaurant.font_family)} text-lg leading-tight`}
                    style={{
                      color: getPageSectionTitleColor(section.page_index),
                      background: getPageBackgroundColor(section.page_index),
                    }}
                    onChange={(e) => handleChangeSection(e, section, i)}
                  />
                )}
              </div>

              <div className="flex flex-col gap-3 px-8 pb-20 pt-2">
                {section.items?.map((item: any, i: number) => (
                  <div key={i + 50}>
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

                <EditButton preIcon={<FaBowlFood className="text-xl" />}>
                  {(section?.items?.length ?? 0) > 0 ? "Manage" : "Add"} Items
                </EditButton>

                <div
                  className="mt-[-3px] flex items-start justify-between text-lg leading-tight"
                  style={{
                    color: getPageSectionTitleColor(section.page_index),
                  }}>
                  {doesNotExist(section.extra_details) ? (
                    <EditButton
                      className="px-6 text-sm"
                      onClick={() =>
                        handleEditSectionField("extra_details", "", section, i)
                      }>
                      Add Extras
                    </EditButton>
                  ) : (
                    <ExpandingTextArea
                      name="extra_details"
                      id={`extra_details_${i}`}
                      placeholder="Extra Details"
                      value={section.extra_details!}
                      className={`${getFontFamily(restaurant.font_family)}`}
                      style={{
                        color: getPageSectionTitleColor(section.page_index),
                        background: getPageBackgroundColor(section.page_index),
                      }}
                      onChange={(e) => handleChangeSection(e, section, i)}
                    />
                  )}
                  {doesNotExist(section.extra_price) ? (
                    <EditButton
                      className="text-sm"
                      onClick={() =>
                        handleEditSectionField("extra_price", "", section, i)
                      }>
                      Add Extras Price
                    </EditButton>
                  ) : (
                    <ExpandingTextArea
                      name="extra_price"
                      id={`extra_price_${i}`}
                      placeholder="$"
                      value={section.extra_price!}
                      className={`${getFontFamily(restaurant.font_family)} ml-4 w-max text-nowrap text-right`}
                      style={{
                        color: getPageSectionTitleColor(section.page_index),
                        background: getPageBackgroundColor(section.page_index),
                      }}
                      onChange={(e) => handleChangeSection(e, section, i)}
                    />
                  )}
                </div>
              </div>
            </section>
          </React.Fragment>
        );
      })}
    </>
  );
};

const EditButton = ({
  children,
  className,
  preIcon,
  onClick,
}: {
  children: React.ReactNode;
  preIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={`margin-x min-h-10 rounded-xl border-2 border-black bg-[#F6FE9B] px-4 font-bold text-black ${className}`}>
      <span className="flex items-center justify-center">
        {preIcon && <span className="mr-2">{preIcon}</span>} {children}
      </span>
    </button>
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
    <>
      <div className="mt-16 flex h-full min-h-16 w-full items-center justify-center border-y-2 border-black bg-[#F6FE9B] font-bold text-black shadow-xl">
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
          <img className="h-auto w-full" id="hero-logo" src={restaurant.logo} />
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
};

const FooterPage = ({ restaurant }: { restaurant: RestaurantT }) => {
  return (
    <>
      <div className="mt-16 flex h-full min-h-16 w-full items-center justify-center border-y-2 border-black bg-[#F6FE9B] font-bold text-black shadow-xl">
        Footer Page
      </div>
      <section
        id="footer"
        className="flex flex-col items-center gap-12 px-8 py-24"
        style={{
          background: restaurant.secondary_color, //getPageBackgroundColor(menu.pages.length + 2),
          color: restaurant.primary_text_color, //getPageBodyTextColor(menu.pages.length + 2),
        }}>
        <img className="h-auto w-full" id="footer-logo" src={restaurant.logo} />
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
};

export default EditLiberoMenu;
