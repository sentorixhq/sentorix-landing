"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeading, SectionSubheading } from "./ui/section";

const benefits = [
  "Live PII detection on your actual prompts",
  "Policy configuration walkthrough",
  "Audit log and compliance report demo",
  "Integration guide for your tech stack",
  "Answers to your compliance questions",
  "Pricing tailored to your usage",
];

const roles = [
  "CTO / VP Engineering",
  "CISO / Head of Security",
  "Compliance / Legal",
  "Developer / Engineer",
  "Other",
];

const companySizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

const providers = ["OpenAI", "Anthropic", "AWS Bedrock", "Other"];

export function DemoForm() {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formspreeId =
    process.env.NEXT_PUBLIC_FORMSPREE_ID || "placeholder";

  const toggleProvider = (p: string) => {
    setSelectedProviders((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Add checkbox group values
    providers.forEach((p) => {
      if (selectedProviders.includes(p)) {
        data.append("ai_providers", p);
      }
    });

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        window.location.href = "/thank-you";
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-shadow";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <Section id="demo" className="bg-gray-50">
      <div className="text-center mb-12">
        <SectionHeading className="text-gray-900">
          See Sentorix in action
        </SectionHeading>
        <SectionSubheading className="mx-auto">
          Request a personalised demo. We&apos;ll show you how Sentorix
          integrates with your stack and protects your AI usage in under 15
          minutes.
        </SectionSubheading>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left: Benefits */}
        <div className="lg:pt-2">
          <h3 className="text-lg font-bold text-gray-900 mb-5">
            What you get in a demo
          </h3>
          <ul className="space-y-3 mb-8">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={12} className="text-brand-600" />
                </div>
                <span className="text-gray-700 text-sm">{b}</span>
              </li>
            ))}
          </ul>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              No sales pressure. No commitment.
            </p>
            <p className="text-sm text-gray-500">
              Response within 24 hours.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Role <span className="text-red-500">*</span>
                </label>
                <select name="role" required className={inputClass}>
                  <option value="">Select your role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Company size <span className="text-red-500">*</span>
              </label>
              <select name="company_size" required className={inputClass}>
                <option value="">Select company size</option>
                {companySizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                How are you using AI?{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="ai_usage"
                rows={3}
                placeholder="e.g. Customer support chatbot, document analysis, code generation..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>Which AI providers?</label>
              <div className="flex flex-wrap gap-3 mt-1">
                {providers.map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProviders.includes(p)}
                      onChange={() => toggleProvider(p)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 text-base font-semibold bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-brand-500/25 cursor-pointer"
            >
              {submitting ? "Submitting..." : "Request your demo →"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              By submitting, you agree to our privacy policy. We never share
              your information.
            </p>
          </form>
        </div>
      </div>
    </Section>
  );
}
