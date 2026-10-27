
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteBasketProvider } from "@/components/QuoteBasketProvider";

import "./globals.css";

/* =========================================
   BARK ORNAMENT - ROOT LAYOUT
   Theme: Golden Coastal Luxury
   ========================================= */

/* Website SEO metadata */
export const metadata: Metadata = {
  title: {
    default:
      "Bark Ornament | Customized Hospitality Products",
    template: "%s | Bark Ornament",
  },

  description:
    "Explore customized hospitality products from Bark Ornament (Pvt) Ltd, including printed products, wooden accessories, packaging, gifts and hotel supplies.",

  applicationName: "Bark Ornament",

  keywords: [
    "Bark Ornament",
    "hospitality products",
    "hotel supplies",
    "customized hotel products",
    "wooden hotel accessories",
    "hotel stationery",
    "hospitality packaging",
    "Maldives hotel supplies",
    "Seychelles hotel supplies",
    "Sri Lanka hotel supplies",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

/* Mobile viewport and browser theme */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F0",
};

/* Root layout component */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>

  <QuoteBasketProvider>
  <Header />

  <main id="main-content" className="min-h-[60vh]">
    {children}
  </main>

  <Footer />
</QuoteBasketProvider>
</body>
    </html>
  );
}
