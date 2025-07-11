import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        Welcome to our platform! These terms and conditions outline the rules and regulations for the use of our website and services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>You must provide accurate information during registration.</li>
        <li>You are responsible for maintaining the confidentiality of your account.</li>
        <li>Any misuse or violation may result in account suspension or termination.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Class & Enrollment Policy</h2>
      <p className="mb-4">
        Enrolled classes are subject to availability. We reserve the right to cancel, postpone, or modify class content with notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
      <p className="mb-4">
        All content, logos, and graphics on this platform are owned by us. Reproduction or unauthorized use is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Privacy</h2>
      <p className="mb-4">
        We respect your privacy. Your personal data is handled securely and in accordance with our Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms from time to time. Continued use of the platform constitutes acceptance of the revised terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
      <p>
        For any questions or concerns regarding these terms, please contact us at:{" "}
        <a href="mailto:support@edunest.com" className="text-blue-500 underline">
          support@edunest.com
        </a>
      </p>
    </div>
  );
};

export default TermsAndConditions;
