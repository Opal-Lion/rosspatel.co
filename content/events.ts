// ─── Events ──────────────────────────────────────────────────────────────────
// Speaking and DJ events — past and upcoming.
// Set upcoming: true for future events; they'll be highlighted on the site.
// Type: "speaking" | "dj"
// Sorted newest first within each group.

import type { Event } from "@/lib/types";

export const events: Event[] = [

  // ── Speaking ──────────────────────────────────────────────────────────────
  {
    id: "eps-2026",
    title: "Event Production Showcase",
    type: "speaking",
    date: "2026-02-27",
    venue: "ExCeL London",
    location: "London, UK",
    upcoming: false,
  },
  {
    id: "un-accelerator-city-2025",
    title: "United Nations Accelerator City — Expedition Two",
    type: "speaking",
    date: "2025-11-28",
    venue: "TBC",
    location: "Liverpool, UK",
    upcoming: false,
  },
  {
    id: "bdme-2025",
    title: "Berlin Dance Music Event",
    type: "speaking",
    date: "2025-05-01",
    venue: "TBC",
    location: "Berlin, Germany",
    upcoming: false,
  },
  {
    id: "music-sustainability-summit-2025",
    title: "Music Sustainability Summit",
    type: "speaking",
    date: "2025-04-15",
    venue: "TBC",
    location: "Los Angeles, USA",
    upcoming: false,
  },
  {
    id: "ilmc-37",
    title: "International Live Music Conference (ILMC 37)",
    type: "speaking",
    date: "2025-03-06",
    venue: "Royal Garden Hotel",
    location: "London, UK",
    upcoming: false,
    url: "https://37.ilmc.com/speaker/ross-patel/",
  },
  {
    id: "gei18",
    title: "Green Events & Innovations Conference (GEI18)",
    type: "speaking",
    date: "2025-02-01",
    venue: "TBC",
    location: "UK",
    upcoming: false,
  },
  {
    id: "ade-2024",
    title: "Amsterdam Dance Event (ADE)",
    type: "speaking",
    date: "2024-10-16",
    venue: "Various venues",
    location: "Amsterdam, Netherlands",
    upcoming: false,
    url: "https://www.amsterdam-dance-event.nl",
  },
  {
    id: "ilmc-36",
    title: "International Live Music Conference (ILMC 36)",
    type: "speaking",
    date: "2024-03-07",
    venue: "Royal Garden Hotel",
    location: "London, UK",
    upcoming: false,
    url: "https://36.ilmc.com/speaker/ross-patel/",
  },

  // ── DJ / Polyamoross ──────────────────────────────────────────────────────
  {
    id: "come-bye-festival-2025",
    title: "Come Bye Festival",
    type: "dj",
    date: "2025-09-13",
    venue: "Come Bye Festival",
    location: "UK",
    upcoming: false,
  },
  {
    id: "lost-village-2025",
    title: "Lost Village",
    type: "dj",
    date: "2025-08-23",
    venue: "Lost Village Festival",
    location: "Lincolnshire, UK",
    upcoming: false,
  },
  {
    id: "just-jack-motion-2025",
    title: "Just Jack at Motion",
    type: "dj",
    date: "2025-07-19",
    venue: "Motion",
    location: "Bristol, UK",
    upcoming: false,
  },
  {
    id: "carbon-project-2025",
    title: "The Carbon Project",
    type: "dj",
    date: "2025-07-01",
    venue: "TBC",
    location: "London, UK",
    upcoming: false,
  },
  {
    id: "club-love-2025",
    title: "Club Love",
    type: "dj",
    date: "2025-03-22",
    venue: "TBC",
    location: "Bristol, UK",
    upcoming: false,
    url: "https://clubloveltd.com",
  },
];
