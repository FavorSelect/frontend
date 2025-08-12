import Subtitle from "@/components/atoms/Subtitles";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface FooterColumnProps {
  title?: string;
  links: { name: string; href: string }[];
  className?: string;
  style?: React.CSSProperties;
  onLogout?: () => void;
}

const FooterColumn = ({
  title,
  links,
  className,
  style,
  onLogout,
}: FooterColumnProps) => (
  <div className={cn("font-montserrat space-y-4", className)} style={style}>
    {title && <Subtitle title={title} />}
    <ul className="text-base space-y-2 text-[#8E90A7] font-normal">
      {links.map((link) => (
        <li
          key={link.name}        
          >
          {link.name === "Logout" ? (
            <button type="button" onClick={onLogout} className="cursor-pointer">
              {link.name}
            </button>
          ) : (
            <Link href={link.href}>{link.name}</Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default FooterColumn;
