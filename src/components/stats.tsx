const metrics = [
  { value: "<20ms", label: "Gateway latency (p99)" },
  { value: "12+", label: "PII entity types detected" },
  { value: "7 yrs", label: "Immutable Audit retention" },
  { value: "99.9%", label: "Uptime SLA (coming soon)" },
];

export function Stats() {
  return (
    <div className="bg-dark-900 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <div
              className="text-3xl sm:text-4xl font-bold"
              style={{
                background: "linear-gradient(135deg, #a5b4fc, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {m.value}
            </div>
            <div className="mt-1 text-sm text-gray-500">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
