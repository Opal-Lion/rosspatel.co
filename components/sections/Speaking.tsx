import { speakingTopics, topSpeakingEvents } from "@/content/speaking-topics";
import FadeIn from "@/components/ui/FadeIn";

export default function Speaking() {
  return (
    <section id="speaking" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <FadeIn direction="up">
            <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
              Speaking
            </p>
            <h2 className="text-section-title text-white mb-8">
              Ideas worth<br />
              <em className="text-[#00c4b4] not-italic">hearing.</em>
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-10">
              Ross speaks at conferences, industry events, and panels on the topics
              that matter most — climate, culture, identity, and the future of music.
              Expect sharpness, honesty, and a perspective you won&apos;t hear from anyone else.
            </p>

            {/* Top events */}
            <div className="mb-10">
              <p className="font-body text-xs text-white/30 tracking-widest uppercase mb-4">
                Platforms include
              </p>
              <div className="flex flex-col gap-2">
                {topSpeakingEvents.map((ev) => (
                  <div key={ev} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#00c4b4] flex-shrink-0" />
                    <span className="font-body text-white/60 text-sm">{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-3 font-body text-sm font-semibold tracking-wide uppercase px-8 py-4 border border-[#00c4b4] text-[#00c4b4] hover:bg-[#00c4b4] hover:text-[#0a0a0a] transition-all"
            >
              Book Ross to Speak
            </a>
          </FadeIn>

          {/* Right — topics */}
          <FadeIn direction="up" delay={0.15} className="space-y-px">
            {speakingTopics.map((topic, i) => (
              <details
                key={topic.title}
                className="group border border-white/5 bg-[#141414] open:border-white/10"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <div className="flex items-center gap-4">
                    <span className="font-body text-xs text-white/25 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-white/80 group-hover:text-white text-base transition-colors">
                      {topic.title}
                    </span>
                  </div>
                  <span className="text-white/30 group-open:rotate-45 transition-transform text-xl flex-shrink-0 ml-4">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="font-body text-white/50 text-sm leading-relaxed pl-8">
                    {topic.description}
                  </p>
                </div>
              </details>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
