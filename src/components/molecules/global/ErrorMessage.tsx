import { FieldError } from "react-hook-form";
import Paragraph from "@/components/atoms/Paragraph";

function ErrorMessage({ error }: { error?: FieldError }) {
  if (!error) return null;
  return (
    <Paragraph className="text-scarlet-red text-sm">{error.message}</Paragraph>
  );
}
export default ErrorMessage;
