import { AlertTriangle, FileX, Bug, EyeOff } from "lucide-react";
import { Section, SectionHeading, SectionSubheading } from "./ui/section";

const stats = [
  {
    value: "74%",
    label: "of employees use AI tools their company hasn't approved",
    source: "Industry surveys, 2024",
  },
  {
    value: "$4.45M",
    label: "average cost of a data breach",
    source: "IBM Security Cost of a Data Breach Report",
  },
  {
    value: "50+",
    label: "global regulations now mandate AI audit trails",
    source: "AI policy tracker, 2025",
  },
];

const problems = [
  {
    icon: AlertTriangle,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10 border border-red-500/20",
    title: "Sensitive data in AI prompts",
    body: "Employees paste customer PII, financial records, and health data directly into ChatGPT and other AI tools every day — without realising the risk.",
  },
  {
    icon: FileX,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border border-amber-500/20",
    title: "Zero visibility into AI usage",
    body: "When regulators ask what data was sent to AI providers and when, most companies have no answer. That silence is expensive.",
  },
  {
    icon: Bug,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10 border border-red-500/20",
    title: "AI systems under attack",
    body: "Malicious users craft prompts to manipulate your AI features, extract system prompts, or bypass your application logic entirely.",
  },
  {
    icon: EyeOff,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border border-amber-500/20",
    title: "Unauthorised AI tool usage",
    body: "Your policies say no external AI. Your employees use it anyway. You find out when something goes wrong.",
  },
];

export function Problem() {
  return (
    <Section id="problem" className="bg-dark-900">
      {/* Stats row */}
      <div className="grid sm:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
        {stats.map((s) => (
          <div key={s.value} className="text-center">
            <div
              className="text-5xl sm:text-6xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #818CF8, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.value}
            </div>
            <p className="text-sm text-gray-400 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <SectionHeading className="text-white">
          Your team is already using AI.
          <br className="hidden sm:block" />
          You just don&apos;t know how.
        </SectionHeading>
        <SectionSubheading className="mx-auto text-gray-400">
          Most companies adopt AI tools faster than they can govern them. The
          result is legal liability, compliance risk, and reputational damage
          hiding in plain sight.
        </SectionSubheading>
      </div>

      {/* Problem cards */}
      <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {problems.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="group bg-dark-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${p.iconBg} mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={20} className={p.iconColor} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
