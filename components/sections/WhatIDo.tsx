const dimensions = [
  {
    number: "01",
    title: "Consulting & Strategy",
    description:
      "Strategic advisory for music businesses, labels, agencies, and brands navigating complexity — from commercial growth to sustainability integration and organisational change.",
    tags: ["Music Industry", "Business Strategy", "Sustainability", "Brand"],
    accent: "#00c4b4",
  },
  {
    number: "02",
    title: "Climate Action",
    description:
      "As LIVE Green Impact Consultant, leading the decarbonisation of the UK's live events sector — connecting industry, government, artists, and the United Nations around collaborative, intersectional climate solutions.",
    tags: ["LIVE Green", "Decarbonisation", "Policy", "Events Industry"],
    accent: "#05d133",
    highlight: "Top speaking events: ILMC · ADE · GEI18 · BDME · Event Production Showcase",
  },
  {
    number: "03",
    title: "Artivism",
    description:
      "Council Member of the Global Artivism movement and Co-Chair of the Global Music Advisory Board at In Place of War — using cultural power as a lever for systemic social and environmental change.",
    tags: ["Global Artivism", "In Place of War", "Social Change", "Culture"],
    accent: "#72df0c",
  },
  {
    number: "04",
    title: "Speaking",
    description:
      "Keynotes, panels, and moderated conversations at internationally recognised industry events — bringing sharp strategic thinking and genuine personal experience to the stage.",
    tags: ["Keynotes", "Panels", "ILMC", "ADE", "GEI", "BDME"],
    accent: "#ecc413",
    highlight: "ILMC · Amsterdam Dance Event · Berlin Dance Music Event · GEI18 · Event Production Showcase",
  },
  {
    number: "05",
    title: "DJ / Polyamoross",
    description:
      "Performing and booking as DJ Polyamoross — creating intentionally queer, inclusive dancefloor experiences that centre safety, joy, and community. Booker at Club Love.",
    tags: ["Club Love", "Queer Spaces", "Nightlife", "Inclusive Culture"],
    accent: "#e8432d",
  },
];

import FadeIn from "@/components/ui/FadeIn";

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="section-padding bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="mb-16">
          <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
            What I Do
          </p>
          <h2 className="text-section-title text-white max-w-2xl">
            One person.<br />Many dimensions.
          </h2>
        </FadeIn>

        <div className="space-y-px">
          {dimensions.map((dim, i) => (
            <FadeIn key={dim.number} direction="up" delay={i * 0.07}>
            <div
              key={dim.number}
              className="group flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-10 bg-[#0a0a0a] hover:bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default"
            >
              {/* Number */}
              <span
                className="font-display text-4xl md:text-5xl font-bold opacity-20 group-hover:opacity-40 transition-opacity flex-shrink-0 w-16"
                style={{ color: dim.accent }}
              >
                {dim.number}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl text-white mb-3 group-hover:text-[#00c4b4] transition-colors">
                  {dim.title}
                </h3>
                <p className="font-body text-white/60 text-base leading-relaxed mb-4 max-w-2xl">
                  {dim.description}
                </p>
                {dim.highlight && (
                  <p className="font-body text-xs text-[#00c4b4]/70 tracking-wide mb-4">
                    {dim.highlight}
                  </p>
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
