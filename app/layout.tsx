import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/Chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | 24/7 Garage Door Repair & Installation`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Nationwide garage door repair, installation and opener service. Call 24/7 and we dispatch a licensed local technician for springs, cables, panels, tracks and openers.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, address: false, email: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    images: [{ url: "/images/og-hero-a-residential-garage-door-installation-gated-driveway-1200x630.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@firstrespondergd",
    images: ["/images/og-hero-a-residential-garage-door-installation-gated-driveway-1200x630.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1b2b",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
