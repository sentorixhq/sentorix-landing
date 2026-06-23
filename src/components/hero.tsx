"use client";

import { Badge } from "./ui/badge";

function scrollToDemo() {
  const el = document.getElementById("demo");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function CodeBlock() {
  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Before */}
        <div className="rounded-xl overflow-hidden border border-red-500/20 bg-dark-800">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-950/40 border-b border-red-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="text-xs font-semibold text-red-400 tracking-wide">
              Before Sentorix
            </span>
          </div>
          <pre className="p-4 text-xs sm:text-sm overflow-x-auto leading-relaxed">
            <code>
              <span className="text-purple-400">import</span>
              <span className="text-gray-300"> openai{"\n"}</span>
              <span className="text-gray-300">client = openai.</span>
              <span className="text-yellow-300">OpenAI</span>
              <span className="text-gray-300">({"\n"}</span>
              <span className="text-gray-300">  api_key=</span>
              <span className="text-green-400">&quot;sk-...&quot;</span>
              <span className="text-gray-300">{"\n"})</span>
            </code>
          </pre>
        </div>

        {/* After */}
        <div className="rounded-xl overflow-hidden border border-green-500/20 bg-dark-800">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-green-950/40 border-b border-green-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="text-xs font-semibold text-green-400 tracking-wide">
              With Sentorix
            </span>
          </div>
          <pre className="p-4 text-xs sm:text-sm overflow-x-auto leading-relaxed">
            <code>
              <span className="text-purple-400">import</span>
              <span className="text-gray-300"> openai{"\n"}</span>
              <span className="text-gray-300">client = openai.</span>
              <span className="text-yellow-300">OpenAI</span>
              <span className="text-gray-300">({"\n"}</span>
              <span className="text-gray-300">  api_key=</span>
              <span className="text-green-400">&quot;sk-...&quot;</span>
              <span className="text-gray-300">,{"\n"}</span>
              <span className="text-gray-300">  base_url=</span>
              <span className="text-green-400">
                &quot;https://api.sentorix.io/v1/gateway&quot;
              </span>
              <span className="text-gray-300">{"\n"}){"\n"}</span>
              <span className="text-gray-500">
                # PII detected. Policies enforced.{"\n"}# Audit
                logged.
              </span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-dark-950 overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #26215C 0%, #0A0A0F 40%, #1a1040 70%, #0A0A0F 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse, #6366F1 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge>EU AI Act ready · HIPAA compliant · SOC 2</Badge>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          <span
            style={{
              background: "linear-gradient(135deg, #818CF8, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Governance
          </span>{" "}
          for
          <br />
          Companies That Can&apos;t Afford
          <br />
          to Get It Wrong
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Sentorix sits between your apps and AI providers. Every request is
          scanned for PII, checked against your policies, and logged
          immutably — in under 20ms.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToDemo}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-brand-500/30 cursor-pointer"
          >
            Request a demo
          </button>
          <a
            href="https://github.com/sentorixhq/sentorix-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold border border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-lg transition-all text-center"
          >
            View documentation
          </a>
        </div>

        {/* Social proof line */}
        <p className="mt-6 text-sm text-gray-500">
          Trusted by teams building AI-powered Fintech, Healthcare, and HR
          Platforms
        </p>

        {/* Code block */}
        <CodeBlock />
      </div>
    </section>
  );
}
