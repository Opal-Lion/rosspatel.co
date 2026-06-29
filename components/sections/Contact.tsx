"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { about } from "@/content/about";

const professionalSubjects = [
  "Consulting & Strategy",
  "Climate Action / LIVE Green",
  "Artivism / Social Impact",
  "Speaking Booking",
  "General Enquiry",
];

const capacityOptions = ["Under 100", "100–500", "500–1,000", "1,000+"];
const budgetOptions = ["Under £500", "£500–£1,000", "£1,000–£2,500", "£2,500+", "Prefer not to say"];

type Tab = "professional" | "dj";

export default function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>("professional");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string | boolean> = { formType: activeTab };
    fd.forEach((val, key) => { data[key] = val as string; });
    data.optIn = fd.get("optIn") === "on";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-[#141414] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#00c4b4] transition-colors placeholder:text-white/20";
  const labelClass = "font-body text-xs text-white/40 tracking-widest uppercase block mb-2";
  const selectClass =
    "w-full bg-[#141414] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#00c4b4] transition-colors appearance-none";

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
              <em className="text-[#00c4b4] not-italic">an impact.</em>
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12">
              Whether you&apos;re looking for a strategic partner, a speaker who
              challenges convention, or a DJ who creates something special, get in touch.
            </p>

            {/* Availability indicator */}
            <div className="flex items-center gap-2 mb-10">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: about.status === "available" ? "#00c4b4" : "#f5a623",
                }}
              />
              <span className="font-body text-sm text-white/50">
                {about.status === "available"
                  ? "Currently accepting new projects"
                  : "Not currently accepting new projects"}
              </span>
            </div>

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
                <p className="font-display text-2xl text-white">Message received.</p>
                <p className="font-body text-white/50">
                  Thanks for reaching out. I&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Tab switcher */}
                <div className="flex mb-8 border-b border-white/10">
                  {(["professional", "dj"] as Tab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => { setActiveTab(tab); setError(""); }}
                      className="relative pb-3 mr-8 font-body text-sm tracking-wide transition-colors"
                      style={{
                        color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {tab === "professional" ? "Professional" : "DJ / Polyamoross"}
                      {activeTab === tab && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ backgroundColor: tab === "dj" ? "#e8432d" : "#00c4b4" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {activeTab === "professional" ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>First Name</label>
                          <input type="text" name="firstName" required className={inputClass} placeholder="First name" />
                        </div>
                        <div>
                          <label className={labelClass}>Surname</label>
                          <input type="text" name="surname" required className={inputClass} placeholder="Surname" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Email</label>
                        <input type="email" name="email" required className={inputClass} placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className={labelClass}>Subject</label>
                        <select name="subject" required className={selectClass}>
                          <option value="">Select a subject</option>
                          {professionalSubjects.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Message</label>
                        <textarea name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="Tell me what you're working on..." />
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" name="optIn" className="mt-0.5 accent-[#00c4b4]" />
                        <span className="font-body text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          Keep me updated on Ross&apos;s work
                        </span>
                      </label>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className={labelClass}>Name</label>
                        <input type="text" name="name" required className={inputClass} placeholder="Your name" />
                      </div>
                      <div>
                        <label className={labelClass}>Email</label>
                        <input type="email" name="email" required className={inputClass} placeholder="your@email.com" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Event Date</label>
                          <input type="date" name="eventDate" className={inputClass} style={{ colorScheme: "dark" }} />
                        </div>
                        <div>
                          <label className={labelClass}>Location</label>
                          <input type="text" name="location" className={inputClass} placeholder="City, Country" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Venue Name</label>
                        <input type="text" name="venue" className={inputClass} placeholder="Venue or club name" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Expected Capacity</label>
                          <select name="capacity" className={selectClass}>
                            <option value="">Select capacity</option>
                            {capacityOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Budget Range</label>
                          <select name="budget" className={selectClass}>
                            <option value="">Select budget</option>
                            {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Event Details</label>
                        <textarea name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="Tell me about the event, the vibe, anything relevant..." />
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" name="optIn" className="mt-0.5 accent-[#e8432d]" />
                        <span className="font-body text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          Keep me updated on Polyamoross events &amp; mixes
                        </span>
                      </label>
                    </>
                  )}

                  {error && (
                    <p className="font-body text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 font-body font-semibold text-sm tracking-wide uppercase transition-colors disabled:opacity-50"
                    style={{
                      backgroundColor: activeTab === "professional" ? "#00c4b4" : "#e8432d",
                      color: "#0a0a0a",
                    }}
                  >
                    {loading ? "Sending..." : activeTab === "professional" ? "Send Message" : "Submit Booking Enquiry"}
                  </button>
                </form>
              </>
            )}
          </FadeIn>
        </div>

        {/* Footer line */}
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-body text-xs text-white/20">
            © {new Date().getFullYear()} Ross Patel. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/20">rosspatel.co</p>
        </div>
      </div>
    </section>
  );
}
