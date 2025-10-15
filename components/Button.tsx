import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "cta";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  } as const;

  const variants = {
    primary:
      "bg-brand-red text-white hover:bg-opacity-90 focus:ring-brand-red shadow-md hover:shadow-lg",
    secondary:
      "bg-brand-yellow text-brand-black hover:bg-opacity-90 focus:ring-brand-yellow shadow-md hover:shadow-lg",
    outline:
      "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white focus:ring-brand-red",
    cta: "bg-grad-secondary text-brand-black font-chunk text-lg uppercase tracking-wide hover:scale-105 focus:ring-brand-yellow shadow-lg hover:shadow-xl",
  };

  const classes = cn(baseStyles, sizes[size], variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

