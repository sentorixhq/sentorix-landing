import { Section, SectionHeading } from "./ui/section";

const regulations = [
  {
    name: "EU AI Act",
    description:
      "High-risk AI systems require documentation, human oversight, and Audit trails. Sentorix makes compliance automatic.",
  },
  {
    name: "HIPAA",
    description:
      "Healthcare AI applications cannot send PHI to external AI providers without explicit controls. Sentorix detects and blocks PHI automatically.",
  },
  {
    name: "India DPDP Act",
    description:
      "Personal data processing requires purpose limitation and Audit trails. Sentorix enforces both at the AI layer.",
  },
  {
    name: "GDPR / SOC 2",
    description:
      "Data minimisation and processing records are requirements, not optional. Sentorix creates them automatically.",
  },
];

const comparisonRows = [
  { label: "Protects", cf: "Web traffic", sx: "AI traffic" },
  { label: "Inspects", cf: "HTTP/HTTPS", sx: "LLM prompts" },
  { label: "Blocks", cf: "Bad actors", sx: "PII + attacks" },
  { label: "Logs", cf: "Access logs", sx: "Audit trail" },
  { label: "Sits between", cf: "You + web", sx: "You + AI" },
];

export function SocialProof() {
  return (
    <section className="bg-dark-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading className="text-white">
            Built for regulated industries
          </SectionHeading>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Regulation cards */}
          <div className="flex flex-col gap-4">
            {regulations.map((reg) => (
              <div
                key={reg.name}
                className="flex-1 bg-dark-800 border border-white/10 rounded-xl p-5 hover:border-brand-500/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-block px-3 py-1 bg-brand-500/20 text-indigo-300 text-xs font-bold rounded-full mt-0.5 shrink-0">
                    {reg.name}
                  </span>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {reg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Quote + comparison table */}
          <div className="lg:pl-4">
            <div className="mb-8">
              <div
                className="text-5xl font-serif leading-none mb-3"
                style={{ color: "#6366F1" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                If Cloudflare protects your web traffic,
                <br />
                Sentorix protects your AI usage.
              </blockquote>
              <div
                className="text-5xl font-serif leading-none text-right mt-1"
                style={{ color: "#6366F1" }}
                aria-hidden="true"
              >
                &rdquo;
              </div>
            </div>

            {/* Comparison table */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-3 text-gray-300 font-medium w-1/3" />
                    <th className="text-center px-4 py-3 text-gray-100 font-semibold">
                      Cloudflare
                    </th>
                    <th className="text-center px-4 py-3 text-indigo-300 font-semibold">
                      Sentorix
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-t border-white/5 ${
                        i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-300 font-medium">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-200">
                        {row.cf}
                      </td>
                      <td className="px-4 py-3 text-center text-indigo-300 font-medium">
                        {row.sx}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
