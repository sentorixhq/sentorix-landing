import { Plug, Shield, FileCheck, Check } from "lucide-react";
import { Section, SectionHeading } from "./ui/section";

const cards = [
  {
    icon: Plug,
    title: "Live in 5 minutes",
    body: "Change your base URL. That's it. Sentorix is OpenAI-API compatible — no SDK changes, no code refactoring, no new infrastructure to manage.",
    features: [
      "OpenAI compatible",
      "Anthropic compatible",
      "AWS Bedrock compatible",
      "Works with any language or framework",
    ],
    accent: "from-blue-500/20 to-brand-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Shield,
    title: "Real-time PII detection",
    body: "Powered by Microsoft Presidio. Detects and redacts 12 entity types before they reach your AI provider. Configurable thresholds per tenant.",
    features: [
      "Names, emails, phone numbers",
      "Credit cards, SSNs, IBANs",
      "Medical records, IP addresses",
      "Custom entity types coming soon",
    ],
    accent: "from-brand-500/20 to-purple-500/10",
    border: "border-brand-500/20",
  },
  {
    icon: FileCheck,
    title: "Audit-ready from day one",
    body: "Immutable audit logs stored with AWS S3 Object Lock in COMPLIANCE mode. 7-year retention. Export for regulatory submissions in one click.",
    features: [
      "EU AI Act ready",
      "HIPAA compatible",
      "India DPDP Act",
      "SOC 2 evidence",
    ],
    accent: "from-teal-500/20 to-green-500/10",
    border: "border-teal-500/20",
  },
];

export function ValueProps() {
  return (
    <Section className="bg-dark-900">
      <div className="text-center mb-12">
        <SectionHeading className="text-white">
          Everything your compliance team has been asking for
        </SectionHeading>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`relative bg-dark-800 border ${card.border} rounded-2xl p-6 flex flex-col overflow-hidden hover:-translate-y-1 hover:border-opacity-50 transition-all duration-300`}
            >
              {/* Gradient top glow */}
              <div
                className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${card.accent} opacity-40 pointer-events-none`}
              />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-dark-900 border border-white/10 mb-5">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">{card.body}</p>
                <ul className="mt-auto space-y-2.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <Check size={10} className="text-brand-400" />
                      </div>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
