import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ross Patel — Music. Culture. Impact.",
  description:
    "Mx Ross Patel (they/them) — artivist, strategist, and culture maker. LIVE Green Impact Consultant, DJ Polyamoross, and consultant at the intersection of music, sustainability, and identity.",
  keywords: [
    "Ross Patel",
    "music consultant",
    "sustainability",
    "climate action",
    "live music",
    "artivism",
    "DJ Polyamoross",
    "LIVE Green",
    "music industry strategist",
  ],
  authors: [{ name: "Ross Patel" }],
  openGraph: {
    title: "Ross Patel — Music. Culture. Impact.",
    description:
      "Artivist, strategist, and culture maker operating at the intersection of music, sustainability, and identity.",
    url: "https://rosspatel.co",
    siteName: "Ross Patel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rosswellpatel",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
