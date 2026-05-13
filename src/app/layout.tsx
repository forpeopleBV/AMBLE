import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMS_SANITY Research Lab",
  description:
    "A research and development website for learning Next.js, Sanity CMS, Vercel, GitHub, data integrations, and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body>{children}</body>
    </html>
  );
}
