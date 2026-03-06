"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import FadeIn from "@/components/ui/FadeIn";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = projects.length;

  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1));

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  /* Auto-advance — resets on every active change, pauses on hover */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [active, paused]);

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

        {/* Scroll-entrance wrapper — fades the whole carousel in on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 3-up carousel — desktop */}
          <div
            className="hidden md:grid grid-cols-3 gap-4 items-stretch"
            style={{ perspective: "1200px" }}
          >
            {/* Left card — click to go prev */}
            <motion.button
              onClick={prev}
              className="text-left bg-[#141414] border border-white/5 p-8 cursor-pointer h-full"
              animate={{ opacity: 0.45, scale: 0.97, rotateY: 3, y: 6 }}
              whileHover={{ opacity: 0.65, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-label="Previous project"
            >
              <ProjectCardContent project={projects[leftIdx]} />
            </motion.button>

            {/* Active card */}
            <motion.div
              className="bg-[#141414] border border-white/15 p-8 ring-1 ring-[#00c4b4]/20 h-full"
              animate={{
                y: -10,
                scale: 1,
                rotateY: 0,
                boxShadow:
                  "0 24px 64px rgba(0,0,0,0.6), 0 6px 24px rgba(0, 196, 180, 0.07)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCardContent project={projects[active]} showLink />
            </motion.div>

            {/* Right card — click to go next */}
            <motion.button
              onClick={next}
              className="text-left bg-[#141414] border border-white/5 p-8 cursor-pointer h-full"
              animate={{ opacity: 0.45, scale: 0.97, rotateY: -3, y: 6 }}
              whileHover={{ opacity: 0.65, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-label="Next project"
            >
              <ProjectCardContent project={projects[rightIdx]} />
            </motion.button>
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
        </motion.div>
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
    <div className="flex flex-col h-full">
      <span className="inline-block font-body text-xs tracking-wider uppercase px-3 py-1 border border-[#00c4b4]/40 text-[#00c4b4] mb-4 self-start">
        {project.role}
      </span>
      <h3 className="font-display text-xl md:text-2xl text-white mb-3">
        {project.name}
      </h3>
      <p className="font-body text-white/60 text-sm leading-relaxed flex-1 line-clamp-3">
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
