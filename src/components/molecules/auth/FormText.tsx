import { ReactNode } from "react";
import Link from "next/link";

interface FormTextProps {
  children: ReactNode;
  className?: string;
  linkHref?: string;
  linkText?: string;
  linkClassName?: string;
}

const FormText = ({
  children,
  className = "",
  linkHref = "",
  linkText = "",
  linkClassName = "text-red-500 font-medium",
}: FormTextProps) => {
  return (
    <p className={`text-left text-sm text-gray-600 mb-6 ${className}`}>
      {children}{" "}
      {linkHref && linkText && (
        <Link href={linkHref} className={linkClassName}>
          {linkText}
        </Link>
      )}
    </p>
  );
};

export default FormText;
