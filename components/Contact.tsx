"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from "react-icons/hi";

export default function Contact() {
  const [ref, inView] = useInView<HTMLElement>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/mrejjvjl", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-28 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[#00C9B1] font-mono text-sm">05.</span>
          <h2 className="font-display font-bold text-3xl text-white">Get In Touch</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E2D4A] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-slate-400 leading-relaxed">
              I&apos;m actively looking for opportunities in{" "}
              <span className="text-white font-medium">Full-Stack Development</span> and open to roles in{" "}
              <span className="text-[#00C9B1] font-medium">Data Analytics / Data Science</span> as I level up my skills.
              Whether it&apos;s a full-time role, freelance project, or just a chat — reach out!
            </p>

            <div className="space-y-3">
              {[
                { icon: <HiMail />, label: "Email", value: "mdipramp@gmail.com", href: "mailto:mdipramp@gmail.com" },
                { icon: <HiPhone />, label: "Phone", value: "+91 93245 33302", href: "tel:+919324533302" },
                { icon: <HiLocationMarker />, label: "Location", value: "Mumbai, Maharashtra, India", href: undefined },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 bg-[#0F1629] border border-[#1E2D4A] rounded-xl p-4 group hover:border-[#00C9B1]/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#00C9B1]/10 border border-[#00C9B1]/20 flex items-center justify-center text-[#00C9B1] text-lg">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white text-sm font-medium hover:text-[#00C9B1] transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-7">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-8">
                <div className="w-16 h-16 rounded-full bg-[#00C9B1]/15 border border-[#00C9B1]/30 flex items-center justify-center text-3xl">
                  ✅
                </div>
                <h3 className="text-white font-display font-bold text-xl">Message Sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-2 text-[#00C9B1] text-sm hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs mb-1.5">Your Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Iqram Patel"
                      className="w-full bg-[#0D1323] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#00C9B1]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1.5">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="hello@example.com"
                      className="w-full bg-[#0D1323] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#00C9B1]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hi Iqram, I'd love to discuss..."
                    className="w-full bg-[#0D1323] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#00C9B1]/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#00C9B1] text-[#0A0F1C] font-semibold rounded-xl hover:bg-[#00E5CC] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00C9B1]/20 text-sm disabled:opacity-60"
                >
                  <HiPaperAirplane />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}