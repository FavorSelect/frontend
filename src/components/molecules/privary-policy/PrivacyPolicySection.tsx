import React from "react";

interface PrivacyPolicySectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function PrivacyPolicySection({
  id,
  title,
  children,
}: PrivacyPolicySectionProps) {
  return (
    <section id={id} className="mb-8 scroll-mt-20">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="text-sm text-gray-700 space-y-2">{children}</div>
    </section>
  );
}
