import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "gradient";
  id?: string;
}

export function Section({ children, className, background = "white", id }: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-grad-primary opacity-30",
  };

  return (
    <section id={id} className={cn("py-16 sm:py-20", backgrounds[background], className)}>
      <Container>{children}</Container>
    </section>
  );
}

