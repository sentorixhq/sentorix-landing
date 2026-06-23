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

// ── Syntax highlighting ──────────────────────────────────────────────────────

type PatternList = Array<[RegExp, string]>;

const PY: PatternList = [
  [/#.*$/, "text-gray-500"],
  [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, "text-emerald-400"],
  [/\b(import|from|def|class|return|if|else|for|in|not|and|or|True|False|None)\b/, "text-violet-400"],
  [/\b(openai|client|response)\b/, "text-sky-300"],
  [/\b\w+(?=\s*\()/, "text-yellow-300"],
  [/[{}[\]().,]/, "text-gray-400"],
];

const JS: PatternList = [
  [/\/\/.*$/, "text-gray-500"],
  [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, "text-emerald-400"],
  [/\b(import|from|export|const|let|var|new|await|async|return|if|else|of|true|false|null)\b/, "text-violet-400"],
  [/\b(OpenAI|client|response)\b/, "text-sky-300"],
  [/\b\w+(?=\s*\()/, "text-yellow-300"],
  [/[{}[\]().,]/, "text-gray-400"],
];

const CURL: PatternList = [
  [/\bcurl\b/, "text-violet-400"],
  [/https?:\/\/[^\s\\']+/, "text-cyan-400"],
  [/(?:^|\s)(-[A-Za-z])\b/, "text-yellow-300"],
  [/\b(POST|GET|PUT|DELETE|PATCH)\b/, "text-orange-400"],
  [/"(?:[^"\\]|\\.)*"/, "text-emerald-400"],
  [/'(?:[^'\\]|\\.)*'/, "text-emerald-400"],
  [/\\$/, "text-gray-500"],
];

function renderLine(line: string, patterns: PatternList, key: number): React.ReactNode {
  const chunks: React.ReactNode[] = [];
  let rest = line;
  let guard = 0;

  while (rest.length > 0 && guard++ < 500) {
    let best: { start: number; end: number; cls: string } | null = null;

    for (const [re, cls] of patterns) {
      const m = new RegExp(re.source, re.flags.replace(/g/g, "")).exec(rest);
      if (m && m[0].length > 0) {
        const start = m.index;
        const end = start + m[0].length;
        if (best === null || start < best.start) {
          best = { start, end, cls };
          if (start === 0) break;
        }
      }
    }

    if (!best) {
      chunks.push(<span key={chunks.length} className="text-gray-300">{rest}</span>);
      break;
    }
    if (best.start > 0) {
      chunks.push(<span key={chunks.length} className="text-gray-300">{rest.slice(0, best.start)}</span>);
    }
    chunks.push(<span key={chunks.length} className={best.cls}>{rest.slice(best.start, best.end)}</span>);
    rest = rest.slice(best.end);
  }

  return <span key={key}>{chunks}{"\n"}</span>;
}

function highlight(code: string, lang: string): React.ReactNode {
  const patterns = lang === "Python" ? PY : lang === "Node.js" ? JS : CURL;
  return code.split("\n").map((line, i) => renderLine(line, patterns, i));
}

// ── CodeTabs ─────────────────────────────────────────────────────────────────

function CodeTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const active = tabs[activeTab];

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
      <pre className="p-5 text-xs sm:text-sm overflow-x-auto leading-relaxed">
        <code>{highlight(active.code, active.label)}</code>
      </pre>
    </div>
  );
}

export function ForDevelopers() {
  return (
    <Section id="for-developers" className="bg-white">
      <div className="text-center mb-12">
        <SectionHeading className="text-gray-900">
          Built by Developers, for Developers
        </SectionHeading>
        <SectionSubheading className="mx-auto">
          Sentorix is designed to be invisible. Your Developers keep using the
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
