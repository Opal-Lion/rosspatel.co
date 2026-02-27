// ─── Shared TypeScript types ────────────────────────────────────────────────
// Edit content in /content/*.ts — these types keep everything consistent.

export type EventType = "speaking" | "dj";

export interface Event {
  id: string;
  title: string;          // e.g. "International Live Music Conference (ILMC 37)"
  type: EventType;
  date: string;           // ISO format: "2025-03-06"
  venue: string;          // e.g. "Royal Garden Hotel, London"
  location: string;       // e.g. "London, UK"
  upcoming: boolean;
  url?: string;
}

export interface Project {
  id: string;
  name: string;           // e.g. "LIVE Green"
  role: string;           // e.g. "Impact Consultant"
  description: string;
  url?: string;
  logoPath?: string;      // path relative to /public
}

export interface PressItem {
  id: string;
  publication: string;    // e.g. "IQ Magazine"
  date: string;           // e.g. "May 2024"
  title: string;
  hoverQuote: string;     // Short quote revealed on hover
  url?: string;
  logoPath?: string;      // path relative to /public/images/logos
  isTbc?: boolean;        // renders dimmed, no hover, until confirmed
}

export interface SpeakingTopic {
  title: string;
  description: string;
}
