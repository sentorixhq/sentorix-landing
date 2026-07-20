import { Section, SectionHeading, SectionSubheading } from "./ui/section";

function Arrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center">
        <div className="h-6 w-px bg-brand-500/50" />
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "7px solid #6366F1",
            opacity: 0.6,
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <div className="w-8 h-px bg-brand-500/50" />
      <div
        className="w-0 h-0"
        style={{
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: "7px solid #6366F1",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="mt-10 w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center gap-4">
        {/* Your App */}
        <div className="bg-dark-800 border border-blue-500/30 rounded-2xl px-6 py-5 text-center min-w-[110px]">
          <div className="text-2xl mb-2">🖥️</div>
          <div className="text-xs font-bold text-blue-400">Your App</div>
        </div>

        <Arrow />

        {/* Gateway */}
        <div className="border border-brand-500/50 rounded-2xl bg-brand-500/5 p-5 min-w-[340px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              Sentorix Gateway
            </span>
            <span className="text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2.5 py-0.5 rounded-full">
              &lt;20ms
            </span>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-3 py-3 text-center">
              <div className="text-sm font-bold text-brand-300">PII Scanner</div>
              <div className="text-xs text-gray-500 mt-1">12 entity types</div>
            </div>
            <div className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-3 py-3 text-center">
              <div className="text-sm font-bold text-brand-300">Policy Engine</div>
              <div className="text-xs text-gray-500 mt-1">Block / redact</div>
            </div>
          </div>
          <div className="flex justify-center mb-2">
            <div className="flex flex-col items-center">
              <div className="h-5 w-px border-l border-dashed border-white/20" />
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: "5px solid rgba(255,255,255,0.2)",
                }}
              />
              <span className="text-[10px] text-gray-500 mt-1">async · non-blocking</span>
            </div>
          </div>
          <div className="border border-dashed border-white/15 rounded-xl bg-dark-900/50 px-3 py-2.5 text-center">
            <div className="text-xs font-bold text-gray-400">Audit Pipeline</div>
            <div className="text-[10px] text-gray-600 mt-0.5">SQS → Lambda → S3 + DynamoDB</div>
          </div>
        </div>

        <Arrow />

        {/* LLM Provider */}
        <div className="bg-dark-800 border border-teal-500/30 rounded-2xl px-6 py-5 text-center min-w-[110px]">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-xs font-bold text-teal-400 leading-snug">
            OpenAI /<br />Anthropic /<br />Bedrock
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center gap-3">
        <div className="bg-dark-800 border border-blue-500/30 rounded-2xl px-6 py-4 text-center w-44">
          <div className="text-2xl mb-1">🖥️</div>
          <div className="text-sm font-bold text-blue-400">Your App</div>
        </div>
        <Arrow vertical />
        <div className="border border-brand-500/50 rounded-2xl bg-brand-500/5 p-4 w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              Sentorix Gateway
            </span>
            <span className="text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-full">
              &lt;20ms
            </span>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-2 py-2.5 text-center">
              <div className="text-xs font-bold text-brand-300">PII Scanner</div>
            </div>
            <div className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-2 py-2.5 text-center">
              <div className="text-xs font-bold text-brand-300">Policy Engine</div>
            </div>
          </div>
          <div className="border border-dashed border-white/15 rounded-xl bg-dark-900/50 px-3 py-2 text-center">
            <div className="text-xs font-bold text-gray-400">Audit Pipeline</div>
            <div className="text-[10px] text-gray-600 mt-0.5">SQS → Lambda → S3</div>
          </div>
        </div>
        <Arrow vertical />
        <div className="bg-dark-800 border border-teal-500/30 rounded-2xl px-6 py-4 text-center w-44">
          <div className="text-2xl mb-1">🤖</div>
          <div className="text-sm font-bold text-teal-400">OpenAI / Anthropic / Bedrock</div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Inspect",
    description:
      "Every request is scanned for PII (names, emails, SSNs, financial data) and prompt injection attempts before reaching your LLM.",
  },
  {
    number: "02",
    title: "Enforce",
    description:
      "Your policies are applied. High-risk requests are blocked. PII is redacted. Every decision is made in under 20ms — invisible to your users.",
  },
  {
    number: "03",
    title: "Log",
    description:
      "Every interaction is hashed and written to tamper-proof audit storage. 7-year retention. Compliance reports in one click.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-dark-950">
      <div className="text-center mb-4">
        <SectionHeading className="text-white">How Sentorix works</SectionHeading>
        <SectionSubheading className="mx-auto text-gray-400">
          Every AI request flows through the Sentorix gateway before reaching your LLM provider.
        </SectionSubheading>
      </div>

      <ArchitectureDiagram />

      <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="group relative bg-dark-800 border border-white/10 rounded-2xl p-8 text-center hover:border-brand-500/30 hover:-translate-y-1.5 transition-all duration-300"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold text-base mb-5 transition-transform duration-300 group-hover:scale-110">
              {step.number}
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
