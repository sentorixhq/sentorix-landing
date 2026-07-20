"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PIIFinding {
  entity_type: string;
  start: number;
  end: number;
  score: number;
}

interface GatewayResponse {
  request_id: string;
  status: "allowed" | "warned" | "blocked";
  model: string;
  content: string | null;
  pii_findings: PIIFinding[];
  warnings: string[];
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  sentorix_latency_ms: number;
}

type Segment =
  | { kind: "text"; text: string }
  | { kind: "chip"; entityType: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Reconstruct the redacted prompt client-side.
 * Findings whose entity_type is in `redactedTypes` become [ENTITY_TYPE] chips.
 * Unchecked findings are rendered as plain text (entity not redacted).
 */
function buildSegments(
  original: string,
  findings: PIIFinding[],
  redactedTypes: Set<string>
): Segment[] {
  const sorted = [...findings].sort((a, b) => a.start - b.start);
  const segments: Segment[] = [];
  let cursor = 0;

  for (const f of sorted) {
    if (f.end <= cursor) continue; // skip overlapping spans
    const spanStart = Math.max(f.start, cursor);
    if (spanStart > cursor) {
      segments.push({ kind: "text", text: original.slice(cursor, spanStart) });
    }
    if (redactedTypes.has(f.entity_type)) {
      segments.push({ kind: "chip", entityType: f.entity_type });
    } else {
      segments.push({ kind: "text", text: original.slice(spanStart, f.end) });
    }
    cursor = f.end;
  }

  if (cursor < original.length) {
    segments.push({ kind: "text", text: original.slice(cursor) });
  }

  return segments;
}

const EXAMPLE_PROMPT = `Hi, I'm Sarah Johnson (sarah.johnson@acme.com).
My phone is +1-415-555-0182 and SSN is 123-45-6789.
Card: 4111 1111 1111 1111 (exp 09/27).
Please summarise the treatment plan for patient record #4929-184 and keep this confidential.`;

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "";
const DEMO_API_KEY = process.env.NEXT_PUBLIC_DEMO_API_KEY ?? "demo-api-key";

const STATUS_STYLES = {
  allowed: { badge: "bg-green-500/20 text-green-400 border border-green-500/30", dot: "bg-green-400" },
  warned:  { badge: "bg-amber-500/20 text-amber-400 border border-amber-500/30",  dot: "bg-amber-400"  },
  blocked: { badge: "bg-red-500/20 text-red-400 border border-red-500/30",        dot: "bg-red-400"    },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function LiveDemo() {
  const [prompt, setPrompt] = useState(EXAMPLE_PROMPT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GatewayResponse | null>(null);
  const [riskScore, setRiskScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [redactedTypes, setRedactedTypes] = useState<Set<string>>(new Set());

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${GATEWAY_URL}/v1/gateway/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Sentorix-API-Key": DEMO_API_KEY,
          "X-Tenant-ID": "demo",
          "X-User-ID": "visitor",
        },
        body: JSON.stringify({ model: "gpt-4o-mini", prompt, max_tokens: 256 }),
      });

      const riskHeader = res.headers.get("X-Sentorix-Risk-Score");
      if (riskHeader) setRiskScore(parseFloat(riskHeader));

      if (res.status === 429) {
        const body = await res.json().catch(() => ({}));
        const retry: number = body?.error?.details?.retry_after_seconds ?? 60;
        setError(`Rate limit reached — try again in ${retry} seconds.`);
        return;
      }
      if (res.status === 503) {
        setError("Gateway is warming up (cold start ~30s). Please try again shortly.");
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const detail = body?.error?.message ?? body?.detail ?? JSON.stringify(body);
        setError(`Error ${res.status}: ${detail}`);
        return;
      }

      const data: GatewayResponse = await res.json();
      setResult(data);
      // Default: all detected entities are checked (redacted)
      setRedactedTypes(new Set(data.pii_findings.map((f) => f.entity_type)));
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (entityType: string) => {
    setRedactedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(entityType)) next.delete(entityType);
      else next.add(entityType);
      return next;
    });
  };

  const segments = result ? buildSegments(prompt, result.pii_findings, redactedTypes) : [];

  const riskPct = Math.round(riskScore * 100);
  const riskColor = riskScore > 0.7 ? "#EF4444" : riskScore > 0.4 ? "#F59E0B" : "#22C55E";

  return (
    <section id="live-demo" className="bg-dark-950 py-24 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live · Connected to dev gateway
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See Sentorix protect your AI — right now
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Type any prompt below. Watch Sentorix detect PII, apply policies, and show you
            exactly what reaches the AI — all in under 30ms overhead.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* ── Left column ── */}
          <div className="space-y-4">
            {/* Input */}
            <div className="bg-dark-800/70 border border-white/10 rounded-2xl p-6">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Your prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={9}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-500/50 resize-none font-mono leading-loose"
                placeholder="Type or paste a prompt containing sensitive data..."
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="mt-4 w-full py-3.5 text-sm font-semibold bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-brand-500/25 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing with Sentorix...
                  </span>
                ) : (
                  "Analyze with Sentorix →"
                )}
              </button>
            </div>

            {/* PII Detected */}
            {result !== null && (
              <div className="bg-dark-800/70 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-200">
                    PII Detected
                    {result.pii_findings.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full font-normal">
                        {result.pii_findings.length} found
                      </span>
                    )}
                  </h3>
                  {result.pii_findings.length > 0 && (
                    <span className="text-xs text-gray-500">Uncheck to exclude from redaction</span>
                  )}
                </div>

                {result.pii_findings.length === 0 ? (
                  <div className="text-center py-3">
                    <p className="text-green-400 font-semibold text-sm">No PII detected</p>
                    <p className="text-gray-500 text-xs mt-1">Prompt forwarded to AI unchanged</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {result.pii_findings.map((f, i) => (
                      <label
                        key={`${f.entity_type}-${i}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={redactedTypes.has(f.entity_type)}
                            onChange={() => toggleType(f.entity_type)}
                            className="w-4 h-4 rounded cursor-pointer accent-indigo-500"
                          />
                          <span className="text-xs font-mono font-bold text-brand-400">
                            [{f.entity_type}]
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-16 bg-dark-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-500 rounded-full"
                              style={{ width: `${Math.round(f.score * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right tabular-nums">
                            {Math.round(f.score * 100)}%
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div className="space-y-4">
            {/* Stats */}
            {result !== null && (
              <div className="bg-dark-800/70 border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-200 mb-4">Analysis</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Status */}
                  <div className="bg-dark-900 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-2">Status</div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[result.status].badge}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[result.status].dot}`}
                      />
                      {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                    </span>
                  </div>

                  {/* Sentorix latency — hero metric */}
                  <div className="bg-dark-900 rounded-xl p-4 border border-brand-500/20">
                    <div className="text-xs text-gray-500 mb-1">Sentorix overhead</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-brand-400 tabular-nums">
                        {result.sentorix_latency_ms.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </div>

                  {/* Risk score */}
                  <div className="bg-dark-900 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-2">Risk Score</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${riskPct}%`, background: riskColor }}
                        />
                      </div>
                      <span className="text-xs font-mono text-gray-300 w-8 text-right tabular-nums">
                        {riskScore.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* PII count */}
                  <div className="bg-dark-900 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">PII Entities</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white tabular-nums">
                        {result.pii_findings.length}
                      </span>
                      <span className="text-xs text-gray-500">found</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Redacted prompt */}
            {result !== null && (
              <div className="bg-dark-800/70 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-200">What was sent to AI</h3>
                  <span className="text-xs text-gray-500">Updates as you toggle above</span>
                </div>
                <div className="bg-dark-900 rounded-xl px-4 py-3 font-mono text-xs leading-loose text-gray-300 min-h-[5rem]">
                  {segments.length === 0 ? (
                    <span className="text-gray-600 italic">Empty prompt</span>
                  ) : (
                    segments.map((seg, i) =>
                      seg.kind === "text" ? (
                        <span key={i}>{seg.text}</span>
                      ) : (
                        <span
                          key={i}
                          className="inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded bg-brand-500/20 border border-brand-500/40 text-brand-300 text-[10px] font-bold"
                        >
                          [{seg.entityType}]
                        </span>
                      )
                    )
                  )}
                </div>
              </div>
            )}

            {/* AI response */}
            {result !== null && result.content && (
              <div className="bg-dark-800/70 border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-200 mb-3">AI Response</h3>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {result.content}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-5">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Idle placeholder */}
            {result === null && !error && !loading && (
              <div className="bg-dark-800/40 border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[280px]">
                <div className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 text-2xl">
                  🔍
                </div>
                <p className="text-gray-400 font-medium mb-1">Submit a prompt above</p>
                <p className="text-gray-600 text-sm">
                  Results — PII findings, redacted prompt, AI response, and latency — appear here instantly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-gray-600 mt-8">
          Demo uses a shared API key with rate limiting. Requests are processed by the live Sentorix dev gateway and forwarded to OpenAI.
        </p>
      </div>
    </section>
  );
}
