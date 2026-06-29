"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { projects } from "@/content/projects";
import FadeIn from "@/components/ui/FadeIn";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const total = projects.length;
  const prev = () => {
    setDirection(-1);
    setActive((i) => (i === 0 ? total - 1 : i - 1));
  };
  const next = () => {
    setDirection(1);
    setActive((i) => (i === total - 1 ? 0 : i + 1));
  };
  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive((i) => (i === total - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [active, paused, total]);

  /* Swipe handler */
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold || info.velocity.x < -500) {
      next();
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      prev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

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
            <motion.button
              onClick={prev}
              className="text-left bg-[#141414] p-8 cursor-pointer h-full"
              style={getColorBorder(projects[leftIdx].banner)}
              animate={{ opacity: 0.45, scale: 0.97, rotateY: 3 }}
              whileHover={{ opacity: 0.65, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-label="Previous project"
            >
              <ProjectCardContent project={projects[leftIdx]} />
            </motion.button>

            <div className="bg-[#141414] p-8 h-full relative overflow-hidden"
              style={{ ...getColorBorder(projects[active].banner), boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ProjectCardContent project={projects[active]} showLink />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              onClick={next}
              className="text-left bg-[#141414] p-8 cursor-pointer h-full"
              style={getColorBorder(projects[rightIdx].banner)}
              animate={{ opacity: 0.45, scale: 0.97, rotateY: -3 }}
              whileHover={{ opacity: 0.65, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-label="Next project"
            >
              <ProjectCardContent project={projects[rightIdx]} />
            </motion.button>
          </div>

          {/* Single card — mobile with swipe */}
          <motion.div
            className="md:hidden bg-[#141414] p-8 touch-pan-y"
            style={getColorBorder(projects[active].banner)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCardContent project={projects[active]} showLink />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative h-px overflow-hidden transition-all duration-300"
                  style={{ width: i === active ? "32px" : "16px" }}
                  aria-label={`Go to project ${i + 1}`}
                >
                  <span className={`absolute inset-0 ${
                    i === active ? "bg-[#00c4b4]/30" : "bg-white/20 hover:bg-white/40"
                  }`} />
                  {i === active && !paused && (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-[#00c4b4]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      key={`progress-${active}`}
                    />
                  )}
                  {i === active && paused && (
                    <span className="absolute inset-0 bg-[#00c4b4]" />
                  )}
                </button>
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

function getColorBorder(banner?: string): React.CSSProperties {
  if (!banner) return {};
  if (banner.startsWith("linear-gradient")) {
    return { border: "1px solid transparent", borderImage: `${banner} 1` };
  }
  return { border: `1px solid ${banner}` };
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
