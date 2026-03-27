import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const cn = (...inputs: (string | undefined | null | false)[]) =>
  twMerge(clsx(inputs));

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 px-4", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl sm:text-4xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubheading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-lg text-gray-600 mt-4 max-w-2xl", className)}>
      {children}
    </p>
  );
}
