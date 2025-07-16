import React, { useEffect } from "react";

const PrivacyPolicy = () => {
     useEffect(() => {
      document.title = "Privacy Policy || EduNest";
    }, []);
  
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-primary mb-6">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Effective Date:</strong> July 10, 2025
      </p>

      <p className="mb-6">
        We value your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and
        protect your data when you use our platform.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>Personal Information: Name, email, phone number, photo, etc.</li>
        <li>Account Info: Login credentials, roles, preferences</li>
        <li>Payment Data: Handled securely by Stripe</li>
        <li>Usage Data: Classes enrolled, assignments submitted, feedback</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>To manage your account and profile</li>
        <li>To handle class enrollments and payments</li>
        <li>To personalize and improve the platform</li>
        <li>To send class updates and notifications</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>Stripe – Payment processing</li>
        <li>Firebase – Authentication and user management</li>
        <li>ImgBB – Secure image storage</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
      <p className="mb-6">
        We use encryption and security best practices to protect your data from
        unauthorized access or disclosure.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Children's Privacy</h2>
      <p className="mb-6">
        Our platform is not intended for users under 13 without parental
        consent.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
      <p className="mb-6">
        This policy may be updated occasionally. Any changes will be posted on
        this page with an updated effective date.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have questions about this policy, contact us at:
        <br />
        <span className="font-medium">Email:</span>{" "}
        <a href="mailto:support@edunest.com" className="text-blue-500 underline">
          support@edunest.com
        </a>
        <br />
        <span className="font-medium">Phone:</span>{" "}
        <a href="tel:+8801521730173" className="text-blue-500 underline">
          +880-1531-730173
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
