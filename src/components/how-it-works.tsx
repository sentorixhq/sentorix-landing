import { Section, SectionHeading, SectionSubheading } from "./ui/section";

function ArchitectureDiagram() {
  return (
    <div className="mt-10 w-full">
      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="flex items-start gap-4 justify-center">
          {/* Your App */}
          <div className="flex flex-col items-center gap-2 mt-8">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl px-5 py-4 text-center min-w-[110px]">
              <div className="text-lg mb-1">🖥️</div>
              <div className="text-xs font-bold text-blue-700">Your App</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center mt-[3.5rem]">
            <div className="w-8 h-0.5 bg-brand-500" />
            <div
              className="w-0 h-0"
              style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: "8px solid #6366F1",
              }}
            />
          </div>

          {/* Gateway */}
          <div className="border-2 border-brand-500 rounded-2xl bg-brand-50/30 p-4 min-w-[320px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Sentorix Gateway
              </span>
              <span className="text-xs font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">
                &lt;20ms
              </span>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-purple-100 border border-purple-300 rounded-lg px-3 py-3 text-center">
                <div className="text-sm font-bold text-purple-700">
                  PII Scanner
                </div>
                <div className="text-xs text-purple-500 mt-1">
                  12 entity types
                </div>
              </div>
              <div className="flex-1 bg-purple-100 border border-purple-300 rounded-lg px-3 py-3 text-center">
                <div className="text-sm font-bold text-purple-700">
                  Policy Engine
                </div>
                <div className="text-xs text-purple-500 mt-1">
                  Block / redact
                </div>
              </div>
            </div>

            {/* Async arrow down */}
            <div className="flex justify-center mt-3">
              <div className="flex flex-col items-center">
                <div className="h-6 w-0.5 border-l border-dashed border-gray-400" />
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "6px solid #9CA3AF",
                  }}
                />
                <span className="text-xs text-gray-400 mt-1">
                  async (non-blocking)
                </span>
              </div>
            </div>

            {/* Audit Pipeline */}
            <div className="mt-2 border border-dashed border-gray-300 rounded-lg bg-gray-50 px-3 py-2 text-center">
              <div className="text-xs font-bold text-gray-600">
                Audit Pipeline
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                SQS → Lambda → S3 + DynamoDB
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center mt-[3.5rem]">
            <div className="w-8 h-0.5 bg-brand-500" />
            <div
              className="w-0 h-0"
              style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: "8px solid #6366F1",
              }}
            />
          </div>

          {/* LLM Provider */}
          <div className="flex flex-col items-center gap-2 mt-8">
            <div className="bg-teal-50 border-2 border-teal-300 rounded-xl px-5 py-4 text-center min-w-[110px]">
              <div className="text-lg mb-1">🤖</div>
              <div className="text-xs font-bold text-teal-700">
                OpenAI /
              </div>
              <div className="text-xs font-bold text-teal-700">
                Anthropic /
              </div>
              <div className="text-xs font-bold text-teal-700">Bedrock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center gap-3">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl px-6 py-4 text-center w-48">
          <div className="text-lg mb-1">🖥️</div>
          <div className="text-sm font-bold text-blue-700">Your App</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-6 w-0.5 bg-brand-500" />
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "8px solid #6366F1",
            }}
          />
        </div>

        <div className="border-2 border-brand-500 rounded-2xl bg-brand-50/30 p-4 w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Sentorix Gateway
            </span>
            <span className="text-xs font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">
              &lt;20ms
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-purple-100 border border-purple-300 rounded-lg px-3 py-3 text-center">
              <div className="text-sm font-bold text-purple-700">PII Scanner</div>
            </div>
            <div className="flex-1 bg-purple-100 border border-purple-300 rounded-lg px-3 py-3 text-center">
              <div className="text-sm font-bold text-purple-700">Policy Engine</div>
            </div>
          </div>
          <div className="mt-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 px-3 py-2 text-center">
            <div className="text-xs font-bold text-gray-600">Audit Pipeline</div>
            <div className="text-xs text-gray-400 mt-0.5">SQS → Lambda → S3</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-6 w-0.5 bg-brand-500" />
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "8px solid #6366F1",
            }}
          />
        </div>

        <div className="bg-teal-50 border-2 border-teal-300 rounded-xl px-6 py-4 text-center w-48">
          <div className="text-lg mb-1">🤖</div>
          <div className="text-sm font-bold text-teal-700">OpenAI / Anthropic / Bedrock</div>
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
      "Every interaction is hashed and written to tamper-proof Audit storage. 7-year retention. Compliance reports in one click.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-gray-50">
      <div className="text-center mb-4">
        <SectionHeading className="text-gray-900">
          How Sentorix works
        </SectionHeading>
        <SectionSubheading className="mx-auto">
          Every AI request flows through the Sentorix gateway before reaching
          your LLM provider.
        </SectionSubheading>
      </div>

      <ArchitectureDiagram />

      <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="group animate-fade-in-up relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-center hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-brand-100"
            style={{ animationDelay: `${i * 150}ms`, opacity: 0 }}
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600" />
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 text-white font-bold text-lg mb-5 shadow-md transition-transform duration-300 group-hover:scale-110">
              {step.number}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
