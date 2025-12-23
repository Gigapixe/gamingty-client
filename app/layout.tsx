import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gamingty",
  description: "Your Ultimate Gaming Hub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
