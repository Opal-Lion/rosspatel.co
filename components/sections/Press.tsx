"use client";

import { pressItems } from "@/content/press";
import FadeIn from "@/components/ui/FadeIn";

export default function Press() {
  return (
    <section id="press" className="section-padding bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
            Press
          </p>
          <h2 className="text-section-title text-white">
            In the news.
          </h2>
        </FadeIn>

        {/* Press grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {pressItems.map((item, i) => (
            <FadeIn key={item.id} direction="up" delay={i * 0.07} className="h-full">
              <PressCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PressCard({ item }: { item: typeof pressItems[0] }) {
  const isTbc = item.isTbc || item.title.startsWith("TBC");
  const isLinked = !isTbc && !!item.url;
  const Tag = isLinked ? "a" : "div";
  const linkProps = isLinked
    ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag
      {...linkProps}
      className={`group relative overflow-hidden bg-[#0a0a0a] border border-white/5 p-8 transition-all duration-300 h-full block ${
        isTbc ? "opacity-40" : "hover:border-white/15 cursor-pointer"
      }`}
    >
      <p className="font-body text-xs text-white/30 tracking-widest uppercase mb-3">
        {item.date}
      </p>
      <p className="font-display text-xl text-[#00c4b4] mb-3">{item.publication}</p>
      <p className="font-body text-white/70 text-sm leading-relaxed line-clamp-3">
        {item.title}
      </p>

      {/* Hover quote overlay */}
      {!isTbc && (
        <div className="absolute inset-0 bg-[#141414] flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-display text-white/80 text-base italic leading-relaxed text-center">
            {item.hoverQuote}
          </p>
        </div>
      )}
    </Tag>
  );
}
