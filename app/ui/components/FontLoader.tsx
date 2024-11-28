"use client";
import { useEffect } from "react";
import Head from "next/head";

const getGoogleFontLink = (fontFamily: string) => {
  const formattedFont = fontFamily.replace(" ", "+");
  return `https://fonts.googleapis.com/css2?family=${formattedFont}&display=optional`;
};

interface FontLoaderProps {
  fontFamily: string;
}

const FontLoader: React.FC<FontLoaderProps> = ({ fontFamily }) => {
  const fontUrl = getGoogleFontLink(fontFamily);

  useEffect(() => {
    // Preload the font URL for faster loading
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontUrl]);

  return (
    <Head>
      <link href={fontUrl} rel="stylesheet" />
    </Head>
  );
};

export default FontLoader;
