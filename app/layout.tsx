import type { Metadata } from "next";
import { Suspense } from "react";
import TopLoader from "@/components/shared/TopLoader";
import { Toaster } from "react-hot-toast";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gamingty",
  description: "Your Ultimate Gaming Hub",
};

// Inline script to apply theme before React hydrates (prevents flash)
const themeScript = `
  (function() {
    try {
      const stored = localStorage.getItem('flex-theme');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.state && parsed.state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    } catch (e) {}
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        {children}

        {/* Global toast container */}
        <Toaster />
      </body>
    </html>
  );
}
