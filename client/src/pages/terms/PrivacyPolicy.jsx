import React from "react";
import Title from "../../components/Title";

const PrivacyPolicy = () => {
  return (
    <div className="mx-12 mt-4 mb-22 flex flex-col items-center gap-4">
      <Title text="Privacy Policy" />
      <p className="font-[ubuntu] text-lg">
        At <strong className="text-xl">PassWired</strong>, your privacy is our
        top priority. This Privacy Policy explains how we collect, use, and
        protect your information when you use our password manager app.
      </p>
      <ol className="flex list-decimal flex-col gap-4 [&_.list-disc]:ml-3 [&_.list-heads]:text-lg [&_span]:font-[ubuntu] [&_span]:text-xl [&_span]:font-semibold">
        <li className="list-heads">
          <span>Information We Collect</span>
          <ul className="list-disc text-base">
            <li>
              Account Info: We collect your email and password for login
              purposes.
            </li>
            <li>
              Stored Data: All saved passwords and credentials are encrypted
              using AES encryption before storage.
            </li>
            <li>
              Device Info: Basic usage and device data may be collected to
              improve app performance.
            </li>
          </ul>
        </li>
        <li className="list-heads">
          <span>How We Use Your Data</span>
          <ul className="list-disc text-base">
            <li>To authenticate and manage user sessions.</li>
            <li>To securely store and retrieve encrypted passwords.</li>
            <li>To improve user experience and app functionality.</li>
          </ul>
        </li>
        <li className="list-heads">
          <span>Data Security</span>
          <ul className="text-base">
            We use strong AES encryption via Node.js's crypto module to secure
            your data before saving it in our database. Your passwords are never
            stored in plain text.
          </ul>
        </li>
        <li className="list-heads">
          <span>Third-Party Sharing</span>
          <ul className="text-base">
            We do not sell or share your data with any third parties. Your
            information stays private and secure within our systems.
          </ul>
        </li>
        <li className="list-heads">
          <span>Your Rights</span>
          <ul className="list-disc text-base">
            You have the right to:
            <li>Delete your account and all associated data.</li>
            <li>Request access to your stored information.</li>
            <li>Contact us with privacy-related concerns.</li>
          </ul>
        </li>
        <li className="list-heads">
          <span>Changes to This Policy</span>
          <ul className="text-base">
            We may update this policy from time to time. Changes will be posted
            on this page with an updated effective date.
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default PrivacyPolicy;
