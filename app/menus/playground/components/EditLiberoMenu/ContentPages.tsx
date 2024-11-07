import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBowlFood,
  FaDollarSign,
  FaGripLines,
  FaImage,
  FaPlus,
  FaTrashCan,
  FaUtensils,
} from "react-icons/fa6";
import { doesNotExist, isLight } from "../../utils";
import { RestaurantT, SupportedFontFamilies } from "../../types/restaurant";
import { MenuSectionT, MenuT } from "../../types/menu";
import { dynaPuff, figtree, oswald } from "@/app/ui/fonts";
import ExpandingTextArea from "../ExpandingTextArea";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { v4 as uuidv4 } from "uuid";
import { ItemT } from "../../types/item";

const getFontFamily = (fontFamily: SupportedFontFamilies) => {
  if (fontFamily === "DynaPuff") return dynaPuff.className;
  return oswald.className;
};

export default function ContentPages({
  restaurant,
  menu,
  onChangeMenu,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
  onChangeMenu?: (newMenu: MenuT) => void;
}) {
  const [parent] = useAutoAnimate({ duration: 300 });

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

  const switchIndices = (indexA: number, indexB: number) => {
    const newMenuContent = menu.content.map((section) => {
      if (section.page_index === indexA) {
        section.page_index = indexB;
      } else if (section.page_index === indexB) {
        section.page_index = indexA;
      }
      return section;
    });

    const newMenu = { ...menu, content: newMenuContent };
    onChangeMenu && onChangeMenu(newMenu);
  };

  const handleAddPage = (newPageIndex: number) => {
    const newMenuContent = menu.content.map((section) => {
      if (section.page_index >= newPageIndex) {
        section.page_index = section.page_index + 1;
      }
      return { ...section };
    });

    const newPage: MenuSectionT = {
      id: uuidv4(),
      page_index: newPageIndex,
      section_index: 0,
    };
    newMenuContent.push(newPage);
    const newMenu = {
      ...menu,
      content: newMenuContent,
    };
    onChangeMenu && onChangeMenu(newMenu);
  };

  const handleDeletePage = (deletePageIndex: number) => {
    let newMenuContent = menu.content.filter(
      (section) => section.page_index !== deletePageIndex,
    );
    newMenuContent = newMenuContent.map((section) => {
      if (section.page_index >= deletePageIndex) {
        section.page_index = section.page_index - 1;
      }
      return { ...section };
    });

    const newMenu = { ...menu, content: newMenuContent };
    onChangeMenu && onChangeMenu(newMenu);
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

  const sortedMenuContent = menu.content?.sort(
    (a, b) => a.page_index - b.page_index,
  );

  return (
    <div ref={parent}>
      {sortedMenuContent.map((section, i) => {
        return (
          <div key={section.id}>
            <div className={`flex h-28 items-center justify-center`}>
              <button
                className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-5"
                onClick={() => handleAddPage(i)}>
                <FaPlus className="text-xl text-black" />
              </button>
            </div>
            <div className="flex h-full min-h-16 w-full items-center justify-between border-y-2 border-black bg-[#F6FE9B] px-8 font-bold text-black shadow-xl">
              <div>
                {i !== 0 && (
                  <button
                    onClick={() => switchIndices(i, i - 1)}
                    className="mr-2 rounded-full bg-black p-2 text-xl text-[#F6FE9B]">
                    <FaArrowUp />
                  </button>
                )}
                {i + 1 !== menu.content.length && (
                  <button
                    onClick={() => switchIndices(i, i + 1)}
                    className="rounded-full bg-black p-2 text-xl text-[#F6FE9B]">
                    <FaArrowDown />
                  </button>
                )}
              </div>
              <div className={`${figtree.className}`}>
                Page {section.page_index + 1}, Section{" "}
                {section.section_index + 1}
              </div>
              <button
                onClick={() => handleDeletePage(i)}
                className="rounded-full bg-black p-2 text-xl text-[#F6FE9B]">
                <FaTrashCan />
              </button>
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
                      id={`group_title_${section.id}`}
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
                      id={`group_price_${section.id}`}
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
                    className="text-md mt-2 w-full"
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
                    id={`group_description_${section.id}`}
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
                      id={`extra_details_${section.id}`}
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
                      id={`extra_price_${section.id}`}
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
          </div>
        );
      })}
      <div className="flex h-28 items-center justify-center">
        <button
          className="flex items-center justify-center rounded-full bg-[#F6FE9B] p-5"
          onClick={() => handleAddPage(menu.content.length)}>
          <FaPlus className="text-xl text-black" />
        </button>
      </div>
    </div>
  );
}

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
      className={`margin-x min-h-10 rounded-xl border-2 border-black bg-[#F6FE9B] px-4 font-bold text-black ${className} ${figtree.className}`}>
      <span className="flex items-center justify-center">
        {preIcon && <span className="mr-2">{preIcon}</span>} {children}
      </span>
    </button>
  );
};
