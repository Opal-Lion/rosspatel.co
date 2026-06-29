"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { events } from "@/content/events";
import type { EventType } from "@/lib/types";
import FadeIn from "@/components/ui/FadeIn";

type Filter = "all" | "upcoming" | EventType;
type ViewMode = "list" | "timeline";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Speaking", value: "speaking" },
  { label: "DJ / Polyamoross", value: "dj" },
];

const PAGE_SIZE = 5;

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const monthName = new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    month: "long",
  });
  return `${ordinal(day)} ${monthName} ${year}`;
}

const countryFlags: Record<string, string> = {
  UK: "\u{1F1EC}\u{1F1E7}",
  DE: "\u{1F1E9}\u{1F1EA}",
  USA: "\u{1F1FA}\u{1F1F8}",
  NL: "\u{1F1F3}\u{1F1F1}",
  PT: "\u{1F1F5}\u{1F1F9}",
};

function getFlag(location: string): string {
  for (const [code, flag] of Object.entries(countryFlags)) {
    if (location.endsWith(code) || location.includes(`, ${code}`)) return flag;
  }
  return "";
}

function generateICS(event: typeof events[number]) {
  const date = event.date.replace(/-/g, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//rosspatel.co//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${date}`,
    `DTEND;VALUE=DATE:${date}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue ? `${event.venue}, ${event.location}` : event.location}`,
    event.url ? `URL:${event.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Events() {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(0);
  const [view, setView] = useState<ViewMode>("list");

  const handleFilter = (f: Filter) => {
    setFilter(f);
    setPage(0);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isUpcoming = (e: typeof events[number]) => new Date(e.date + "T23:59:59") >= today;

  const allSorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filtered =
    filter === "upcoming"
      ? allSorted.filter(isUpcoming)
      : filter === "all"
      ? allSorted
      : allSorted.filter((e) => e.type === filter);

  const upcoming = filtered
    .filter(isUpcoming)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = filtered.filter((e) => !isUpcoming(e));

  const totalPages = Math.ceil(past.length / PAGE_SIZE);
  const paginatedPast = past.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Timeline data: all filtered events sorted chronologically
  const timelineEvents = [...filtered].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const years = [...new Set(timelineEvents.map((e) => e.date.split("-")[0]))];

  return (
    <section id="events" className="section-padding bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <FadeIn direction="up">
            <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
              Events
            </p>
            <h2 className="text-section-title text-white">
              On the stage.
            </h2>
          </FadeIn>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* View toggle */}
            <div className="flex gap-1">
              <button
                onClick={() => setView("list")}
                className={`font-body text-xs tracking-wider uppercase px-3 py-2 border transition-colors ${
                  view === "list"
                    ? "bg-white/10 border-white/20 text-white/70"
                    : "border-white/10 text-white/30 hover:text-white/50"
                }`}
                aria-label="List view"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button
                onClick={() => setView("timeline")}
                className={`font-body text-xs tracking-wider uppercase px-3 py-2 border transition-colors ${
                  view === "timeline"
                    ? "bg-white/10 border-white/20 text-white/70"
                    : "border-white/10 text-white/30 hover:text-white/50"
                }`}
                aria-label="Timeline view"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
                </svg>
              </button>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className={`font-body text-xs tracking-wider uppercase px-4 py-2 border transition-colors ${
                    filter === f.value
                      ? "bg-[#00c4b4] border-[#00c4b4] text-[#0a0a0a]"
                      : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {view === "list" ? (
          <>
            {/* Upcoming events */}
            {upcoming.length > 0 && (
              <div className="mb-12">
                <p className="font-body text-xs text-white/30 tracking-widest uppercase mb-4">
                  Upcoming
                </p>
                <div className="border-t border-white/5">
                  {upcoming.map((event, idx) => (
                    <EventRow
                      key={`${filter}-${event.id}`}
                      event={event}
                      isUpcoming
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past events */}
            {past.length > 0 && filter !== "upcoming" && (
              <div>
                <p className="font-body text-xs text-white/30 tracking-widest uppercase mb-4">
                  Past
                </p>
                <div className="border-t border-white/5">
                  {paginatedPast.map((event, idx) => (
                    <EventRow
                      key={`${filter}-${page}-${event.id}`}
                      event={event}
                      index={idx}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="font-body text-sm text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors px-3 py-1 border border-white/10 hover:border-white/30 disabled:border-white/5"
                    >
                      ←
                    </button>
                    <span className="font-body text-xs text-white/30 tracking-widest">
                      {page + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={page === totalPages - 1}
                      className="font-body text-sm text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors px-3 py-1 border border-white/10 hover:border-white/30 disabled:border-white/5"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Timeline view */
          <div className="relative pl-8 md:pl-12">
            {/* Vertical line */}
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-white/10" />

            {years.map((year) => {
              const yearEvents = timelineEvents.filter((e) => e.date.startsWith(year));
              return (
                <div key={year} className="mb-8">
                  {/* Year marker */}
                  <div className="relative mb-4">
                    <span
                      className="absolute -left-8 md:-left-12 top-0 w-6 md:w-10 h-6 flex items-center justify-center"
                    >
                      <span className="w-3 h-3 rounded-full bg-[#00c4b4]" />
                    </span>
                    <span className="font-display text-lg text-white/60 font-bold">
                      {year}
                    </span>
                  </div>

                  {/* Events for this year */}
                  <div className="space-y-3">
                    {yearEvents.map((event, idx) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="relative"
                      >
                        <span className="absolute -left-8 md:-left-12 top-3 w-6 md:w-10 flex items-center justify-center">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isUpcoming(event) ? "bg-[#00c4b4] shadow-[0_0_6px_rgba(0,196,180,0.5)]" : "bg-white/20"
                            }`}
                          />
                        </span>
                        <div
                          className={`p-4 border transition-colors ${
                            isUpcoming(event)
                              ? "border-[#00c4b4]/20 bg-[#00c4b4]/5"
                              : "border-white/5 bg-[#0a0a0a]"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`font-body text-xs tracking-wider uppercase px-2 py-0.5 ${
                                    event.type === "speaking"
                                      ? "bg-[#00c4b4]/10 text-[#00c4b4]"
                                      : "bg-[#e8432d]/10 text-[#e8432d]"
                                  }`}
                                >
                                  {event.type === "speaking" ? "Speaking" : "DJ"}
                                </span>
                                <span className={`font-body text-sm font-medium ${
                                  isUpcoming(event) ? "text-white" : "text-white/60"
                                }`}>
                                  {event.title}
                                </span>
                              </div>
                              <p className="font-body text-xs text-white/30">
                                {event.venue ? `${event.venue} · ` : ""}{event.location}
                                {getFlag(event.location) && ` ${getFlag(event.location)}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-body text-xs text-white/30">{formatDate(event.date)}</span>
                              {isUpcoming(event) && (
                                <button
                                  onClick={() => generateICS(event)}
                                  className="font-body text-xs text-[#00c4b4] hover:text-[#00c4b4]/70 transition-colors whitespace-nowrap"
                                >
                                  Add to Cal
                                </button>
                              )}
                              {event.url && (
                                <a
                                  href={event.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-body text-xs text-[#00c4b4] hover:text-[#00c4b4]/70 transition-colors"
                                >
                                  Info →
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function EventRow({
  event,
  isUpcoming = false,
  index = 0,
}: {
  event: (typeof events)[number];
  isUpcoming?: boolean;
  index?: number;
}) {
  const e = event;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b transition-colors ${
        isUpcoming
          ? "border-[#00c4b4]/20 bg-[#00c4b4]/5 hover:bg-[#00c4b4]/8"
          : "border-white/5 bg-[#0a0a0a] hover:border-white/10"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`mt-0.5 flex-shrink-0 font-body text-xs tracking-wider uppercase px-2 py-0.5 ${
            e.type === "speaking"
              ? "bg-[#00c4b4]/10 text-[#00c4b4]"
              : "bg-[#e8432d]/10 text-[#e8432d]"
          }`}
        >
          {e.type === "speaking" ? "Speaking" : "DJ"}
        </span>

        <div>
          <p
            className={`font-body text-base font-medium transition-colors ${
              isUpcoming ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            {e.title}
          </p>
          <p className="font-body text-sm text-white/40 mt-0.5">
            {e.venue ? `${e.venue} · ${e.location}` : e.location}
            {getFlag(e.location) && ` ${getFlag(e.location)}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-shrink-0 pl-10 sm:pl-0">
        <p className="font-body text-sm text-white/40">{formatDate(e.date)}</p>
        {isUpcoming && (
          <button
            onClick={() => generateICS(e)}
            className="font-body text-xs text-[#00c4b4] hover:text-[#00c4b4]/70 transition-colors whitespace-nowrap"
          >
            Add to Cal
          </button>
        )}
        {e.url && (
          <a
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-[#00c4b4] hover:text-[#00c4b4]/70 transition-colors"
          >
            Info →
          </a>
        )}
      </div>
    </motion.div>
  );
}
