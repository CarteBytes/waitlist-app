import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import Link from "next/link";

function SocialMediaGroup({
  id,
  facebookUrl,
  instagramUrl,
  whatsappUrl,
  tiktokUrl,
  className,
  primaryTextColor,
  secondaryTextColor,
}: {
  id?: string;
  className?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  tiktokUrl?: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}) {
  return (
    <div id={id} className={`flex gap-2 ${className}`}>
      {facebookUrl && (
        <Link href={facebookUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: primaryTextColor }}>
            <FaFacebookF
              className={`h-7 w-7`}
              style={{ color: secondaryTextColor }}
            />
          </div>
        </Link>
      )}
      {instagramUrl && (
        <Link href={instagramUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: primaryTextColor }}>
            <FaInstagram
              className={`h-7 w-7`}
              style={{ color: secondaryTextColor }}
            />
          </div>
        </Link>
      )}
      {whatsappUrl && (
        <Link href={whatsappUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: primaryTextColor }}>
            <FaWhatsapp
              className={`h-7 w-7`}
              style={{ color: secondaryTextColor }}
            />
          </div>
        </Link>
      )}
      {tiktokUrl && (
        <Link href={tiktokUrl} target="_blank">
          <div
            className={`hero-social flex h-12 w-12 items-center justify-center rounded-full`}
            style={{ background: primaryTextColor }}>
            <FaTiktok
              className={`h-7 w-7`}
              style={{ color: secondaryTextColor }}
            />
          </div>
        </Link>
      )}
    </div>
  );
}

export default SocialMediaGroup;
