import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import App from "./app";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarteBytes | Waitlist",
  description:
    "Reimagining menus, simplifying dining. Serving seamless digital experiences for modern restaurants.",
  openGraph: {
    images: [
      {
        url: "/social-logo.png",
        width: 1280,
        height: 832,
        type: "image/png",
      },
    ],
    siteName: "CarteBytes | Waitlist",
    url: "https://www.cartebytes.com/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/social-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${figtree.className}`}
      suppressHydrationWarning>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
