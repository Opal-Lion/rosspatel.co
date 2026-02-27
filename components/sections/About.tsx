import { about } from "@/content/about";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — heading + quote */}
          <FadeIn direction="up" className="lg:sticky lg:top-28">
            <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
              Who I Am
            </p>
            <h2 className="text-section-title text-white mb-10">
              Culture at the<br />
              <em className="text-[#00c4b4] not-italic">intersection</em><br />
              of everything.
            </h2>

            <blockquote className="pl-0">
              <p className="font-display text-white/60 text-lg md:text-xl italic leading-relaxed">
                {about.quote}
              </p>
            </blockquote>

            <div className="grid grid-cols-2 gap-6 mt-12">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl font-bold text-[#00c4b4]">
                    {stat.value}
                  </p>
                  <p className="font-body text-sm text-white/50 mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right — statement + tags */}
          <FadeIn direction="up" delay={0.15}>
            <div className="flex flex-col justify-center h-full space-y-12">
              <p className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                {about.statement.split(". ").map((sentence, i, arr) => (
                  <span key={i}>
                    {sentence}{i < arr.length - 1 ? "." : ""}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Music Strategy",
                  "Climate Action",
                  "Artivism",
                  "DJ / Polyamoross",
                  "Queer Advocacy",
                  "Talent Management",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs tracking-wider uppercase px-3 py-1.5 border border-white/15 text-white/50 hover:border-[#00c4b4]/50 hover:text-[#00c4b4] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
