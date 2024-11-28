import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | CarteBytes",
  description:
    "Reimagining menus, simplifying dining. Serving seamless digital experiences for modern restaurants.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
