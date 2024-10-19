import React from "react";
import FooterLogoCTA from "./components/FooterLogoCTA";
import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaStore,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { MENU, RESTAURANT } from "./content";
// import RusticEdge1 from "./svgs/RusticEdge1";
import chroma from "chroma-js";

export default function AvenidaMenu() {
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
    if (RESTAURANT.colors.primary === RESTAURANT.colors.secondary) {
      return RESTAURANT.colors.accent;
    }

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
    } else if (section.type === "food_items") {
      return (
        <div>
          <h3
            className="pl-7 pt-8 text-3xl font-semibold"
            style={{ color: getPageSectionTitleColor(sectionIdx) }}>
            {section.title}
          </h3>

          <div className="flex flex-col gap-3 px-7 pb-8 pt-1">
            {section.content.map((foodItem: any, i: number) => (
              <div key={i + 50} className="flex items-start justify-between">
                <div>
                  <p
                    className="text-xl"
                    style={{ color: getPageBodyTextColor(sectionIdx) }}>
                    {foodItem.name}
                  </p>
                  <p
                    className="text-md leading-tight"
                    style={{
                      color: getPageBodyTextColor(sectionIdx),
                      opacity: 0.75,
                    }}>
                    {foodItem.description}
                  </p>
                  {foodItem.calories && (
                    <p
                      className="text-md font-thin leading-tight"
                      style={{
                        color: getPageBodyTextColor(sectionIdx),
                        opacity: 0.75,
                      }}>
                      {foodItem.calories} Cal
                    </p>
                  )}
                </div>
                <div>
                  <p
                    className="text-lg"
                    style={{ color: getPageBodyTextColor(sectionIdx) }}>
                    ${foodItem.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

  const gradientColors = chroma
    .scale([
      chroma(RESTAURANT.colors.primary).brighten(0.2),
      RESTAURANT.colors.primary,
      chroma(RESTAURANT.colors.primary).darken(0.2),
    ])
    .mode("lab")
    .colors(5);
  const gradientString = `linear-gradient(90deg, ${gradientColors.join(", ")})`;

  return (
    <div className="flex justify-center">
      <div
        id="menu"
        className={`w-full max-w-xl font-sans`}
        style={{ color: RESTAURANT.colors.primary_text }}>
        <section
          id="hero"
          className={`hero duration-2000 flex h-[calc(100lvh-60px)] flex-col px-7 py-12 transition-all ease-linear`}
          style={{ background: gradientString }}>
          <div id="hero-header" className="flex justify-between">
            <h1 className="text-5xl font-semibold">
              Digital <br />
              Menu
            </h1>
          </div>
          <div className="flex h-full flex-col justify-center text-center">
            <img
              className="h-auto w-full"
              id="hero-logo"
              src={RESTAURANT.logo}
            />
            {/* <h2 className="mt-6 text-4xl font-semibold">{RESTAURANT.name}</h2> */}
            {/* <h3 className="mt-2 text-xl font-semibold">{RESTAURANT.phone}</h3> */}
            <h3 className="mt-4 text-xl font-semibold">
              {RESTAURANT.city}, {RESTAURANT.state}
            </h3>
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
        {/* <RusticEdge1
          color={RESTAURANT.colors.primary}
          className="relative z-10 mb-[-20%]"
        /> */}
        {MENU.pages.map((page, i) => {
          return (
            <section
              key={i}
              className="flex flex-col gap-20 pb-20"
              style={{ background: getPageBackgroundColor(i) }}>
              {page.sections.map((section, j) => {
                const content = getContentComponent(section, i);
                return (
                  <div key={j + 100} className="before:pt-4">
                    {content}
                  </div>
                );
              })}
            </section>
          );
        })}
        <section
          id="footer"
          className="flex flex-col items-center gap-12 px-7 py-24"
          style={{
            background: RESTAURANT.colors.secondary, //getPageBackgroundColor(MENU.pages.length + 2),
            color: RESTAURANT.colors.primary_text, //getPageBodyTextColor(MENU.pages.length + 2),
          }}>
          <img
            className="h-auto w-full"
            id="footer-logo"
            src={RESTAURANT.logo}
          />
          <div className="flex h-full flex-col justify-center">
            {/* <h2 className="mt-6 text-4xl font-semibold">{RESTAURANT.name}</h2> */}
            <h3 className="mt-2 flex items-start gap-4 text-2xl font-semibold">
              <div className="mt-1">
                <FaPhone />
              </div>
              <div>{RESTAURANT.phone}</div>
            </h3>
            <h3 className="mt-2 flex items-start gap-4 text-2xl font-semibold">
              <div className="mt-1">
                <FaStore />
              </div>
              <div>
                {" "}
                {RESTAURANT.address} <br /> {RESTAURANT.city},{" "}
                {RESTAURANT.state} {RESTAURANT.zipCode}
              </div>
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
    </div>
  );
}
