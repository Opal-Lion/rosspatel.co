"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const words = ["Music", "Culture", "Impact"];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/press-shots/GEI_ALL_214.jpg"
          alt="Ross Patel speaking at GEI18"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full md:pb-6">
        <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Main headline with staggered animation */}
          <h1 className="text-hero text-white mb-10 whitespace-nowrap">
            {words.map((word, i) => (
              <span key={i}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
                <motion.span
                  className="text-[#00c4b4]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block" }}
                >
                  .
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#00c4b4] text-[#0a0a0a] font-body font-semibold text-sm tracking-wide uppercase hover:bg-[#00c4b4]/90 transition-colors"
            >
              Work With Me
            </a>
          </motion.div>
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 hidden md:flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-white rotate-90 mb-4">
          Scroll
        </span>
        <div className="w-px h-16 bg-white/40" />
        <span className="font-body text-xs text-white/60 animate-scroll-pulse">↓</span>
      </div>
    </section>
  );
}
