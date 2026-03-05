// ─── Press ───────────────────────────────────────────────────────────────────
// Sorted newest first.
// Items with isTbc: true render dimmed (no hover) until titles/dates are confirmed.
// hoverQuote appears on card hover for confirmed items.

import type { PressItem } from "@/lib/types";

export const pressItems: PressItem[] = [
  {
    id: "agf-insider-2026",
    publication: "A Greener Future",
    date: "Jan 2026",
    title: "AGF Insider: Ross Patel on Best Practices for Best Results",
    hoverQuote: "\u201cWithout it we\u2019re highly ineffective. With it, we can actualise the futures that we dream of and hope for.\u201d",
    url: "https://www.agreenerfuture.com/blog-agf/agf-insider-ross-patel",
  },
  {
    id: "music-week-live-green-2025",
    publication: "Music Week",
    date: "Feb 2025",
    title: "LIVE unveils sustainability initiative for touring artists",
    hoverQuote: "\u201cWe are urging artists to make their voice heard and their opinion known.\u201d",
    url: "https://www.musicweek.com/live/read/live-unveils-sustainability-initiative-for-touring-artists/091469",
  },
  {
    id: "billboard-green-clauses-2024",
    publication: "Billboard",
    date: "Nov 2024",
    title: "Are 'Green Clauses' the Answer to Creating a More Sustainable Touring Industry?",
    hoverQuote: "\u201cDoing something is always going to be better than doing nothing.\u201d",
    url: "https://www.billboard.com/pro/green-clauses-sustainable-touring-industry-live-green-ross-patel/",
  },
  {
    id: "vision-sustainable-events-2024",
    publication: "Vision Sustainable Events",
    date: "Sep 2024",
    title: "Green Leader Q&A #45: Ross Patel, Founder, CEO & Consultant in Music, Climate & Tech",
    hoverQuote: "\u201cNo secrets, just care and compassion for the world and everything on it.\u201d",
    url: "https://visionsustainableevents.org/green-leader-qa-45-ross-patel-founder-ceo-consultant-in-music-climate-tech/",
  },
  {
    id: "iq-live-hire-2024",
    publication: "IQ Magazine",
    date: "May 2024",
    title: "LIVE hires Ross Patel as green impact consultant",
    hoverQuote: "\u201cA sustainable future for our industry is not a pipe dream — it\u2019s tangible and available.\u201d",
    url: "https://www.iq-mag.net/2024/05/live-hires-ross-patel-as-green-impact-consultant/",
  },
  {
    id: "uk-music-2021",
    publication: "UK Music",
    date: "Jul 2021",
    title: "Let The Music Move: Manager Ross Patel on the Challenges Faced by Musicians & Managers Touring the EU Post-Brexit",
    hoverQuote: "\u201cThere is no doubt these extra costs and red tape are detrimental to the band\u2019s performance.\u201d",
    url: "https://www.ukmusic.org/news/let-the-music-move-manager-ross-patel-on-the-challenges-faced-by-musicians-managers-touring-the-eu-post-brexit/",
  },
  {
    id: "music-week-eu-touring-2021",
    publication: "Music Week",
    date: "Feb 2021",
    title: "Roadies to nowhere? Artist manager Ross Patel on finding an urgent solution to the EU touring row",
    hoverQuote: "\u201cWe hope our collective voices are heard to bring these crucial issues back to the table for a resolution before it\u2019s too late.\u201d",
    url: "https://www.musicweek.com/opinion/read/roadies-to-nowhere-artist-manager-ross-patel-on-finding-an-urgent-solution-to-the-eu-touring-row/082563",
  },
  {
    id: "bbc-2021",
    publication: "BBC News",
    date: "Feb 2021",
    title: "Musicians warn of touring costs after Brexit",
    hoverQuote: "\u201cHaving a loyal fan base in one market will be the difference between having a sustained career in music, and not.\u201d",
    url: "https://www.bbc.co.uk/news/uk-england-bristol-56062365",
  },
];
