'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";

declare global {
  interface Window {
    Cal: any;
  }
}

export const dynamic = 'force-dynamic';

export default function HypnotherapyPage() {
  useEffect(() => {
    // Load cal.com embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "initial-diagnostic", {origin:"https://app.cal.com"});
      Cal.ns["initial-diagnostic"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#e9e9e9"},"dark":{"cal-brand":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.head.appendChild(script);
  }, []);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const query = `*[_type == "testimonial" && featured == true] {
        _id,
        name,
        role,
        quote,
        program
      }`;

      try {
        const data = await client.fetch(query);
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="min-h-[calc(100vh-57px)] flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Hypnotherapy That Actually Works
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            Clinical, evidence-based hypnotherapy for performance, anxiety, habits, and mindset. Not magic — neuroscience.
          </p>
          <button
            data-cal-link="simonbaker/initial-diagnostic"
            data-cal-namespace="initial-diagnostic"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            Book a Call
       
          </button>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Who It's For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-6xl mb-6">🏎️</div>
              <h3 className="text-2xl font-bold mb-4">High Performers</h3>
              <p className="text-zinc-400">
                Athletes, executives, anyone performing under pressure. Break through plateaus and excel consistently.
              </p>
            </div>

            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-6xl mb-6">😰</div>
              <h3 className="text-2xl font-bold mb-4">Anxiety & Stress</h3>
              <p className="text-zinc-400">
                Cycle-breaking relief for anxiety, panic, and chronic stress that conventional methods can't touch.
              </p>
            </div>

            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-6xl mb-6">🔄</div>
              <h3 className="text-2xl font-bold mb-4">Habit & Behaviour Change</h3>
              <p className="text-zinc-400">
                Change patterns that logic alone can't fix. Smoking cessation, overeating, procrastination, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">How It Works</h2>
          <div className="space-y-12">
            <div className="border-l-4 border-amber-600 pl-8 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-600 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-2xl font-bold">Diagnostic Call</h3>
           
           
              </div>
              <p className="text-zinc-400 text-lg">
                30 minutes to understand what&apos;s going on. We map out the patterns, identify the root causes, and discuss your goals.
              </p>
            </div>

            <div className="border-l-4 border-amber-600 pl-8 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-600 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-2xl font-bold">Tailored Program</h3>
              </div>
              <p className="text-zinc-400 text-lg">
                Bespoke sessions designed specifically for your challenges. Not a script — clinical hypnotherapy adapted to your neuro-wiring.
              </p>
            </div>

            <div className="border-l-4 border-amber-600 pl-8 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-600 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-2xl font-bold">Real Change</h3>
              </div>
              <p className="text-zinc-400 text-lg">
                Measurable shifts in how you think, feel, and perform. The changes stick because they&apos;re wired into your subconscious.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Simon's credentials */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-amber-600 pl-8 mb-8">
            <h2 className="text-4xl font-bold mb-2">Clinical Hypnotherapy</h2>
            <p className="text-zinc-400">Evidence-based, outcomes-focused</p>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">🏎️</div>
              <p><strong>Racing background:</strong> I&apos;ve driven cars at 180mph. I understand what it means to perform when the stakes are high and everything depends on your mental clarity.</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">🧠</div>
              <p><strong>Clinical training:</strong> Certified clinical hypnotherapist with extensive training in neuroscience and evidence-based techniques.</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1">📊</div>
              <p><strong>Evidence-based:</strong> Everything I do is grounded in research. We track progress with biometrics and feedback loops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <section className="py-20 px-4 bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Client Successes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial: any) => (
                <div
                  key={testimonial._id}
                  className="p-8 border border-zinc-800 rounded-lg bg-black"
                >
                  <p className="text-zinc-300 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                    <p className="text-xs text-amber-600 mt-2">
                      {testimonial.program}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">FAQs</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Is hypnotherapy real?</h3>
              <p className="text-zinc-400">
                Yes — there are hundreds of clinical studies showing it works for anxiety, performance, habit change, and more. We use neuroscience-backed techniques, not stage hypnosis.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">How many sessions will I need?</h3>
              <p className="text-zinc-400">
                It depends on your goals. Simple habit changes might take 2-4 sessions. Performance enhancement or anxiety reduction often takes 6-8 sessions. We&apos;ll give you a clear plan after the diagnostic call.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Can it work online?</h3>
              <p className="text-zinc-400">
                Absolutely. Hypnotherapy works just as well online as in-person. Many of our clients prefer the convenience and privacy of their own space.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">What does a session feel like?</h3>
              <p className="text-zinc-400">
                Relaxed and focused. Most people describe it as an extremely comfortable relaxation with deep concentration. You&apos;re always in control — we never do anything without your consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-black border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Book your diagnostic call to see how hypnotherapy can help you achieve what you&apos;ve been working toward, or are currently missing.
       
          </p>
          <button
            data-cal-link="simonbaker/initial-diagnostic"
            data-cal-namespace="initial-diagnostic"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            Book a Call
          </button>
        </div>
      </section>
    </div>
  );
}