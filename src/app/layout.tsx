import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: '#222222',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pokémon Übersicht - Alle Pokémon aus 9 Generationen",
  description: "Eine inoffzielle Übersicht aller Pokémon erstellt mit nextjs 14"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
