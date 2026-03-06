"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const dimensions = [
  {
    number: "01",
    title: "Consulting & Strategy",
    description:
      "Strategic advisory for music businesses, labels, agencies, and brands navigating complexity, from commercial growth to sustainability integration and organisational change.",
    tags: ["Music Industry", "Business Strategy", "Sustainability", "Brand"],
    accent: "#00c4b4",
  },
  {
    number: "02",
    title: "Climate Action",
    description:
      "As LIVE Green Impact Consultant, leading the decarbonisation of the UK's live events sector, connecting industry, government, artists, and the United Nations around collaborative, intersectional climate solutions.",
    tags: ["LIVE Green", "Decarbonisation", "Policy", "Events Industry"],
    accent: "#05d133",
  },
  {
    number: "03",
    title: "Artivism",
    description:
      "Council Member of the Global Artivism movement and Co-Chair of the Global Music Advisory Board at In Place of War, using cultural power as a lever for systemic social and environmental change.",
    tags: ["Global Artivism", "In Place of War", "Social Change", "Culture"],
    accent: "#72df0c",
  },
  {
    number: "04",
    title: "Speaking",
    description:
      "Keynotes, panels, and moderated conversations at internationally recognised industry events, bringing sharp strategic thinking and genuine personal experience to the stage.",
    tags: ["Keynotes", "Panels"],
    accent: "#ecc413",
    highlight: "ILMC · Berlin Dance Music Event · Music Sustainability Summit · Green Events & Innovations · Event Production Showcase",
  },
  {
    number: "05",
    title: "DJ / Polyamoross",
    description:
      "Performing and booking as DJ Polyamoross, creating intentionally queer, inclusive dancefloor experiences that centre safety, joy, and community. Booker at Club Love.",
    tags: ["Club Love", "Queer Spaces", "Nightlife", "Inclusive Culture"],
    accent: "#e8432d",
    highlight: "Glastonbury · Lost Village · Come Bye Festival · Pikes Ibiza · Body Movements · Queens Yard Summer Party",
  },
];

// How many px each card overlaps the one above it when all are collapsed.
const OVERLAP = 20;

// Fixed height (px) for the expanded content panel.
// All cards expand to exactly this height — keeps the section size stable.
const EXPANDED_H = 240;

export default function WhatIDo() {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive((prev) => (prev === i ? null : i));

  const getMarginTop = (i: number) => {
    if (i === 0) return 0;
    if (active !== null && i > active) return 1;
    return -OVERLAP;
  };

  return (
    <section id="what-i-do" className="section-padding bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="mb-16">
          <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
            What I Do
          </p>
          <h2 className="text-section-title text-white">
            Across the board.
          </h2>
        </FadeIn>

        <div className="relative">
          {dimensions.map((dim, i) => {
            const isActive = active === i;

            return (
              // Outer div controls stacking via CSS margin + z-index
              <div
                key={dim.number}
                style={{
                  position: "relative",
                  zIndex: isActive ? 50 : i + 1,
                  marginTop: `${getMarginTop(i)}px`,
                  transition: "margin-top 0.4s ease-in-out",
                }}
              >
                <FadeIn direction="up" delay={i * 0.07}>
                  <div
                    className={`bg-[#0a0a0a] border transition-colors duration-300 ${
                      isActive ? "border-white/10" : "border-white/5"
                    }`}
                  >
                    {/* Header — always visible, click to toggle */}
                    <button
                      className="w-full flex items-start gap-6 md:gap-10 px-8 md:px-10 py-5 text-left group"
                      onClick={() => toggle(i)}
                    >
                      {/* Number */}
                      <span
                        className="font-display text-5xl font-bold leading-none flex-shrink-0 w-16 opacity-30 group-hover:opacity-60 transition-opacity"
                        style={{ color: dim.accent }}
                      >
                        {dim.number}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-[#00c4b4] transition-colors flex-1 pt-1 leading-tight">
                        {dim.title}
                      </h3>

                      {/* Arrow — rotates 180° when open */}
                      <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-8 h-8 border border-white/20 text-white/50 group-hover:border-white/40 group-hover:text-white/70 transition-colors flex items-center justify-center text-sm flex-shrink-0 mt-1"
                      >
                        ↓
                      </motion.span>
                    </button>

                    {/* Expandable content — fixed height so all cards expand to same size */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: EXPANDED_H, opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          {/* Indent to align with title (spacer = number width + gap) */}
                          <div className="flex gap-6 md:gap-10 px-8 md:px-10 pb-8">
                            <div className="w-16 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-body text-white/60 text-base leading-relaxed mb-4 max-w-2xl">
                                {dim.description}
                              </p>

                              {/* Highlight line — spins into place */}
                              {dim.highlight && (
                                <div style={{ perspective: "600px" }}>
                                  <motion.p
                                    initial={{ opacity: 0, rotateX: 90 }}
                                    animate={{ opacity: 1, rotateX: 0 }}
                                    transition={{
                                      duration: 0.45,
                                      delay: 0.2,
                                      ease: "easeOut",
                                    }}
                                    className="font-body text-xs text-[#00c4b4]/70 tracking-wide mb-4"
                                  >
                                    {dim.highlight}
                                  </motion.p>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {dim.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="font-body text-xs px-2.5 py-1 bg-white/5 text-white/40 tracking-wide"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
