"use client";

import { useState } from "react";
import { events } from "@/content/events";
import type { EventType } from "@/lib/types";
import FadeIn from "@/components/ui/FadeIn";

type Filter = "all" | "upcoming" | EventType;

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

export default function Events() {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(0);

  const handleFilter = (f: Filter) => {
    setFilter(f);
    setPage(0);
  };

  const allSorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filtered =
    filter === "upcoming"
      ? allSorted.filter((e) => e.upcoming)
      : filter === "all"
      ? allSorted
      : allSorted.filter((e) => e.type === filter);

  // Upcoming sorted soonest first
  const upcoming = filtered
    .filter((e) => e.upcoming)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Past sorted newest first
  const past = filtered.filter((e) => !e.upcoming);

  const totalPages = Math.ceil(past.length / PAGE_SIZE);
  const paginatedPast = past.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

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

        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <div className="mb-12">
            <p className="font-body text-xs text-white/30 tracking-widest uppercase mb-4">
              Upcoming
            </p>
            <div className="space-y-px">
              {upcoming.map((event) => (
                <EventRow key={event.id} event={event} isUpcoming />
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
            <div className="space-y-px">
              {paginatedPast.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
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
      </div>
    </section>
  );
}

function EventRow({
  event,
  isUpcoming = false,
}: {
  event: (typeof events)[number];
  isUpcoming?: boolean;
}) {
  const e = event;

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border transition-colors ${
        isUpcoming
          ? "border-[#00c4b4]/20 bg-[#00c4b4]/5 hover:bg-[#00c4b4]/8"
          : "border-white/5 bg-[#0a0a0a] hover:border-white/10"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Type badge */}
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
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-shrink-0 pl-10 sm:pl-0">
        <p className="font-body text-sm text-white/40">{formatDate(e.date)}</p>
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
    </div>
  );
}
