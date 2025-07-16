import React from "react";
import UserInfo from "./UserInfo";

import Category from "./Category";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const More = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto mb-22 flex w-[90%] flex-col items-center gap-5 select-none">
      <UserInfo />
      <section className="flex w-full flex-col gap-3">
        <Category
          categoryName="👤 Account"
          features={[
            { name: "View Profile", action: () => navigate("/profile") },
            { name: "Change Password", action: () => {} },
            { name: "Delete Account", action: () => {} },
          ]}
        />
        <Category
          categoryName="🔐 Security"
          features={[
            { name: "Enable 2FA", action: () => {} },
            { name: "Manage Devices", action: () => {} },
            { name: "Biometric Login", action: () => {} },
          ]}
        />
        <Category
          categoryName="✨ Features"
          features={[
            { name: "Export Vault", action: () => {} },
            { name: "Password Generator", action: () => {} },
            { name: "Password Strength Checker", action: () => {} },
          ]}
        />
        <Category
          categoryName="⚙️ App Settings"
          features={[
            { name: "Theme", action: () => {} },
            { name: "Language Selection", action: () => {} },
          ]}
        />
        <Category
          categoryName="📦 App Info"
          features={[
            { name: "App Version", action: () => {} },
            { name: "What's New", action: () => {} },
            { name: "Credits & Licenses", action: () => {} },
          ]}
        />
        <Category
          categoryName="💬 Feedback & Support"
          features={[
            { name: "Report a Bug", action: () => {} },
            { name: "Share Feedback", action: () => {} },
            { name: "Contact Developer", action: () => {} },
          ]}
        />
        <Category
          categoryName="📄 Legal"
          features={[
            { name: "Privacy Policy", action: () => {} },
            { name: "Terms & Conditions", action: () => {} },
          ]}
        />
      </section>
      <Button text="Logout" />
    </div>
  );
};

export default More;
