import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viu - ดูซีรีส์ออนไลน์ ดูหนังออนไลน์",
  description: "Viu Thailand Prototype - Improved UX",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
