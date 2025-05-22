"use client";
import { useParams } from "next/navigation";
import SetPasswordWrapper from "@/components/organisms/auth/SetPasswordWrapper";

export default function SetPassword() {
  const { token } = useParams();
  const resetToken = token as string;

  return <SetPasswordWrapper token={resetToken} />;
}
