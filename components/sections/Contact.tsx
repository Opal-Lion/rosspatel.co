"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const subjects = [
  "Consulting Enquiry",
  "Speaking Booking",
  "DJ / Polyamoross Booking",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Formspree integration — replace YOUR_FORM_ID with actual ID from formspree.io
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <FadeIn direction="up">
            <p className="font-body text-[#00c4b4] text-sm tracking-[0.2em] uppercase mb-6">
              Get In Touch
            </p>
            <h2 className="text-section-title text-white mb-8">
              Let&apos;s make<br />
              <em className="text-[#00c4b4] not-italic">something happen.</em>
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12">
              Whether you&apos;re looking for a strategic partner, a speaker who
              challenges convention, or a DJ who creates something special, get in touch.
            </p>

            {/* Social links */}
            <div className="space-y-4">
              <p className="font-body text-xs text-white/30 tracking-widest uppercase">
                Find me online
              </p>
              {[
                { label: "LinkedIn", url: "https://linkedin.com/in/rosspatel" },
                { label: "Instagram", url: "https://instagram.com/rosswellpatel" },
                { label: "X / Twitter", url: "https://x.com/rosswellpatel" },
                { label: "Resident Advisor", url: "https://ra.co/dj/polyamoross" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-white/60 hover:text-[#00c4b4] transition-colors text-sm group"
                >
                  <span className="w-6 h-px bg-current group-hover:w-10 transition-all" />
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn direction="up" delay={0.15}>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full gap-4 py-16">
                <div className="w-12 h-px bg-[#00c4b4]" />
                <p className="font-display text-2xl text-white">
                  Message received.
                </p>
                <p className="font-body text-white/50">
                  Thanks for reaching out. I&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-[#141414] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#00c4b4] transition-colors placeholder:text-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-[#141414] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#00c4b4] transition-colors placeholder:text-white/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    required
                    className="w-full bg-[#141414] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#00c4b4] transition-colors appearance-none"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-[#141414] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#00c4b4] transition-colors placeholder:text-white/20 resize-none"
                    placeholder="Tell me what you're working on..."
                  />
                </div>

                {/* Hidden field for email routing */}
                <input type="hidden" name="_replyto" value="ross@rosspatel.co" />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#00c4b4] text-[#0a0a0a] font-body font-semibold text-sm tracking-wide uppercase hover:bg-[#00c4b4]/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </FadeIn>
        </div>

        {/* Footer line */}
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-body text-xs text-white/20">
            © {new Date().getFullYear()} Ross Patel. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/20">
            rosspatel.co
          </p>
        </div>
      </div>
    </section>
  );
}
