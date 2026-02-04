import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aryanganju.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aryan Ganju - Software Engineer",
  description:
    "Software Engineer and Final Year Computer Science student at NUS. Specializing in AI/ML and Database Systems.",
  keywords: [
    "Aryan Ganju",
    "Software Engineer",
    "NUS",
    "AI",
    "Machine Learning",
    "Full Stack Developer",
  ],
  authors: [{ name: "Aryan Ganju" }],
  openGraph: {
    title: "Aryan Ganju - Software Engineer",
    description:
      "Software Engineer and Final Year CS student at NUS. Building AI systems and breaking down complexity.",
    url: siteUrl,
    siteName: "Aryan Ganju",
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Ganju - Software Engineer",
    description:
      "Software Engineer and Final Year CS student at NUS. Specializing in AI/ML and Database Systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
