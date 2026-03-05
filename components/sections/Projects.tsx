"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import FadeIn from "@/components/ui/FadeIn";

export default function Projects() {
  const [active, setActive] = useState(0);
  const total = projects.length;

  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1));

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  return (
    <section id="projects" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
            Projects & Initiatives
          </p>
          <h2 className="text-section-title text-white">
            Find me at.
          </h2>
        </FadeIn>

        {/* 3-up carousel — desktop */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {/* Left card — click to go prev */}
          <button
            onClick={prev}
            className="text-left bg-[#141414] border border-white/5 p-8 opacity-50 hover:opacity-70 transition-all duration-300 cursor-pointer"
            aria-label="Previous project"
          >
            <ProjectCardContent project={projects[leftIdx]} />
          </button>

          {/* Active card */}
          <div className="bg-[#141414] border border-white/15 p-8 ring-1 ring-[#00c4b4]/20">
            <ProjectCardContent project={projects[active]} showLink />
          </div>

          {/* Right card — click to go next */}
          <button
            onClick={next}
            className="text-left bg-[#141414] border border-white/5 p-8 opacity-50 hover:opacity-70 transition-all duration-300 cursor-pointer"
            aria-label="Next project"
          >
            <ProjectCardContent project={projects[rightIdx]} />
          </button>
        </div>

        {/* Single card — mobile */}
        <div className="md:hidden bg-[#141414] border border-white/10 p-8">
          <ProjectCardContent project={projects[active]} showLink />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-px transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-[#00c4b4]"
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 border border-white/20 text-white/60 hover:border-[#00c4b4] hover:text-[#00c4b4] transition-colors flex items-center justify-center text-lg"
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-white/20 text-white/60 hover:border-[#00c4b4] hover:text-[#00c4b4] transition-colors flex items-center justify-center text-lg"
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCardContent({
  project,
  showLink = false,
}: {
  project: typeof projects[0];
  showLink?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-[240px]">
      <span className="inline-block font-body text-xs tracking-wider uppercase px-3 py-1 border border-[#00c4b4]/40 text-[#00c4b4] mb-4 self-start">
        {project.role}
      </span>
      <h3 className="font-display text-xl md:text-2xl text-white mb-3">
        {project.name}
      </h3>
      <p className="font-body text-white/60 text-sm leading-relaxed flex-1">
        {project.description}
      </p>
      {showLink && project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm text-[#00c4b4] hover:text-[#00c4b4]/70 transition-colors mt-6 self-start"
          onClick={(e) => e.stopPropagation()}
        >
          Visit site →
        </a>
      )}
    </div>
  );
}
