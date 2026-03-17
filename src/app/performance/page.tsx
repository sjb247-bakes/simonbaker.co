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

export default function PerformancePage() {
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
            Performance Under Pressure
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            Most coaches talk about mindset. I've done 180mph in a race car with
            everything on the line. The mental tools I use are clinical,
            evidence-based, and they work.
          </p>
        </div>
      </section>

      {/* The Method */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">The Method</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3">Performance Psychology</h3>
              <p className="text-zinc-400">
                How high-performers actually think. Not theory — practical tools
                tested under real pressure.
              </p>
            </div>

            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-4xl mb-4">💤</div>
              <h3 className="text-xl font-bold mb-3">
                Clinical Hypnotherapy
              </h3>
              <p className="text-zinc-400">
                Rewiring subconscious patterns where willpower fails. Evidence-based,
                not woo.
              </p>
            </div>

            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Biometric Feedback</h3>
              <p className="text-zinc-400">
                Using real data — HRV, sleep quality, body battery — to track
                what's actually changing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Cohort */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-amber-600 pl-8 mb-12">
            <h2 className="text-4xl font-bold mb-2">Performance Under Pressure</h2>
            <p className="text-zinc-400">6-week group program</p>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
            <p>
              <strong>Who it's for:</strong> Entrepreneurs, executives, athletes,
              performers — anyone who operates in high-stakes situations and wants
              to perform consistently under pressure.
            </p>

            <p>
              <strong>What's included:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>6 weekly group sessions (small cohort, 8–12 people)</li>
              <li>
                Personalised hypnotherapy audio library (tailored to your blocks)
              </li>
              <li>Biometric tracking dashboard access</li>
              <li>Performance psychology framework and tools</li>
              <li>Direct access to ask questions between sessions</li>
            </ul>

            <p>
              <strong>Investment:</strong> $1,200–$1,500 per person
            </p>

            <p>
              <strong>Start date & cohort:</strong> Cohorts start monthly. Early
              bird spots available now.
            </p>
          </div>

          <div className="mt-10 flex gap-4">
            <a
              href="https://forms.gle/BrXLHx8ykHERB7t18"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors inline-block"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* 1:1 Coaching */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">1:1 Intensive Coaching</h2>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-300 mb-8">
            <p>
              For people who want personalised, intensive support. Direct access
              to me, tailored to your specific performance challenges.
            </p>
            <p>
              Ideal for leaders managing critical transitions, athletes preparing
              for key moments, or anyone serious about a major shift.
            </p>
          </div>
          <button
            data-cal-link="simonbaker/initial-diagnostic"
            data-cal-namespace="initial-diagnostic"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="px-8 py-3 border border-amber-600 text-amber-400 font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-colors"
          >
            Book a Discovery Call
          </button>
        </div>
      </section>

      {/* Racing Credibility Block */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Why This Works</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            I spent years racing competitively — enough to know what it feels like
            to perform when the stakes are real. 180mph in a race car is immediate
            feedback. You can't fake focus, confidence, or mental clarity at that
            speed.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            That experience taught me the difference between motivation and
            execution, between what works in theory and what works under pressure.
            Everything I teach has been tested on a track, then validated through
            clinical hypnotherapy and performance psychology.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <section className="py-20 px-4 bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">What Clients Say</h2>
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

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-black border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to perform?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Whether it's the group program or 1:1 coaching, let's talk about what
            you're trying to achieve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.gle/BrXLHx8ykHERB7t18"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors inline-block text-center"
            >
              Join the Waitlist
            </a>
            <button
              data-cal-link="simonbaker/initial-diagnostic"
              data-cal-namespace="initial-diagnostic"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="px-8 py-3 border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white font-semibold rounded-lg transition-colors"
            >
              Discovery Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
