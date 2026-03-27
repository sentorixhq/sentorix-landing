import { AlertTriangle, FileX, Bug, EyeOff } from "lucide-react";
import { Section, SectionHeading, SectionSubheading } from "./ui/section";

const problems = [
  {
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "Sensitive data in AI prompts",
    body: "Employees paste customer PII, financial records, and health data directly into ChatGPT and other AI tools every day.",
  },
  {
    icon: FileX,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Zero visibility into AI usage",
    body: "When regulators ask what data was sent to AI providers and when, most companies have no answer. That silence is expensive.",
  },
  {
    icon: Bug,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "AI systems under attack",
    body: "Malicious users craft prompts to manipulate your AI features, extract system prompts, or bypass your application logic.",
  },
  {
    icon: EyeOff,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Unauthorised AI tool usage",
    body: "Your policies say no external AI. Your employees use it anyway. You find out when something goes wrong.",
  },
];

export function Problem() {
  return (
    <Section id="problem" className="bg-white">
      <div className="text-center mb-12">
        <SectionHeading className="text-gray-900">
          Your team is already using AI.
          <br className="hidden sm:block" />
          You just don&apos;t know how.
        </SectionHeading>
        <SectionSubheading className="mx-auto">
          Most companies adopt AI tools faster than they can govern them. The
          result is legal liability, compliance risk, and reputational damage
          hiding in plain sight.
        </SectionSubheading>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {problems.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${p.iconBg} mb-4`}
              >
                <Icon size={20} className={p.iconColor} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
