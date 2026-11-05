import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { contact, profile, site } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Full name first so searches for the name on the CV match, short name after for everyone else
const siteTitle = `${profile.fullName} (${profile.firstName} ${profile.lastName}) | ${profile.title}`;

// The share image is app/opengraph-image.png (alt text in opengraph-image.alt.txt); Next.js adds it automatically
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: siteTitle,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.fullName, url: site.url }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  // Lets search engines and AI answers quote the page and show large image previews
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.fullName,
    title: siteTitle,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: site.description,
  },
  other: {
    "geo.region": contact.countryCode,
    "geo.placename": contact.city,
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // THEME_INIT_SCRIPT adds "dark" to this className before React hydrates
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
