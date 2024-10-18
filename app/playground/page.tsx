import React from "react";
import FooterLogoCTA from "./components/FooterLogoCTA";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { MENU, RESTAURANT } from "./content";

export default function AvenidaMenu() {
  console.log(MENU.pages.length);
  const getPageBackgroundColor = (index: number) => {
    if (index % 2 !== 0) return RESTAURANT.colors.primary;
    if (index % 4 === 0) return RESTAURANT.colors.secondary;
    return RESTAURANT.colors.primary_text;
  };

  const getPageBodyTextColor = (index: number) => {
    const backgroundColor = getPageBackgroundColor(index);
    // Body text should be primary_text except when the background is primary_text
    if (backgroundColor === RESTAURANT.colors.primary_text) {
      return RESTAURANT.colors.secondary_text; // Use secondary_text to avoid conflict with primary_text background
    }
    return RESTAURANT.colors.primary_text;
  };

  const getPageSectionTitleColor = (index: number) => {
    const backgroundColor = getPageBackgroundColor(index);
    // Title should be primary whenever the background is not primary
    if (backgroundColor !== RESTAURANT.colors.primary) {
      return RESTAURANT.colors.primary;
    }
    // Fallback title color when background is primary
    return RESTAURANT.colors.secondary;
  };

  const getContentComponent = (section: any, sectionIdx: number) => {
    if (section.type === "hero_image") {
      return <img src={section.src} className="h-auto w-full" />;
    } else if (section.type === "foods_title") {
      return (
        <h3
          className="pl-7 text-3xl font-semibold"
          style={{ color: getPageSectionTitleColor(sectionIdx) }}>
          {section.text}
        </h3>
      );
    } else if (section.type === "food_items") {
      return (
        <div className="flex flex-col gap-1 px-7">
          {section.content.map((foodItem: any) => (
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-xl"
                  style={{ color: getPageBodyTextColor(sectionIdx) }}>
                  {foodItem.name}
                </p>
                <p
                  className="text-md"
                  style={{
                    color: getPageBodyTextColor(sectionIdx),
                    opacity: 0.75,
                  }}>
                  {foodItem.description}
                </p>
              </div>
              <div>
                <p
                  className="text-lg"
                  style={{ color: getPageBodyTextColor(sectionIdx) }}>
                  {foodItem.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (section.type === "section_title") {
      return (
        <h2
          className="text-center text-5xl font-semibold"
          style={{ color: getPageSectionTitleColor(sectionIdx) }}>
          {section.text}
        </h2>
      );
    }
  };

  return (
    <div
      id="menu"
      className={`w-full font-['Open_Sans']`}
      style={{ color: RESTAURANT.colors.primary_text }}>
      <section
        id="hero"
        className={`flex h-[calc(100dvh-100px)] flex-col px-7 py-12`}
        style={{ background: RESTAURANT.colors.primary }}>
        <div id="hero-header" className="flex justify-between">
          <h1 className="text-5xl font-semibold">
            Digital <br />
            Menu
          </h1>
        </div>
        <div className="flex h-full flex-col justify-center text-center">
          <img className="h-auto w-full" id="hero-logo" src={RESTAURANT.logo} />
          {/* <h2 className="mt-6 text-4xl font-semibold">{RESTAURANT.name}</h2> */}
          {/* <h3 className="mt-2 text-xl font-semibold">{RESTAURANT.phone}</h3> */}
        </div>
        <div id="hero-socials" className="flex justify-end gap-2">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaFacebookF
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaInstagram
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaWhatsapp
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaTiktok
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
        </div>
      </section>
      {MENU.pages.map((page, i) => {
        console.log(i);
        return (
          <section
            className="flex flex-col gap-20 py-32"
            style={{ background: getPageBackgroundColor(i) }}>
            {page.sections.map((section, j) => {
              const content = getContentComponent(section, i);
              return <>{content}</>;
            })}
          </section>
        );
      })}
      <section
        id="footer"
        className="flex flex-col gap-12 px-7 py-20"
        style={{
          background: getPageBackgroundColor(MENU.pages.length + 2),
          color: getPageBodyTextColor(MENU.pages.length + 2),
        }}>
        <img className="h-auto w-full" id="footer-logo" src={RESTAURANT.logo} />
        <div className="flex h-full flex-col justify-center">
          {/* <h2 className="mt-6 text-4xl font-semibold">{RESTAURANT.name}</h2> */}
          <h3 className="mt-2 text-xl font-semibold">P: {RESTAURANT.phone}</h3>
          <h3 className="mt-2 text-xl font-semibold">
            A: {RESTAURANT.address} <br /> {RESTAURANT.city}, {RESTAURANT.state}{" "}
            {RESTAURANT.zipCode}
          </h3>
        </div>
        <div id="footer-socials" className="flex justify-center gap-2">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaFacebookF
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaInstagram
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaWhatsapp
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: RESTAURANT.colors.primary_text }}>
            <FaTiktok
              className={`h-7 w-7`}
              style={{ color: RESTAURANT.colors.secondary_text }}
            />
          </div>
        </div>
      </section>
      <FooterLogoCTA />
    </div>
  );
}
