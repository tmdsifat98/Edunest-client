import React, { useEffect } from "react";

const RefundPolicy = () => {

     useEffect(() => {
      document.title = " Refund Policy || EduNest";
    }, []);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">
        Refund Policy
      </h1>

      <p className="mb-4">
        We value your satisfaction and strive to ensure a positive learning experience. Please review our refund policy below to understand how refunds are processed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility for Refunds</h2>
      <p className="mb-4">
        Refunds are applicable only under specific conditions:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>You must request a refund within 7 days of purchase.</li>
        <li>You have not completed more than 20% of the class content.</li>
        <li>Refunds are not applicable for downloadable content or one-on-one sessions.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How to Request a Refund</h2>
      <p className="mb-4">
        To initiate a refund, please email us at{" "}
        <a href="mailto:support@edunest.com" className="text-blue-500 underline">
        support@edunest.com
        </a>{" "}
        with the following details:
      </p>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Your full name</li>
        <li>Registered email address</li>
        <li>Class name</li>
        <li>Reason for requesting refund</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Stripe Processing</h2>
      <p className="mb-4">
        All payments are securely processed via Stripe. Once a refund is approved, it will be initiated through Stripe and may take 5-10 business days to reflect in your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Non-Refundable Situations</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Change of mind after purchase</li>
        <li>Failure to attend live sessions without prior notice</li>
        <li>Violation of our platform's Terms of Use</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Support</h2>
      <p className="mb-2">
        For any questions or concerns regarding this refund policy, please contact our support team at:
      </p>
      <p>
        <a href="mailto:support@example.com" className="text-blue-500 underline">
          support@edunest.com
        </a>
      </p>
    </div>
  );
};

export default RefundPolicy;
