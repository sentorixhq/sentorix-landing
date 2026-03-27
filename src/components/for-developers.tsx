"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Section, SectionHeading, SectionSubheading } from "./ui/section";

const features = [
  "OpenAI-compatible API (drop-in replacement)",
  "Python and Node.js SDKs (coming soon)",
  "Streaming response support",
  "Per-tenant policy configuration",
  "Webhook notifications for violations",
  "99.9% uptime SLA (coming soon)",
  "Sub-20ms overhead (p99)",
  "SOC 2 Type II (in progress)",
];

const tabs = [
  {
    label: "Python",
    code: `import openai

# Before: standard OpenAI client
# client = openai.OpenAI(api_key="sk-...")

# After: add Sentorix in one line
client = openai.OpenAI(
  api_key="sk-your-openai-key",
  base_url="https://api.sentorix.io/v1/gateway",
  default_headers={
    "X-Sentorix-API-Key": "your-sentorix-key",
    "X-Tenant-ID": "your-tenant-id",
    "X-User-ID": "user-123"
  }
)

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": prompt}]
)
# PII detected. Policies enforced. Audit logged.`,
  },
  {
    label: "Node.js",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-openai-key",
  baseURL: "https://api.sentorix.io/v1/gateway",
  defaultHeaders: {
    "X-Sentorix-API-Key": "your-sentorix-key",
    "X-Tenant-ID": "your-tenant-id",
    "X-User-ID": "user-123"
  }
});

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: prompt }]
});
// PII detected. Policies enforced. Audit logged.`,
  },
  {
    label: "cURL",
    code: `curl -X POST https://api.sentorix.io/v1/gateway/chat \\
  -H "Content-Type: application/json" \\
  -H "X-Sentorix-API-Key: your-key" \\
  -H "X-Tenant-ID: your-tenant" \\
  -H "X-User-ID: user-123" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{
      "role": "user",
      "content": "Your prompt here"
    }]
  }'`,
  },
];

function CodeTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-dark-950 shadow-xl">
      {/* Tab bar */}
      <div className="flex items-center justify-between bg-dark-900 border-b border-white/10 px-4">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === i
                  ? "text-white border-b-2 border-brand-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-5 text-xs sm:text-sm overflow-x-auto leading-relaxed text-gray-300">
        <code>{tabs[activeTab].code}</code>
      </pre>
    </div>
  );
}

export function ForDevelopers() {
  return (
    <Section id="for-developers" className="bg-white">
      <div className="text-center mb-12">
        <SectionHeading className="text-gray-900">
          Built by developers, for developers
        </SectionHeading>
        <SectionSubheading className="mx-auto">
          Sentorix is designed to be invisible. Your developers keep using the
          OpenAI SDK they know. Governance happens automatically.
        </SectionSubheading>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        {/* Feature list */}
        <div>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={12} className="text-brand-600" />
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code tabs */}
        <CodeTabs />
      </div>
    </Section>
  );
}
