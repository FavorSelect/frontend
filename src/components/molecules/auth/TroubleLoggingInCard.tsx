import React from "react";
import Link from "next/link";

const TroubleLoggingInCard = () => {
  return (
    <div className="font-montserrat w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      {/* Top Title and Close Button */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-center w-full">
          Having trouble logging in?
        </h2>
      </div>

      {/* Reset Password Section */}
      <div className="mb-6">
        <p className="text-gray-600 text-center mb-4">
          Forgot Your Password? Reset it using your registered email address and
          mobile phone number.
        </p>
        <Link
          href="/reset-password"
          type="button"
          className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg inline-block text-center"
        >
          Reset Your Password
        </Link>
      </div>

      {/* Find Your Account Section */}
      <div>
        <p className="text-gray-600 text-center mb-4">
          Forgot Your Account? Retrieve it via email address or mobile phone
          number.
        </p>
        <Link
          href="/find-account"
          type="button"
          className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg inline-block text-center"
        >
          Find Your Account
        </Link>
      </div>
    </div>
  );
};

export default TroubleLoggingInCard;
