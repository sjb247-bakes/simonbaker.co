'use client';

import Link from 'next/link';
import { useEffect } from 'react';

declare global {
  interface Window {
    Cal: any;
  }
}

export default function BookPage() {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Two Column Layout */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        {/* Left: Discovery Call */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Ready to book?</h2>
          <p className="text-zinc-400 mb-6">
            Pick a time that works for you. Let's talk about your performance goals.
          </p>
          <button
            data-cal-link="simonbaker/initial-diagnostic"
            data-cal-namespace="initial-diagnostic"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            Open Calendar
          </button>
          <p className="text-sm text-zinc-600 mt-4">
            Or{' '}
            <a
              href="https://cal.com/simonbaker/initial-diagnostic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline"
            >
              open in new tab
            </a>
          </p>
        </div>

        {/* Right: Waitlist Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Join the cohort waitlist</h2>
          <p className="text-zinc-400 mb-6">
            Can't book right now? Sign up for the next Performance Under Pressure cohort.
          </p>
          <div
            style={{
              background: '#0f0f0f',
              borderRadius: '12px',
              overflow: 'hidden',
              maxHeight: '600px',
              overflowY: 'auto',
            }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdB1zwgAn8s-rbOd4VckC8uqWHmut3EyZE4iTrCAlWCSAQICA/viewform?embedded=true"
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
              }}
              title="Join the Performance Cohort Waitlist"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
