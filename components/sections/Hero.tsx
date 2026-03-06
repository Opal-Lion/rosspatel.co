import Image from "next/image";
import { about } from "@/content/about";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
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
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Main headline */}
          <h1 className="text-hero text-white mb-10 whitespace-nowrap">
            {["Music", "Culture", "Impact"].map((word, i, arr) => (
              <span key={i}>
                {word}
                <span className="text-[#00c4b4]">.</span>
                {i < arr.length - 1 && " "}
              </span>
            ))}
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#00c4b4] text-[#0a0a0a] font-body font-semibold text-sm tracking-wide uppercase hover:bg-[#00c4b4]/90 transition-colors"
            >
              Work With Me
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-body font-semibold text-sm tracking-wide uppercase hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              Explore ↓
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 hidden md:flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-white rotate-90 mb-4">
          Scroll
        </span>
        <div className="w-px h-16 bg-white/40" />
        <span className="font-body text-xs text-white/60">↓</span>
      </div>
    </section>
  );
}
