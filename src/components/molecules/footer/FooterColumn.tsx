import Subtitle from "@/components/atoms/Subtitles";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface FooterColumnProps {
  title: string;
  links: { name: string; href: string }[];
  className?: string;
  style?: React.CSSProperties;
}

const FooterColumn = ({
  title,
  links,
  className,
  style,
}: FooterColumnProps) => (
  <div className={cn("font-montserrat space-y-4", className)} style={style}>
    <Subtitle title={title} />
    <ul className="text-base space-y-2 text-[#C2C2C2] font-normal">
      {links.map((link) => (
        <li key={link.name}>
          <Link className="text-sm sm:text-base" href={link.href}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterColumn;
