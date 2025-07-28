import React from "react";
import Title from "../../components/Title";

const TermsConditions = () => {
  return (
    <div className="mx-12 mt-4 mb-22 flex flex-col items-center gap-4 sm:mt-22">
      <Title text="Terms & Conditions" />
      <p className="font-[ubuntu] text-lg">
        By using <strong className="text-xl">PassWired</strong>, you agree to
        these terms. Please read them carefully.
      </p>
      <ol className="flex list-decimal flex-col gap-4 [&_.list-disc]:ml-3 [&_.list-heads]:text-lg [&_span]:font-[ubuntu] [&_span]:text-xl [&_span]:font-semibold">
        {/* 1 */}
        <li className="list-heads">
          <span>Use of the App</span>
          <ul className="list-disc text-base">
            <li>You must be at least 13 years old to use PassWired.</li>
            <li>
              You agree not to misuse the app for unauthorized or illegal
              activities.
            </li>
          </ul>
        </li>
        {/* 2 */}
        <li className="list-heads">
          <span>User Responsibility</span>
          <ul className="list-disc text-base">
            <li>
              You are responsible for maintaining the confidentiality of your
              account.
            </li>
            <li>Do not share your credentials with others.</li>
            <li>
              You are solely responsible for the content you store in the vault.
            </li>
          </ul>
        </li>
        {/* 3 */}
        <li className="list-heads">
          <span>Data Storage and Security</span>
          <ul className="list-disc text-base">
            <li>We encrypt all sensitive data before storing it.</li>
            <li>
              While we take security seriously, no system is 100% immune. Use
              strong master passwords and update them regularly.
            </li>
          </ul>
        </li>
        {/* 4 */}
        <li className="list-heads">
          <span>Account Termination</span>
          <ul className="text-base">
            We reserve the right to suspend or delete accounts found to be in
            violation of our terms or involved in abuse of the platform.
          </ul>
        </li>
        {/* 5 */}
        <li className="list-heads">
          <span>Limitation of Liability</span>
          <ul className="text-base">
            PassWired is provided "as is." We are not liable for any data loss,
            breaches, or issues caused by user error or external attacks.
          </ul>
        </li>
        {/* 6 */}
        <li className="list-heads">
          <span>Modifications</span>
          <ul className="text-base">
            We may update these terms periodically. Continued use of the app
            implies acceptance of any updated terms.
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default TermsConditions;
