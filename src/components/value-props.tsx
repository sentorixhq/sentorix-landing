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
  },
];

export function ValueProps() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <SectionHeading className="text-gray-900">
          Everything your compliance team has been asking for
        </SectionHeading>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              style={{ borderTop: "4px solid #6366F1" }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 mb-5">
                <Icon size={22} className="text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {card.body}
              </p>
              <ul className="mt-auto space-y-2">
                {card.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
