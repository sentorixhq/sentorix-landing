import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const cn = (...inputs: (string | undefined | null | false)[]) =>
  twMerge(clsx(inputs));

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide",
        "bg-brand-800/60 text-brand-100 border border-brand-400/60",
        className
      )}
    >
      {children}
    </span>
  );
}
