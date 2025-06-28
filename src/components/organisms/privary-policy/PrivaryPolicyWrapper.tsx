"use client";
import React from "react";
import TableOfContents from "@/components/molecules/privary-policy/TableOfContents";
import PrivacyPolicySection from "@/components/molecules/privary-policy/PrivacyPolicySection";

export default function PrivaryPolicyWrapper() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow">
      <TableOfContents />

      <div className="w-full md:w-3/4">
        <PrivacyPolicySection id="introduction" title="Introduction">
          <p>
            Welcome to FavorSelect’s Privacy Policy. This policy outlines how we
            collect, use, and protect your personal information when you
            interact with our e-commerce platform. We are committed to
            safeguarding your privacy and ensuring a secure online experience.
          </p>
        </PrivacyPolicySection>

        <PrivacyPolicySection id="data-collection" title="Data Collection">
          <p>
            We collect various types of information to provide and improve our
            services. This includes personal details such as your name, email
            address, shipping address, and payment information. We also gather
            non-personal data like browsing history and device information to
            enhance your shopping experience.
          </p>
        </PrivacyPolicySection>

        <PrivacyPolicySection id="data-usage" title="Data Usage">
          <p>
            The information we collect is used to process orders, personalize
            your shopping experience, and communicate with you about products,
            promotions, and updates. We may also use your data for analytical
            purposes to understand customer behavior and improve our offerings.
          </p>
        </PrivacyPolicySection>

        <PrivacyPolicySection id="cookies" title="Cookies">
          <p>
            We use cookies to enhance your browsing experience. Cookies are
            small text files stored on your device that help us remember your
            preferences, track your activity, and improve site functionality.
            You can manage your cookie settings through your browser.
          </p>
        </PrivacyPolicySection>

        <PrivacyPolicySection id="user-rights" title="User Rights">
          <p>
            You have the right to access, correct, or delete your personal
            information. You can also opt out of receiving marketing
            communications from us. Please contact us if you wish to exercise
            these rights or have any privacy-related concerns.
          </p>
        </PrivacyPolicySection>

        <PrivacyPolicySection id="contact-us" title="Contact Us">
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:support@favorselect.com"
              className="text-red-600 hover:underline"
            >
              support@favorselect.com
            </a>{" "}
            or call us at (555) 123-4567. We are here to assist you.
          </p>
        </PrivacyPolicySection>
      </div>
    </div>
  );
}
