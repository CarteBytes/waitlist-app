import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { RestaurantColorsT } from "../types/restaurant";
import Link from "next/link";

function SocialMediaGroup({
  id,
  facebookUrl,
  instagramUrl,
  whatsappUrl,
  tiktokUrl,
  colors,
  className,
}: {
  id?: string;
  className?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  tiktokUrl?: string;
  colors: RestaurantColorsT;
}) {
  return (
    <div id={id} className={`flex gap-2 ${className}`}>
      {facebookUrl && (
        <Link href={facebookUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: colors.primary_text }}>
            <FaFacebookF
              className={`h-7 w-7`}
              style={{ color: colors.secondary_text }}
            />
          </div>
        </Link>
      )}
      {instagramUrl && (
        <Link href={instagramUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: colors.primary_text }}>
            <FaInstagram
              className={`h-7 w-7`}
              style={{ color: colors.secondary_text }}
            />
          </div>
        </Link>
      )}
      {whatsappUrl && (
        <Link href={whatsappUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: colors.primary_text }}>
            <FaWhatsapp
              className={`h-7 w-7`}
              style={{ color: colors.secondary_text }}
            />
          </div>
        </Link>
      )}
      {tiktokUrl && (
        <Link href={tiktokUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: colors.primary_text }}>
            <FaTiktok
              className={`h-7 w-7`}
              style={{ color: colors.secondary_text }}
            />
          </div>
        </Link>
      )}
    </div>
  );
}

export default SocialMediaGroup;
