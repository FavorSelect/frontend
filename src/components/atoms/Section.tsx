import { cn } from "@/utils/cn";
import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Section: FC<SectionProps> = ({ children, className, style }) => {
  return (
    <section className={cn("relative box-border", className)} style={style}>
      {children}
    </section>
  );
};

export default Section;
