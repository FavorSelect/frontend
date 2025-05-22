"use client";
import { useParams } from "next/navigation";

export default function CheckYourEmailPage() {
  const params = useParams();
  const emailParam = params?.email;
  const email = emailParam ? decodeURIComponent(emailParam as string) : "";

  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">
        Check Your Email
      </h2>

      <p className="text-gray-800">
        We’ve sent a password reset link to{" "}
        <span className="font-semibold text-black">
          {email || "your email"}
        </span>
        .
      </p>

      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        The email should arrive within a couple of minutes. Be sure to check
        your <span className="font-medium">spam</span> or{" "}
        <span className="font-medium">junk folder</span> just in case.
      </p>

      <p className="text-sm text-gray-700 mt-5 leading-relaxed">
        Didn’t get the email? You can request a new link after a few minutes.
      </p>
    </div>
  );
}
